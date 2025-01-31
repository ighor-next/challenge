import { useState } from "react";

import { Layout, Loader2 } from "lucide-react";
import TaskColumn from "./components/TaskColumn";
import AddTaskModal from "./components/AddTaskModal";
import { useTasks } from "./hooks/useTasks";

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const { tasks, loading, error, addTask, updateTask, deleteTask, moveTask } =
    useTasks();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center space-x-3">
            <Layout className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-white">Task Management</h1>
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TaskColumn
            title="Pending"
            status="pending"
            tasks={tasks}
            onAddTask={() => setShowAddModal(true)}
            onMoveTask={moveTask}
            onEditTask={updateTask}
            onDeleteTask={deleteTask}
          />
          <TaskColumn
            title="In Progress"
            status="in-progress"
            tasks={tasks}
            onMoveTask={moveTask}
            onEditTask={updateTask}
            onDeleteTask={deleteTask}
          />
          <TaskColumn
            title="Done"
            status="done"
            tasks={tasks}
            onMoveTask={moveTask}
            onEditTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </main>

        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onAdd={addTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
