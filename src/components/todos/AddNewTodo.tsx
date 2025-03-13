'use client';

import postTodo from "@/api/postTodo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

type AddNewTodoProps = {
    refetch: () => void;
}

const AddNewTodo = ({refetch}: AddNewTodoProps) => {
    const [task, setTask] = useState<string>('');

    const handleAddTask = async (task: string) => {
        await postTodo({
          task,
          is_complete: false,
          inserted_at: new Date(),
        });

        refetch();
        setTask('');
      }

    return (
        <div className="flex gap-2 mb-4">
            <Input type="text" placeholder="Add new task" value={task} onChange={(e) => setTask(e.target.value)} />
            <Button className="w-24 cursor-pointer" onClick={() => handleAddTask(task)}>Add Task</Button>
        </div>
    )
}

export default AddNewTodo;