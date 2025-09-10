import { useState } from "react"
import { Button } from "@mui/material"

export default function CreateWidgetForm({ onCancel, onCreate }) {
  const [widgetName, setWidgetName] = useState("")
  const [widgetText, setWidgetText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (widgetName.trim() && widgetText.trim()) {
      onCreate?.({ name: widgetName.trim(), text: widgetText.trim() })
      setWidgetName("")
      setWidgetText("")
    }
  }

  return (
    <div className="border border-[#1976d2] rounded-lg p-4 mb-4 bg-gray-50">
      <h3 className="text-[#1976d2] font-medium mb-3">Create Custom Widget</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Widget Name
          </label>
          <input
            type="text"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
            placeholder="Enter widget name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Widget Text
          </label>
          <textarea
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
            placeholder="Enter widget description or content"
            rows="3"
            required
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" size="small" variant="contained">
            Create Widget
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
