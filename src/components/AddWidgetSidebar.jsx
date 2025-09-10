import { useDashboardStore } from "../store/dashboard-store";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import CreateWidgetForm from "./CreateWidgetForm";

export function AddWidgetSidebar() {
  const {
    categories,
    activeWidgets,
    sidebarOpen,
    selectedCategory,
    showCreateCustomWidget,
    toggleWidget,
    setSidebarOpen,
    setSelectedCategory,
    setShowCreateCustomWidget,
  } = useDashboardStore();

  if (!sidebarOpen) return null;

  const currentCategory = categories.find((cat) => cat.id === selectedCategory);

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 backdrop-blur-sm bg-white/20"
        onClick={() => setSidebarOpen(false)}
      />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b bg-[#1976d2] text-white">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Personalise your dashboard by adding the following widgets
          </p>

          <div className="flex border-b mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  selectedCategory === category.id
                    ? "border-[#1976d2] text-[#1976d2]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.id.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowCreateCustomWidget(!showCreateCustomWidget)}
              className="w-full flex items-center justify-center space-x-2"
            >
              <AddIcon fontSize="small" />
              <span>Create Custom Widget</span>
            </Button>
          </div>

          {showCreateCustomWidget && (
            <CreateWidgetForm categoryId={selectedCategory} />
          )}

          <div className="space-y-3 mb-6">
            {currentCategory?.widgets.map((widget) => (
              <label
                key={widget.id}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeWidgets.includes(widget.id)}
                  onChange={() => toggleWidget(widget.id)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{widget.name}</span>
                {widget.isCustom && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Custom
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-end gap-2">
          <Button variant="outlined" onClick={() => setSidebarOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setSidebarOpen(false)} variant="contained">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
