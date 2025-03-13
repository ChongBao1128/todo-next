export type TodoStatus = {
    id: number;
    is_complete: boolean;
}

const updateTodoStatus = async ({id, is_complete}: TodoStatus) => {
    try {
        const response = await fetch(`https://todo-app-production-edaa.up.railway.app/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_complete: !is_complete }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        return data;
    } catch (error) {
        console.error("Failed to update todo:", error);

        throw error;
    }
}

export default updateTodoStatus;