import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts"

const COLORS = {
  connected: "#3b82f6",
  notConnected: "#98bbf5",
  failed: "#dc2626",
  warning: "#f59e0b",
  passed: "#16a34a",
  notAvailable: "#6b7280",
  critical: "#7f1d1d",
  high: "#dc2626",
  medium: "#f59e0b",
  moderate: "#f59e0b",
  low: "#16a34a",
  compliant: "#16a34a",
  nonCompliant: "#dc2626",
}

const getColor = (key) => COLORS[key] || "#6b7280"

export default function ChartRenderer({ widget }) {
  const chartData = Object.entries(widget.data).map(([key, value]) => ({
    name: key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase()),
    value,
    color: getColor(key),
  }))

  if (widget.chart === "pie") {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" outerRadius={70} dataKey="value">
            {chartData.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  if (widget.chart === "bar") {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="text-center text-gray-500 py-8">
      No Graph data available!
    </div>
  )
}
