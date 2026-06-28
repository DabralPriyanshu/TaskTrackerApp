import React from "react";

const FilterBar = ({ filterStatus, setFilterStatus, sortBy, setSortBy }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-100">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-gray-500">
          Filter Status:
        </span>
        <div className="flex gap-1.5">
          {["All", "Pending", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterStatus === status
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
