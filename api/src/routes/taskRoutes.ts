import express from "express";
import * as taskController from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", taskController.getAllTasks);
router.post("/tasks", taskController.createTask);
router.patch("/tasks/:id", taskController.updateTask);
router.patch("/tasks/:id/status", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;
