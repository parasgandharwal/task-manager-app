import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
        />
        <button className="bg-blue-600 text-white px-4" onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, i) => (
          <li key={i} className="flex justify-between items-center border-b py-2">
            <span className={task.completed ? "line-through" : ""}>{task.text}</span>
            <div>
              <button className="mr-2 text-green-600" onClick={() => toggleTask(i)}>
                {task.completed ? "Undo" : "Done"}
              </button>
              <button className="text-red-600" onClick={() => deleteTask(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
