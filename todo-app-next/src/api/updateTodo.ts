type TodoItem = {
    id: number;
    task: string;
    inserted_at: Date;
}

const updateTodo = async ({id, task, inserted_at = new Date()}: TodoItem) => {
    try {
        const response = await fetch(`https://todo-app-production-edaa.up.railway.app/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ task, inserted_at }),
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

export default updateTodo;