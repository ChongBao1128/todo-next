const deleteTodo = async (id: number) => {
    try {
        const response = await fetch(`https://todo-app-production-edaa.up.railway.app/todos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default deleteTodo;
