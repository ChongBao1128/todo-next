'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn UI Button component
import { Input } from "@/components/ui/input";   // Shadcn UI Input component
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Shadcn UI Card components

// Define the task type
type Task = {
  id: number;
  task: string;
  is_completed: boolean;
  inserted_at: Date;
};

export default function TodoApp() {
    // All the state and value are only available locally, will call api to execute the CRUD operations in the future
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [editTaskValue, setEditTaskValue] = useState("");

    // Add a new task
    const handleAddTask = () => {
        if (!newTask.trim()) return;
        const newTaskItem: Task = {
        id: Date.now(),
        task: newTask,
        is_completed: false,
        inserted_at: new Date(),
        };
        setTasks([...tasks, newTaskItem]);
        setNewTask("");
    };

    // Set a task in edit mode
    const handleEditTask = (taskId: number) => {
        const taskToEdit = tasks.find((task) => task.id === taskId);
        if (taskToEdit) {
        setEditTaskId(taskId);
        setEditTaskValue(taskToEdit.task);
        }
    };

    // Save the edited task
    const handleUpdateTask = () => {
        setTasks(
        tasks.map((t) =>
            t.id === editTaskId ? { ...t, task: editTaskValue } : t
        )
        );
        setEditTaskId(null);
        setEditTaskValue("");
    };

    // Delete a single task
    const handleDeleteTask = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
    };

    // Delete all tasks
    const handleDeleteAll = () => {
        setTasks([]);
    };

    // Toggle task completion
    const toggleComplete = (taskId: number) => {
        setTasks(
        tasks.map((t) =>
            t.id === taskId ? { ...t, is_completed: !t.is_completed } : t
        )
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
        <Card className="mb-4">
            <CardHeader>
            <h1 className="text-2xl font-bold">Todo App</h1>
            </CardHeader>
            <CardContent>
            {/* Add Task Section */}
            <div className="flex gap-2 mb-4">
                <Input
                type="text"
                placeholder="Add new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                />
                <Button onClick={handleAddTask}>Add Task</Button>
            </div>

            {/* Task List */}
            {tasks.length === 0 ? (
                <p>No tasks yet!</p>
            ) : (
                <ul className="space-y-2">
                {tasks.map((task) => (
                    <li
                    key={task.id}
                    className="flex items-center justify-between p-2 border rounded"
                    >
                    <div className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        checked={task.is_completed}
                        onChange={() => toggleComplete(task.id)}
                        className="cursor-pointer"
                        />
                        {editTaskId === task.id ? (
                        <Input
                            type="text"
                            value={editTaskValue}
                            onChange={(e) => setEditTaskValue(e.target.value)}
                        />
                        ) : (
                        <span
                            className={`${
                            task.is_completed ? "line-through text-gray-500" : ""
                            }`}
                        >
                            {task.task}
                        </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {editTaskId === task.id ? (
                        <Button variant="outline" onClick={handleUpdateTask}>
                            Save
                        </Button>
                        ) : (
                        <Button variant="outline" onClick={() => handleEditTask(task.id)}>
                            Edit
                        </Button>
                        )}
                        <Button variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                        Delete
                        </Button>
                    </div>
                    </li>
                ))}
                </ul>
            )}

            {/* Delete All Button */}
            {tasks.length > 0 && (
                <div className="mt-4">
                <Button variant="destructive" onClick={handleDeleteAll}>
                    Delete All Tasks
                </Button>
                </div>
            )}
            </CardContent>
        </Card>
        </div>
    );
}
