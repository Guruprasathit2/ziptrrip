import  * as express from 'express';
import { ToDoController } from '../Controller/TodoController';
const router = express.Router();

router.post('/todo/creation', ToDoController.createToDo);
router.get('/todo/list', ToDoController.list);
router.put('/todo/update/:id', ToDoController.updateToDo);
router.delete('/todo/delete/:id', ToDoController.deleteToDo);
router.get('/todo/:id', ToDoController.totData);
export default router;