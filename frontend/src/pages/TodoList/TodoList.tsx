import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    getTodoList,
    deleteTodo,
    type Todo
} from '../../service/ApiService';

import './TodoList.css';

function TodoList() {

    const navigate = useNavigate();

    const [todos, setTodos] = useState<Todo[]>([]);

    const [loading, setLoading] = useState(false);

    const [keyword, setKeyword] = useState('');

    const [startDate, setStartDate] = useState('');

    const [endDate, setEndDate] = useState('');

    const [isCompleted, setIsCompleted] = useState('');

    const [page, setPage] = useState(1);

    const [limit] = useState(10);

    const [totalCount, setTotalCount] = useState(0);

    const getTodos = async (
        currentPage = page
    ) => {

        try {

            setLoading(true);

            const offset = (currentPage - 1) * limit;

            const result = await getTodoList({

                keyword: keyword.trim(),

                startDate,

                endDate,

                isCompleted,

                limit,

                offset

            });

            setTodos(result.data || []);

            setTotalCount(result.count || 0);

        } catch (error) {

            console.error(
                'Error fetching todos:',
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        getTodos(1);

    }, []);

    const handleSearch = () => {

        setPage(1);

        getTodos(1);

    };

    const handleClear = () => {

        setKeyword('');

        setStartDate('');

        setEndDate('');

        setIsCompleted('');

        setPage(1);

        setTimeout(() => {
            getTodos(1);
        }, 0);

    };

    const handleDeleteTodo = async (id: number) => {

        const confirmDelete = window.confirm(
            'Are you sure you want to delete this Todo?'
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteTodo(id);

            getTodos(page);

        } catch (error) {

            console.error(
                'Error deleting todo:',
                error
            );

        }
    };

    const formatDate = (
        date: string | undefined
    ) => {

        if (!date) {
            return '-';
        }

        return new Date(date).toLocaleDateString(
            'en-IN',
            {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }
        );
    };

    const totalPages = Math.ceil(
        totalCount / limit
    );

    const handlePrevious = () => {

        if (page > 1) {

            const previousPage = page - 1;

            setPage(previousPage);

            getTodos(previousPage);
        }
    };

    const handleNext = () => {

        if (page < totalPages) {

            const nextPage = page + 1;

            setPage(nextPage);

            getTodos(nextPage);
        }
    };

    return (
        <div className="todo-page">

            <div className="todo-page-header">

                <h2>Todo List</h2>

                <button
                    className="add-todo-btn"
                    onClick={() =>
                        navigate('/todos/add')
                    }
                >
                    + Add Todo
                </button>

            </div>

            <div className="todo-filter-container">

                <div className="filter-group">

                    <label>
                        Keyword
                    </label>

                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(e.target.value)
                        }
                        placeholder="Title / Description"
                    />

                </div>

                <div className="filter-group">

                    <label>
                        Start Date
                    </label>

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(e.target.value)
                        }
                    />

                </div>

                <div className="filter-group">

                    <label>
                        End Date
                    </label>

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate(e.target.value)
                        }
                    />

                </div>

                <div className="filter-group">

                    <label>
                        Status
                    </label>

                    <select
                        value={isCompleted}
                        onChange={(e) =>
                            setIsCompleted(e.target.value)
                        }
                    >

                        <option value="">
                            All
                        </option>

                        <option value="0">
                            Pending
                        </option>

                        <option value="1">
                            Completed
                        </option>

                    </select>

                </div>

                <div className="filter-buttons">

                    <button
                        className="search-btn"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    <button
                        className="clear-btn"
                        onClick={handleClear}
                    >
                        Clear
                    </button>

                </div>

            </div>

            {/* Table */}

            <div className="todo-table-container">

                {loading ? (

                    <div className="loading">
                        Loading...
                    </div>

                ) : todos.length === 0 ? (

                    <div className="no-data">
                        No Todo Found
                    </div>

                ) : (

                    <table className="todo-table">

                        <thead>

                            <tr>

                                <th>S.No</th>

                                <th>
                                    Title
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Is Completed
                                </th>

                                <th>
                                    Created Date
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {todos.map(
                                (todo, index) => (

                                    <tr
                                        key={todo.id}
                                    >

                                        <td>
                                            {(
                                                (page - 1) *
                                                limit
                                            ) + index + 1}
                                        </td>

                                        <td className="title-column">

                                            {todo.title}

                                        </td>

                                        <td className="description-column">

                                            {todo.description}

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    todo.isCompleted === 1
                                                        ? 'status completed'
                                                        : 'status pending'
                                                }
                                            >

                                                {todo.isCompleted === 1
                                                    ? 'Completed'
                                                    : 'Pending'}

                                            </span>

                                        </td>

                                        <td>

                                            {formatDate(
                                                todo.createdDate
                                            )}

                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="delete-btn"
                                                    title="Delete"
                                                    onClick={() =>
                                                        handleDeleteTodo(
                                                            todo.id!
                                                        )
                                                    }
                                                >
                                                    🗑️
                                                </button>

                                                <button
                                                    className="update-btn"
                                                    title="Update"
                                                    onClick={() =>
                                                        navigate(
                                                            `/todos/edit?id=${todo.id}`
                                                        )
                                                    }
                                                >
                                                    ✏️
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                )}

            </div>

            {/* Pagination */}

            {totalCount > 0 && (

                <div className="pagination-container">

                    <div className="pagination-info">

                        Showing{' '}

                        {((page - 1) * limit) + 1}

                        {' - '}

                        {Math.min(
                            page * limit,
                            totalCount
                        )}

                        {' '}of{' '}

                        {totalCount}

                    </div>

                    <div className="pagination-buttons">

                        <button
                            disabled={page === 1}
                            onClick={handlePrevious}
                        >
                            Previous
                        </button>

                        <span>
                            Page {page} of {totalPages}
                        </span>

                        <button
                            disabled={
                                page === totalPages
                            }
                            onClick={handleNext}
                        >
                            Next
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default TodoList;