import { useState, useEffect } from "react";
import Category from "./components/Category";
import SearchBar from "./components/SearchBar";
import AddCategoryModal from "./components/AddCategoryModal"; // New import
import initialData from "./data/initialData.json";
import "./index.css";

export default function App() {
  const [dashboard, setDashboard] = useState(() => {
    const saved = localStorage.getItem("dashboard");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false); // State to control AddCategory modal

  useEffect(() => {
    localStorage.setItem("dashboard", JSON.stringify(dashboard));
  }, [dashboard]);

  function addWidget(categoryId, widget) {
    setDashboard((prev) => ({
      categories: prev.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, widgets: [...cat.widgets, widget] } : cat
      ),
    }));
  }

  function removeWidget(categoryId, widgetId) {
    setDashboard((prev) => ({
      categories: prev.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter((w) => w.id !== widgetId) }
          : cat
      ),
    }));
  }

  function handleAddCategory(newCategory) {
    setDashboard((prev) => ({
      categories: [...prev.categories, newCategory],
    }));
  }

  const filteredDashboard = {
    categories: dashboard.categories.map((cat) => ({
      ...cat,
      widgets: cat.widgets.filter((w) =>
        w.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 className="dashboard-title">Dynamic Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            className="button button-add-category"
            onClick={() => setIsAddCategoryOpen(true)}
          >
            + Add Category
          </button>
        </div>
      </div>

      <div className="grid-container">
        {filteredDashboard.categories.map((cat) => (
          <Category
            key={cat.id}
            category={cat}
            onAddWidget={addWidget}
            onRemoveWidget={removeWidget}
          />
        ))}
      </div>

      {isAddCategoryOpen && (
        <AddCategoryModal
          onAddCategory={handleAddCategory}
          onClose={() => setIsAddCategoryOpen(false)}
        />
      )}
    </div>
  );
}
