export type Todos = {
    id: number;
    task: string;
    is_complete: boolean;
    inserted_at: Date;
}

const fetchTodos = async (): Promise<Todos[]> => {
    try {
        const response = await fetch("https://todo-app-production-edaa.up.railway.app/todos");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
    }
}

export default fetchTodos;