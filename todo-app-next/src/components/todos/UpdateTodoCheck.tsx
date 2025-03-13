'use client';

import fetchTodos from "@/api/fetchTodos";
import updateTodoStatus from "@/api/updateTodos";

type TaskStatus = {
    id: number;
    is_complete: boolean;
}

const UpdateTodoCheck = ({id, is_complete}: TaskStatus) => {

    return (
        <input
            type="checkbox"
            checked={is_complete}
            className="cursor-pointer"
            onChange={async () => {
                // Update the task status
                await updateTodoStatus({ id, is_complete });
            }}
        />
    )
}

export default UpdateTodoCheck;