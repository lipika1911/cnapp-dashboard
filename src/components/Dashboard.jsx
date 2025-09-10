import { WidgetCard } from "./WidgetCard";
import { AddWidgetSidebar } from "./AddWidgetSidebar";
import { useDashboardStore } from "../store/dashboard-store";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

export function Dashboard() {
  const {
    categories,
    activeWidgets,
    searchQuery,
    setSidebarOpen,
    openSidebarWithCategory,
    setSearchQuery,
    getFilteredWidgets,
    removeWidget,
  } = useDashboardStore();

  const allWidgets = categories.flatMap((category) => category.widgets);
  const activeWidgetData = allWidgets.filter((widget) =>
    activeWidgets.includes(widget.id)
  );

  const filteredWidgets = searchQuery
    ? getFilteredWidgets().filter((widget) => activeWidgets.includes(widget.id))
    : activeWidgetData;

  const categoryGroups = searchQuery
    ? [
        {
          id: "search-results",
          name: "Search Results",
          widgets: filteredWidgets,
        },
      ]
    : categories.map((category) => ({
        ...category,
        widgets: category.widgets.filter((widget) =>
          activeWidgets.includes(widget.id)
        ),
      }));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">CNAPP Dashboard</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <Button
              variant="outlined"
              size="medium"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2"
            >
              <span>Add Widget</span>
              <AddIcon fontSize="small" />
            </Button>

            <Button variant="outlined" size="medium">
              <RefreshIcon fontSize="medium" />
            </Button>

            <Button variant="outlined" size="medium">
              <MoreVertIcon fontSize="medium" />
            </Button>

            <Button
              variant="contained"
              size="medium"
              className="flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-md">Last 2 days</span>
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fontSize="small"
            />
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
            />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {categoryGroups.map((category) => (
            <div key={category.id}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {category.widgets.map((widget) => (
                  <WidgetCard
                    key={widget.id}
                    widget={widget}
                    onRemoveWidget={() => removeWidget(widget.id)}
                  />
                ))}
                {!searchQuery && (
                  <WidgetCard
                    isEmpty
                    onAddWidget={() => openSidebarWithCategory(category.id)}
                  />
                )}
              </div>
            </div>
          ))}

          {activeWidgetData.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No widgets added yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start by adding some widgets to your dashboard
              </p>
              <Button onClick={() => setSidebarOpen(true)}>
                <AddIcon className="mr-2" fontSize="small" />
                Add Widget
              </Button>
            </div>
          )}

          {searchQuery && filteredWidgets.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No widgets found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms
              </p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </div>

      <AddWidgetSidebar />
    </div>
  );
}
