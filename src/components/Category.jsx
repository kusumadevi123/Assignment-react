import React, { useState } from "react";
import WidgetCard from "./WidgetCard";
import AddWidgetModal from "./AddWidgetModal";

export default function Category({ category, onAddWidget, onRemoveWidget }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="card">
      <h2 className="category-title">{category.name}</h2>
      <ul className="widget-list">
        {category.widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            onRemove={onRemoveWidget}
          />
        ))}
        {/* Add Widget Card (like screenshot) */}
        <li
          className="add-widget-card"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Widget
        </li>
      </ul>
      {isModalOpen && (
        <AddWidgetModal
          categoryId={category.id}
          onAddWidget={onAddWidget}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
