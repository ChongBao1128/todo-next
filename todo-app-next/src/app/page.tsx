'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import fetchTodos from "@/api/fetchTodos";
import { DeleteIcon, EditIcon } from "lucide-react";

// Define the task type
type Task = {
  id: number;
  task: string;
  is_completed: boolean;
  inserted_at: Date;
};

const TodoApp = async () => {
  // Fetch todos from the API
  const tasks: Task[] = await fetchTodos();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <h1 className="text-2xl font-bold">Todo App</h1>
        </CardHeader>
        <CardContent>
          {/* Add Task Section - Input remains but is read-only */}
          <div className="flex gap-2 mb-4">
            <Input type="text" placeholder="Add new task" value="" readOnly />
            <Button className="w-24" disabled>Add Task</Button>
          </div>

          {/* Task List */}
          {tasks && tasks.length > 0 ? (
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
                      readOnly
                      className="cursor-pointer"
                    />
                    <span
                      className={`${
                        task.is_completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.task}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="w-10 cursor-pointer" variant="outline" disabled>
                      <EditIcon />
                    </Button>
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

          {/* Delete All Button */}
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
