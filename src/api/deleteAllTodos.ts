const deleteAllTodos = async () => {
    try {
        const response = await fetch(`https://todo-app-production-edaa.up.railway.app/todos`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete all todos');
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        return data;
    } catch (error) {
        console.error(error);

        throw error;
    }
}

export default deleteAllTodos;