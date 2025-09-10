import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import { Button } from "@mui/material"
import CreateWidgetForm from "./CreateWidgetForm"

export function AddWidgetSidebar({ open, onClose }) {
  const [showCreateForm, setShowCreateForm] = useState(false)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 backdrop-blur-sm bg-white/20"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-[#1976d2] text-white">
          <h2 className="text-lg font-semibold">Add Widget</h2>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-gray-600 mb-4">
            Personalise your dashboard by adding widgets
          </p>

          <div className="flex border-b mb-4">
            <button className="px-4 py-2 text-sm font-medium border-b-2 border-[#1976d2] text-[#1976d2]">
              CPSM
            </button>
            <button className="px-4 py-2 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
              CWPP
            </button>
          </div>

          <div className="mb-4">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowCreateForm((prev) => !prev)}
              className="w-full flex items-center justify-center space-x-2"
            >
              <AddIcon fontSize="small" />
              <span>Create Custom Widget</span>
            </Button>
          </div>

          {showCreateForm && (
            <CreateWidgetForm
              onCancel={() => setShowCreateForm(false)}
              onCreate={(widget) => {
                console.log("Widget created:", widget)
                setShowCreateForm(false)
              }}
            />
          )}

          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm">Cloud Accounts</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm">Risk Assessment</span>
            </label>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} variant="contained">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
