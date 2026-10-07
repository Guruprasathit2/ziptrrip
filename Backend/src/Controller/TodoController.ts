import { ToDoLogService } from '../Service/TodoLogService';
import { ToDoLog } from '../Model/TodoLog';
import { ToDo } from '../Model/Todo';
import { ToDoService } from '../Service/TodoService';

export class ToDoController {
    static async createToDo(request: any, response: any) {
        const { title, description } = request.body;
        if (!title || !description) {
            return response.status(400).send({
                status: 0,
                message: 'Title and description are required'
            });
        }

        try {
            const todo = new ToDo();
            todo.title = title;
            todo.description = description;
            todo.isCompleted = 0;
            const createdTodo = await ToDoService.save(todo);
    
            const todoLog = new ToDoLog();
            todoLog.todoId = createdTodo.id;
            todoLog.title = createdTodo.title;
            todoLog.description = createdTodo.description;
            todoLog.isCompleted = createdTodo.isCompleted;
            await ToDoLogService.save(todoLog);
    
            return response.status(201).send({
                status: 1,
                message: 'Todo created successfully'
            });
        } catch(err: any) {
            console.log ('Create ToDo Error: ', err);
            return response.status(500).send({
                status: 0,
                message: 'Internal server error while creating todo'
            });
        }
    };

    static async list(request: any, response: any) {
        const { keyword, startDate, endDate, isCompleted, limit, offset } = request.query;
        const searchConditions: any[] = [];
        const whereConditions: any[] = [];
        if (keyword) {
            searchConditions.push(
                {
                    name: ['ToDo.title', 'ToDo.description'],
                    value: keyword.toLowerCase(),
                },
            );
        }
        if (startDate && endDate) {
            whereConditions.push(
                {
                    name: 'ToDo.createdDate',
                    op: 'BETWEEN',
                    value1: `'${startDate}'`,
                    value2: `'${endDate}'`
                }
            );
        }
        if (+isCompleted === 0 || +isCompleted === 1) {
            whereConditions.push(
                {
                    name: 'ToDo.isCompleted',
                    op: 'and',
                    value: isCompleted
                }
            );
        }

        const sort = [{
            name: 'ToDo.id',
            order: 'DESC'
        }];
        console.log (whereConditions);
        const todos = await ToDoService.listByQueryBuilder(+limit || 10, +offset || 0, [], whereConditions, searchConditions, [], [], sort, false, false);
        const todosCount = await ToDoService.listByQueryBuilder(0, 0, [], whereConditions, searchConditions, [], [], [], true, false);
        return response.status(200).send({
            status: todosCount ? 1 : 0,
            message: 'Todos listed successfully',
            count: todosCount,
            data: todos,
        });
    };

    static async updateToDo(request: any, response: any) {
        const { id } = request.params;
        const { title, description, isCompleted } = request.body;
        if (!id ) {
            return response.status(400).send({
                status: 0,
                message: 'Param ID should not be empty'
            });
        }
        try {
            const todo = await ToDoService.findOne({
                where: {
                    id: id
                }
            });
            if (!todo) {
                return response.status(404).send({
                    status: 0,
                    message: 'Todo not found'
                });
            }
            todo.title = title || todo.title;
            todo.description = description || todo.description;
            todo.isCompleted = isCompleted;
            const updatedTodo = await ToDoService.save(todo);
    
            const todoLog = new ToDoLog();
            todoLog.todoId = updatedTodo.id;
            todoLog.title = updatedTodo.title;
            todoLog.description = updatedTodo.description;
            todoLog.isCompleted = updatedTodo.isCompleted;
            await ToDoLogService.save(todoLog);
    
            return response.status(200).send({
                status: 1,
                message: 'Todo updated successfully'
            });
        } catch(err: any) {
            console.log ('Update ToDo Error: ', err);
            return response.status(500).send({
                status: 0,
                message: 'Internal server error while updating todo'
            });
        }
    };

    static async deleteToDo(request: any, response: any) {
        const { id } = request.params;
        if (!id) {
            return response.status(400).send({
                status: 0,
                message: 'ID is required'
            });
        }
        try {
            const todo = await ToDoService.findOne({
                where: {
                    id: id
                }
            });
            if (!todo) {
                return response.status(404).send({
                    status: 0,
                    message: 'Todo not found'
                });
            }
            await ToDoService.delete({id: todo.id});
            return response.status(200).send({
                status: 1,
                message: 'Todo deleted successfully'
            });
        } catch(err: any) {
            console.log ('Delete ToDo Error: ', err);
            return response.status(500).send({
                status: 0,
                message: 'Internal server error while deleting todo'
            });
        }
    };

    static async totData(request: any, response: any) {
        try {
            const id = request.params.id;
            if (!id) {
                return response.status(400).send({
                    status: 0,
                    message: 'ID is required'
                });
            }
            const todo = await ToDoService.findOne({
                where: {
                    id: id
                }
            });
            if (!todo) {
                return response.status(404).send({
                    status: 0,
                    message: 'Todo not found'
                });
            }
            return response.status(200).send({
                status: 1,
                message: 'Todo data retrieved successfully',
                data: todo
            });
        } catch(err) {
            console.log('Get Todo Data Error: ', err);
            return response.status(500).send({
                status: 0,
                message: 'Internal server error while retrieving todo data'
            });
        }
    }
};