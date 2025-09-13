import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

// Register chart components once before use
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function WidgetCard({ widget, onRemove, categoryId }) {
  // Chart data definitions
  const getPieData = () => ({
    labels: ["Passed", "Failed", "Warning"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
      },
    ],
  });

  const getBarData = () => ({
    labels: ["Critical", "High", "Medium", "Low"],
    datasets: [
      {
        label: "Vulnerabilities",
        data: [12, 19, 5, 7],
        backgroundColor: "#2196f3",
      },
    ],
  });

  const getLineData = () => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Alerts",
        data: [3, 7, 2, 9, 6],
        fill: false,
        borderColor: "#9c27b0",
        tension: 0.4,
      },
    ],
  });

  // Chart options
  const pieOptions = { maintainAspectRatio: false, plugins: { legend: { position: "right" } } };
  const barOptions = { maintainAspectRatio: false, plugins: { legend: { display: false } } };
  const lineOptions = { maintainAspectRatio: false, plugins: { legend: { display: true, position: "top" } } };

  // Debug log to verify
  console.log("Widget name:", widget.name, "Type:", widget.type);

  // Render chart by widget.type
  function renderChart() {
    switch (widget.type) {
      case "pie":
        return <Pie data={getPieData()} options={pieOptions} />;
      case "bar":
        return <Bar data={getBarData()} options={barOptions} />;
      case "line":
        return <Line data={getLineData()} options={lineOptions} />;
      default:
        return <div style={{ color: "#888", textAlign: "center" }}>No chart available</div>;
    }
  }

  return (
    <li className="widget-item">
      <div style={{ flex: 1 }}>
        <div className="widget-title">{widget.name}</div>
        <div className="widget-chart-placeholder" style={{ height: "120px", width: "100%" }}>
          {renderChart()}
        </div>
        <div className="widget-content">{widget.content}</div>
      </div>
      <button
        className="remove-button"
        onClick={() => onRemove(categoryId, widget.id)}
        title="Remove widget"
      >
        ×
      </button>
    </li>
  );
}
