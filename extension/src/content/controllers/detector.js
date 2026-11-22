import * as walk from "acorn-walk";
import { DATA_STRUCTURES_CATALOG } from "../datastructures/index.js";

// Build alias mapping for fast lookup
const STRUCTURE_MAP = new Map();
DATA_STRUCTURES_CATALOG.forEach((item) => {
  STRUCTURE_MAP.set(item.name.toLowerCase(), item);
  item.aliases.forEach((alias) => {
    STRUCTURE_MAP.set(alias.toLowerCase(), item);
  });
});

export const detectDataStructures = (ast, rawCode = "") => {
  const detected = [];
  const instantiated = [];
  const definedSet = new Set();

  if (ast) {
    walk.simple(ast, {
      // Find declarations: class Foo, function Foo, const Foo = ...
      ClassDeclaration(node) {
        if (node.id?.name) {
          definedSet.add(node.id.name.toLowerCase());
        }
      },
      FunctionDeclaration(node) {
        if (node.id?.name) {
          definedSet.add(node.id.name.toLowerCase());
        }
      },
      VariableDeclarator(node) {
        if (node.id?.type === "Identifier" && node.id.name) {
          definedSet.add(node.id.name.toLowerCase());
        }
      },

      // Find new Foo(...)
      NewExpression(node) {
        let name = null;
        if (node.callee.type === "Identifier") {
          name = node.callee.name;
        } else if (node.callee.type === "MemberExpression" && node.callee.property?.name) {
          name = node.callee.property.name;
        }

        if (!name) return;

        const lower = name.toLowerCase();
        if (STRUCTURE_MAP.has(lower)) {
          const meta = STRUCTURE_MAP.get(lower);
          instantiated.push({
            name,
            canonicalName: meta.name,
            catalogId: meta.id,
            line: node.loc?.start?.line ?? 1,
            isDefined: false, // determined below
          });
        }
      },
    });
  }

  // Fallback regex detection if AST parsing failed (e.g. code is midway being typed)
  if (instantiated.length === 0 && rawCode) {
    for (const [key, meta] of STRUCTURE_MAP.entries()) {
      const regex = new RegExp(`\\bnew\\s+${key}\\s*\\(`, "i");
      if (regex.test(rawCode)) {
        // Also check if class/function definition is present in code
        const defRegex = new RegExp(`\\b(class|function)\\s+${key}\\b`, "i");
        const hasDef = defRegex.test(rawCode);
        if (hasDef) {
          definedSet.add(key.toLowerCase());
        }

        instantiated.push({
          name: meta.name,
          canonicalName: meta.name,
          catalogId: meta.id,
          line: 1,
          isDefined: hasDef,
        });
      }
    }
  }

  // Check definitions for each instantiated structure
  const uniqueNames = new Set();
  const missing = [];

  for (const item of instantiated) {
    const isDef = definedSet.has(item.name.toLowerCase()) || definedSet.has(item.canonicalName.toLowerCase());
    item.isDefined = isDef;

    const key = `${item.canonicalName}-${item.line}`;
    if (!uniqueNames.has(key)) {
      uniqueNames.add(key);
      detected.push(item);

      if (!isDef && !missing.some((m) => m.catalogId === item.catalogId)) {
        missing.push(item);
      }
    }
  }

  return {
    detected,
    missing,
  };
};
