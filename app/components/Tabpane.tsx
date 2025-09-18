export function Pane<T extends string = string>({
  tabs,
  setActiveSection,
  activeSection,
  setShowDateModal,
  mainPane,
}: {
  tabs: { key: T; label: string }[];
  setActiveSection: (section: T) => void;
  activeSection: T;
  setShowDateModal?: (show: boolean) => void;
  mainPane?: boolean;
}) {
  return (
    <div className="w-full border rounded-lg bg-white overflow-hidden">
      <div
        className={`overflow-x-auto whitespace-nowrap scrollbar-hide md:flex space-x-4 md:space-x-2 ${
          mainPane && "md:justify-between"
        }`}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`px-4 py-1 text-sm rounded-md whitespace-nowrap transition-colors ${
              activeSection === t.key
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            } relative `}
            onClick={() => {
              setActiveSection(t.key);
              if (t.key === "custom") setShowDateModal?.(true);
            }}
          >
            <p>{t.label}</p>
            {t.key === "stock" && (
              <span className="absolute top-0 -right-1 md:-right- w-4 h-4 md:w-4 md:h-4 flex items-center justify-center bg-red-400 rounded-full text-white text-[10px] sm:text-xs">
                4
              </span>
            )}
            {t.key === "sales" && (
              <span className="absolute top-0 -right-1 md:-right- w-4 h-4 md:w-4 md:h-4 flex items-center justify-center bg-red-400 rounded-full text-white text-[10px] sm:text-xs">
                4
              </span>
            )}
            {t.key === "expenses" && (
              <span className="absolute top-0 -right-1 md:-right- w-4 h-4 md:w-4 md:h-4 flex items-center justify-center bg-red-400 rounded-full text-white text-[10px] sm:text-xs">
                4
              </span>
            )}
            {t.key === "login" && (
              <span className="absolute top-0 -right-1 md:right-0 w-4 h-4 md:w-4 md:h-4 flex items-center justify-center bg-red-400 rounded-full text-white text-[10px] sm:text-xs">
                4
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
