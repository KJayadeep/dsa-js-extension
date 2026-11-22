import { useState } from "react";
import Header from "./components/Header";
import FloatingButton from "./components/FloatingButton";
import Toast from "./components/Toast";
import Dashboard from "./pages/Dashboard";
import DataStructures from "./pages/DataStructures";
import Settings from "./pages/Settings";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [toast, setToast] = useState(null);

  const showToast = (toastData) => {
    setToast(toastData);
  };

  return (
    <>
      {/* Floating Button in bottom-right corner of LeetCode */}
      {!isOpen && <FloatingButton onClick={() => setIsOpen(true)} />}

      {/* Main Glassmorphic Panel */}
      {isOpen && (
        <div
          className="
            glass-panel
            fixed bottom-6 right-6 z-[2147483647]
            flex w-[420px] flex-col
            overflow-hidden
            rounded-2xl
            text-gray-100
            shadow-[0_24px_60px_rgba(0,0,0,0.85)]
            jsdsa-animate-in
          "
        >
          {/* Header with Integrated Tabs */}
          <Header
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={() => setIsOpen(false)}
          />

          {/* Toast Notification */}
          <Toast toast={toast} onClose={() => setToast(null)} />

          {/* Active View */}
          <main className="relative flex-1 bg-[#0c0e14]/90">
            {activeTab === "dashboard" && (
              <Dashboard onNavigate={setActiveTab} onNotify={showToast} />
            )}
            {activeTab === "library" && (
              <DataStructures onNotify={showToast} />
            )}
            {activeTab === "settings" && (
              <Settings onNotify={showToast} />
            )}
          </main>
        </div>
      )}
    </>
  );
};

export default App;
