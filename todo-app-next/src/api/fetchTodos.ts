export type Todos = {
    id: number;
    task: string;
    is_completed: boolean;
    inserted_at: Date;
}

const fetchTodos = async (): Promise<Todos[]> => {
    const response = await fetch("https://todo-app-production-edaa.up.railway.app/todos");

    const data = await response.json()

    return data;
}

export default fetchTodos;