"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DeleteIcon } from "lucide-react";
import fetchTodos from "@/api/fetchTodos";
import AddNewTodo from "@/components/todos/AddNewTodo";
import UpdateTodoCheck from "@/components/todos/UpdateTodoCheck";
import EditableTask, { Task } from "@/components/todos/UpdateTodoTask";

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      setTasks(todos);
    };
    loadTodos();
  }, []);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <h1 className="text-2xl font-bold">Todo App</h1>
        </CardHeader>
        <CardContent>
          <AddNewTodo />

          {tasks && tasks.length > 0 ? (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between p-2 border rounded relative">
                  <div className="flex items-center gap-2">
                    <UpdateTodoCheck id={task.id} is_complete={task.is_complete} />
                    <EditableTask task={task} onTaskUpdated={handleTaskUpdate} />
                  </div>
                  <div className="flex gap-2">
                    <Button className="w-10 cursor-pointer" variant="destructive" disabled>
                      <DeleteIcon />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks found.</p>
          )}

          {tasks && tasks.length > 0 && (
            <div className="mt-4">
              <Button variant="destructive" disabled>
                Delete All Tasks
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoApp;
