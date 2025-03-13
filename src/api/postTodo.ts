export type Todos = {
    task: string;
    is_complete: boolean;
    inserted_at: Date;
}

const postTodo = async (body: Todos): Promise<Todos> => {
    try {
        const response = await fetch("https://todo-app-production-edaa.up.railway.app/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if there is any content in the response
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        return data;
    } catch (error) {
        console.error("Failed to create todo:", error);
        throw error;
    }
}

export default postTodo;