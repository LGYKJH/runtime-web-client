"use client";

import React, { useState } from "react";

function CrewCalendarEventForm({ selectedDate, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    category: "",
    place: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.place || !formData.startTime) {
      alert("Please fill out all required fields.");
      return;
    }
    onSubmit({ ...formData, selectedDate });
  };

  return (
    <div className="mt-4 p-4 border rounded-lg shadow">
      <h3 className="text-lg font-bold">
        Add Event on {selectedDate.toDateString()}
      </h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select</option>
            <option value="Regular Meeting">Regular Meeting</option>
            <option value="Lightning Meeting">Lightning Meeting</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Place</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrewCalendarEventForm;
export { CrewCalendarEventForm };
