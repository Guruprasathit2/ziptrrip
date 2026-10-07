import { useEffect, useState } from 'react';
import {
    useNavigate,
    useSearchParams
} from 'react-router-dom';

import {
    getTodoById,
    createTodo,
    updateTodo,
    type Todo
} from '../../service/ApiService';

import './TodoDetails.css';

function TodoDetails() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const todoId = searchParams.get('id');

    const isEdit = window.location.pathname === '/todos/edit';

    const [todo, setTodo] = useState<Todo>({
        title: '',
        description: '',
        isCompleted: 0
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (todoId) {
            getTodo();
        }

    }, [todoId]);

    const getTodo = async () => {

        try {

            setLoading(true);

            const result = await getTodoById(Number(todoId));

            if (result.data) {
                setTodo(result.data);
            }

        } catch (error) {

            console.error('Error fetching todo:', error);

        } finally {

            setLoading(false);

        }
    };

    const saveTodo = async () => {

        if (!todo.title.trim()) {

            alert('Title is required');

            return;
        }

        if (!todo.description.trim()) {

            alert('Description is required');

            return;
        }

        try {

            setLoading(true);

            if (isEdit && todoId) {

                await updateTodo(
                    Number(todoId),
                    todo
                );

                alert('Todo updated successfully');

            } else {

                await createTodo(todo);

                alert('Todo created successfully');

            }

            navigate('/todos');

        } catch (error) {

            console.error('Error saving todo:', error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (
            <div className="loading">
                Loading...
            </div>
        );

    }

    return (
        <div className="todo-details-container">

            <div className="details-header">

                <h1>
                    {isEdit ? 'Edit Todo' : 'Add Todo'}
                </h1>

                <button
                    onClick={() => navigate('/todos')}
                >
                    Back
                </button>

            </div>

            <div className="todo-form">

                <div className="form-group">

                    <label>Title</label>

                    <input
                        type="text"
                        value={todo.title}
                        onChange={(e) =>
                            setTodo({
                                ...todo,
                                title: e.target.value
                            })
                        }
                        placeholder="Enter title"
                    />

                </div>

                <div className="form-group">

                    <label>Description</label>

                    <textarea
                        value={todo.description}
                        onChange={(e) =>
                            setTodo({
                                ...todo,
                                description: e.target.value
                            })
                        }
                        placeholder="Enter description"
                        rows={5}
                    />

                </div>

                <div className="form-group">

                    <label>Status</label>

                    <select
                        value={todo.isCompleted}
                        onChange={(e) =>
                            setTodo({
                                ...todo,
                                isCompleted: Number(e.target.value)
                            })
                        }
                    >

                        <option value={0}>
                            Pending
                        </option>

                        <option value={1}>
                            Completed
                        </option>

                    </select>

                </div>

                <button
                    className="save-button"
                    onClick={saveTodo}
                >
                    {isEdit ? 'Update Todo' : 'Save Todo'}
                </button>

            </div>

        </div>
    );
}

export default TodoDetails;