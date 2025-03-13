"use client";

import React, { useState } from "react";
import updateTodo from "@/api/updateTodo";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";

export type Task = {
  id: number;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
};

interface EditableTaskProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
}

const EditableTask: React.FC<EditableTaskProps> = ({ task, onTaskUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.task);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(task.task);
  };

  const handleSave = async () => {
    const updatedTask = {
      ...task,
      task: editedText,
      inserted_at: new Date(), // update timestamp
    };

    try {
      await updateTodo(updatedTask);
      setIsEditing(false);
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <>
          <input
            type="text"
            className="border rounded p-1 w-72"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />

          <Button variant="outline" onClick={handleSave}>
            Save
          </Button>
          <Button variant="destructive" onClick={handleCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <div className="flex items-center">
          <span className={`${task.is_complete ? "line-through text-gray-500" : ""}`}>
            {task.task}
          </span>

          <Button className="w-10 cursor-pointer absolute right-14" variant="outline" onClick={handleEditClick}>
            <EditIcon />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditableTask;
