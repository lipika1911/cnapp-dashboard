import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { AddWidgetSidebar } from "./AddWidgetSidebar";

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = [
    {
      id: "cpsm",
      name: "CPSM",
      widgets: [
        { id: "cloud-accounts", name: "Cloud Accounts", chart: "pie" },
        { id: "risk-assessment", name: "Risk Assessment", chart: "pie" },
      ],
    },
    {
      id: "cwpp",
      name: "CWPP",
      widgets: [
        { id: "top-alerts", name: "Top 5 Alerts", chart: "bar" },
        { id: "vulnerabilities", name: "Vulnerabilities", chart: "bar" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">CNAPP Dashboard</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <Button
              variant="outlined"
              size="medium"
              className="flex items-center gap-2"
              onClick={() => setSidebarOpen(true)}
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
            />
          </div>
        </div>

        
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {category.widgets.map((widget) => (
                  <div
                    key={widget.id}
                    className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="font-medium text-gray-800 mb-2">
                      {widget.name}
                    </h3>
                    <div className="mt-4 h-24 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
                      [ Chart Data ]
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => setSidebarOpen(true)}
                  className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer flex flex-col items-center justify-center text-gray-500 text-sm"
                >
                  <AddIcon fontSize="small" />
                  Add Widget
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddWidgetSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
