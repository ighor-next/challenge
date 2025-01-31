import express from 'express';
import {
  createTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from '../controllers/taskController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { checkTaskOwnership } from '../middlewares/checkTaskOwnership.js';

const router = express.Router();

router.post('/', authMiddleware, createTask);
router.get('/', authMiddleware, getAllTasks);
router.put('/:id', authMiddleware, checkTaskOwnership, updateTask);
router.patch(
  '/:id/status',
  authMiddleware,
  checkTaskOwnership,
  updateTaskStatus
);
router.delete('/:id', authMiddleware, checkTaskOwnership, deleteTask);

export default router;
