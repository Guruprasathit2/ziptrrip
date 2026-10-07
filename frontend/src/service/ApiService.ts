const API_URL = 'http://localhost:9001/api';

export interface Todo {
    id?: number;
    title: string;
    description: string;
    isCompleted: number;
    createdDate?: string;
};

export interface TodoListParams {
    keyword?: string;
    startDate?: string;
    endDate?: string;
    isCompleted?: number | string;
    limit?: number;
    offset?: number;
};

export const getTodoList = async (params: TodoListParams = {}) => {

    const queryParams = new URLSearchParams();

    if (params.keyword) {
        queryParams.append('keyword', params.keyword);
    }

    if (params.startDate) {
        queryParams.append('startDate', params.startDate);
    }

    if (params.endDate) {
        queryParams.append('endDate', params.endDate);
    } if (
        params.isCompleted !== undefined &&
        params.isCompleted !== ''
    ) {
        queryParams.append(
            'isCompleted',
            String(params.isCompleted)
        );
    }

    if (params.limit !== undefined) {
        queryParams.append(
            'limit',
            String(params.limit)
        );
    }

    if (params.offset !== undefined) {
        queryParams.append(
            'offset',
            String(params.offset)
        );
    }

    const response = await fetch(`${API_URL}/todo/list?${queryParams.toString()}`);

    if (!response.ok) {
        throw new Error('Failed to fetch todo list');
    }

    return await response.json();
};

export const getTodoById = async (id: number) => {

    const response = await fetch(`${API_URL}/todo/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch todo');
    }

    return await response.json();
};

export const createTodo = async (data: Todo) => {

    const response = await fetch(`${API_URL}/todo/creation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to create todo');
    }

    return await response.json();
};

export const updateTodo = async (
    id: number,
    data: Todo
) => {

    const response = await fetch(`${API_URL}/todo/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }

    return await response.json();
};

export const deleteTodo = async (id: number) => {

    const response = await fetch(`${API_URL}/todo/delete/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }

    return await response.json();
};