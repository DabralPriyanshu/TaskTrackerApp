import React from "react";
import API from "../api/axios";

const TaskCard = ({ task, onEdit, onDelete, onStatusToggle }) => {
  const isCompleted = task.status === "Completed";

  return (
    <div
      className={`p-5 bg-white rounded-xl shadow-md border-l-4 transition-all hover:shadow-lg ${
        isCompleted
          ? "border-green-500 bg-green-50/30"
          : task.status === "In Progress"
            ? "border-yellow-500"
            : "border-blue-500"
      }`}
    >
      <div className="flex items-start justify-between space-x-2">
        <div className="flex items-start space-x-3 flex-1">
    
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onStatusToggle(task)}
            className="mt-1.5 h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 cursor-pointer"
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-bold text-gray-800 break-words ${isCompleted ? "line-through text-gray-400" : ""}`}
            >
              {task.title}
            </h3>
            <p
              className={`text-sm text-gray-600 mt-1 break-words ${isCompleted ? "line-through text-gray-400" : ""}`}
            >
              {task.description || "No description provided."}
            </p>
            <span
              className={`inline-block mt-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isCompleted
                  ? "bg-green-100 text-green-800"
                  : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            title="Edit Task"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
