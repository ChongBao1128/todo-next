const deleteTodo = async (id: number) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }

        return response.json();

    } catch (error) {
        console.error(error);

        throw error;
    }
}

export default deleteTodo;