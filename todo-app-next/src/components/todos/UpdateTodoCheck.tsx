'use client';

import updateTodoStatus from "@/api/updateTodoStatus";

type TaskStatus = {
    id: number;
    is_complete: boolean;
    refetch: () => void;
}

const UpdateTodoCheck = ({id, is_complete, refetch}: TaskStatus) => {

    return (
        <input
            type="checkbox"
            checked={is_complete}
            className="cursor-pointer"
            onChange={async () => {
                // Update the task status
                await updateTodoStatus({ id, is_complete });

                refetch();
            }}
        />
    )
}

export default UpdateTodoCheck;