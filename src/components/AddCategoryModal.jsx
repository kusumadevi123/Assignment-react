import React, { useState } from "react";

export default function AddCategoryModal({ onAddCategory, onClose }) {
  const [categoryName, setCategoryName] = useState("");

  function handleAdd() {
    if (!categoryName.trim()) return;
    onAddCategory({
      id: Date.now().toString(),
      name: categoryName,
      widgets: [],
    });
    setCategoryName("");
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Category</h3>
        <input
          type="text"
          className="widget-input"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="button" onClick={handleAdd}>
            Add
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
