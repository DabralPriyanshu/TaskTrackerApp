
const Navbar = ({ onAddTaskClick }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">🎯 TaskTracker</h1>
          <p className="text-indigo-100 text-sm mt-1 font-medium">
            Create your tasks, track them flawlessly, and crush your daily goals.
          </p>
        </div>
        <button
          onClick={onAddTaskClick}
          className="bg-white text-indigo-600 font-bold px-5 py-2.5 rounded-xl shadow hover:bg-indigo-50 active:scale-95 transition-all flex items-center gap-2 shrink-0"
        >
          <span>➕</span> Create Task
        </button>
      </div>
    </header>
  );
};

export default Navbar;