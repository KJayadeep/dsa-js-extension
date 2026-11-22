import * as acorn from "acorn";

export const parseCode = (code) => {
  if (!code || typeof code !== "string") {
    return null;
  }

  // Attempt 1: Standard script parsing
  try {
    return acorn.parse(code, {
      ecmaVersion: "latest",
      sourceType: "script",
      locations: true,
      allowReturnOutsideFunction: true,
    });
  } catch {
    // Attempt 2: Module parsing
    try {
      return acorn.parse(code, {
        ecmaVersion: "latest",
        sourceType: "module",
        locations: true,
      });
    } catch (error) {
      console.debug("[JS-DSA] Acorn syntax parse warning:", error?.message);
      return null;
    }
  }
};
