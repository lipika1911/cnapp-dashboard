import { Card, CardContent, CardHeader } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export function WidgetCard({ widget, onAddWidget, isEmpty}) {
  if (isEmpty) {
    return (
      <Card
        className="h-80 flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
        onClick={onAddWidget}
      >
        <div className="text-center">
          <AddIcon className="mx-auto mb-2 text-gray-400" fontSize="large" />
          <p className="text-gray-500 font-medium">Add Widget</p>
        </div>
      </Card>
    );
  }

  if (!widget) return null;

  if (widget.chart === "custom") {
    return (
      <Card className="h-80 relative overflow-hidden">
        <CardHeader
          className="pb-2"
          title={
            <div className="text-sm font-medium flex items-center justify-between pr-8">
              {widget.name}
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Custom
              </span>
            </div>
          }
        />
        <CardContent className="flex items-center justify-center h-[calc(100%-4rem)] overflow-hidden">
          <div className="text-center p-4 w-full text-gray-700 text-sm">
            {widget.customText}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-80 relative overflow-hidden">
      <CardHeader
        className="pb-2"
        title={
          <div className="text-sm font-medium pr-8 truncate">
            {widget.name}
          </div>
        }
      />
      <CardContent className="overflow-hidden">
      </CardContent>
    </Card>
  );
}
