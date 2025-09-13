import React, { useState } from "react";

export default function AddWidgetModal({ categoryId, onAddWidget, onClose }) {
  const [widgetName, setWidgetName] = useState("");
  const [widgetContent, setWidgetContent] = useState("");
  const [widgetType, setWidgetType] = useState("pie"); 

  function handleAdd() {
    if (!widgetName) return;
    const widget = {
      id: Date.now(),
      name: widgetName,
      content: widgetContent || "Random text here",
      type: widgetType,  
    };
    onAddWidget(categoryId, widget);
    setWidgetName("");
    setWidgetContent("");
    setWidgetType("pie");  
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Widget</h3>
        <input
          type="text"
          className="widget-input"
          placeholder="Widget name"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
        />
        <textarea
          className="widget-input"
          placeholder="Widget content"
          value={widgetContent}
          onChange={(e) => setWidgetContent(e.target.value)}
        />
        <select
          className="widget-input"
          value={widgetType}
          onChange={(e) => setWidgetType(e.target.value)}
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
        </select>
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
