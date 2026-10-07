"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoController = void 0;
const TodoLogService_1 = require("../Service/TodoLogService");
const TodoLog_1 = require("../Model/TodoLog");
const Todo_1 = require("../Model/Todo");
const TodoService_1 = require("../Service/TodoService");
class ToDoController {
    static async createToDo(request, response) {
        const { title, description } = request.body;
        if (!title || !description) {
            return response.status(400).send({
                status: 0,
                message: 'Title and description are required'
            });
        }
        try {
            const todo = new Todo_1.ToDo();
            todo.title = title;
            todo.description = description;
            todo.isCompleted = 0;
            const createdTodo = await TodoService_1.ToDoService.save(todo);
            const todoLog = new TodoLog_1.ToDoLog();
            todoLog.todoId = createdTodo.id;
            todoLog.title = createdTodo.title;
            todoLog.description = createdTodo.description;
            todoLog.isCompleted = createdTodo.isCompleted;
            await TodoLogService_1.ToDoLogService.save(todoLog);
            return response.status(201).send({
                status: 1,
                message: 'Todo created successfully'
            });
        }
        catch (err) {
            console.log('Create ToDo Error: ', err);
            return response.status(500).send({
                status: 0,
                message: 'Internal server error while creating todo'
            });
        }
    }
    ;
    static async list(request, response) {
        const { keyword, startDate, endDate, isCompleted, limit, offset } = request.query;
        const searchConditions = [];
        const whereConditions = [];
        if (keyword) {
            searchConditions.push({
                name: ['ToDo.title', 'ToDo.description'],
                value: keyword.toLowerCase(),
            });
        }
        if (startDate && endDate) {
            whereConditions.push({
                name: 'ToDo.createdDate',
                sign: 'BETWEEN',
                value: [startDate, endDate]
            });
        }
        if (+isCompleted === 0 || +isCompleted === 1) {
            whereConditions.push({
                name: 'ToDo.isCompleted',
                value: isCompleted
            });
        }
        const sort = [{
                name: 'ToDo.id',
                order: 'DESC'
            }];
        const todos = await TodoService_1.ToDoService.listByQueryBuilder(+limit || 10, +offset || 0, [], whereConditions, searchConditions, [], [], sort, false, false);
        const todosCount = await TodoService_1.ToDoService.listByQueryBuilder(0, 0, [], whereConditions, searchConditions, [], [], [], true, false);
        return response.status(200).send({
            status: todosCount ? 1 : 0,
            message: 'Todos listed successfully',
            count: todosCount,
            data: todos,
        });
    }
    ;
    static async updateToDo(request, response) {
        const { id } = request.params;
        const { title, description, isCompleted } = request.body;
        if (!id) {
            return response.status(400).send({
                status: 0,
                message: 'Param ID should not be empty'
            });
        }
        try {
            const todo = await TodoService_1.ToDoService.findOne({
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
            const updatedTodo = await TodoService_1.ToDoService.save(todo);
            const todoLog = new TodoLog_1.ToDoLog();
            todoLog.todoId = updatedTodo.id;
            todoLog.title = updatedTodo.title;
            todoLog.description = updatedTodo.description;
            todoLog.isCompleted = updatedTodo.isCompleted;
            await TodoLogService_1.ToDoLogService.save(todoLog);
            return response.status(200).send({
                status: 1,
                message: 'Todo updated successfully'
            });
        }
        catch (err) {
            console.log('Update ToDo Error: ', err);
            return response.status(500).send({
                status: 0,
                message: 'Internal server error while updating todo'
            });
        }
    }
    static async deleteToDo(request, response) {
        const { id } = request.params;
        if (!id) {
            return response.status(400).send({
                status: 0,
                message: 'ID is required'
            });
        }
        try {
            const todo = await TodoService_1.ToDoService.findOne({
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
            await TodoService_1.ToDoService.delete({ id: todo.id });
            return response.status(200).send({
                status: 1,
                message: 'Todo deleted successfully'
            });
        }
        catch (err) {
            console.log('Delete ToDo Error: ', err);
            return response.status(500).send({
                status: 0,
                message: 'Internal server error while deleting todo'
            });
        }
    }
}
exports.ToDoController = ToDoController;
;
//# sourceMappingURL=TodoController.js.map