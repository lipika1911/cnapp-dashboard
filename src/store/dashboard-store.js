import { create } from "zustand"
import dashboardData from "./dashboardData.json"

export const useDashboardStore = create((set, get) => ({
  categories: dashboardData,
  activeWidgets: [
    "cloud-accounts",
    "cloud-account-risk",
    "top-5-alerts",
    "workload-alerts",
    "image-risk-assessment",
    "image-security-issues",
    "open-tickets",
    "closed-tickets",
  ],
  sidebarOpen: false,
  selectedCategory: "cspm",
  showCreateCustomWidget: false,

  toggleWidget: (widgetId) =>
    set((state) => ({
      activeWidgets: state.activeWidgets.includes(widgetId)
        ? state.activeWidgets.filter((id) => id !== widgetId)
        : [...state.activeWidgets, widgetId],
    })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),

  openSidebarWithCategory: (categoryId) =>
    set({ sidebarOpen: true, selectedCategory: categoryId }),

  setShowCreateCustomWidget: (show) => set({ showCreateCustomWidget: show }),

  addCustomWidget: (categoryId, name, text) =>
    set((state) => {
      const newWidget = {
        id: `custom-${Date.now()}`,
        name,
        chart: "custom",
        data: {},
        customText: text,
        isCustom: true,
      }

      const updatedCategories = state.categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )

      return {
        categories: updatedCategories,
        activeWidgets: [...state.activeWidgets, newWidget.id],
        showCreateCustomWidget: false,
      }
    }),

    removeWidget: (widgetId) =>
        set((state) => {
        const updatedActiveWidgets = state.activeWidgets.filter(
            (id) => id !== widgetId
        )
        const updatedCategories = state.categories.map((category) => ({
            ...category,
            widgets: category.widgets.filter(
            (widget) => !(widget.id === widgetId && widget.isCustom)
            ),
        }))

        return {
            activeWidgets: updatedActiveWidgets,
            categories: updatedCategories,
        }
    }),
}))
