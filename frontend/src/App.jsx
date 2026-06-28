import React, { useState, useEffect } from "react";
import API from "./api/axios";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import TaskCard from "./components/TaskCard";
import TaskModal from "./components/TaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal Control States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filter & Sort States
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch all tasks initially
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await API.get("/");
      setTasks(response.data.data);
      setError("");
    } catch (err) {
      setError(err.response.data.error);
      console.dir(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle Create or Edit submission
  const handleModalSubmit = async (formData) => {
    try {
      if (selectedTask) {
        // --- UPDATE TASK ---
        await API.put(`/${selectedTask._id}`, formData);
        fetchTasks();
      } else {
        // --- CREATE TASK ---
        await API.post("/", formData);
        fetchTasks();
      }
    } catch (err) {
      alert(err.response?.data?.error || "Task operation failed.");
    }
  };

  const handleStatusToggle = async (task) => {
    const currentCompletedStatus = task.status === "Completed";
    const updatedTasks = tasks.map((t) =>
      t._id === task._id
        ? { ...t, status: !currentCompletedStatus ? "Completed" : "Pending" }
        : t,
    );
    setTasks(updatedTasks);

    try {
      await API.patch(`/status/${task._id}`, {
        isCompleted: !currentCompletedStatus,
      });
    } catch (error) {
      console.log(error);
      // on error rollback
      setTasks(tasks);
      alert(error.response?.data?.error || "Error while updating status");
    }
  };
  // Delete Task
  const handleDeleteTask = async (id) => {
    if (window.confirm("do you want to delete task?")) {
      try {
        await API.delete(`/${id}`);
        fetchTasks();
      } catch (err) {
        alert(err.response.data.error);
      }
    }
  };

  // Trigger Edit Modal
  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Trigger Create Modal
  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  // --- FRONTEND FILTERING & SORTING LOGIC ---
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "All") return true;
    return task.status === filterStatus;
  });



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onAddTaskClick={openCreateModal} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 space-y-6">
        <FilterBar
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-400 text-lg font-medium">
              No task found please create task ! ✨
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
                onStatusToggle={handleStatusToggle}
              />
            ))}
          </div>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={selectedTask}
      />
    </div>
  );
}

export default App;
