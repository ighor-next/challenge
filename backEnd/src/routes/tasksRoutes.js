const express = require('express')
const { getTasks, addTask, updateTask, deleteTask, moveTask } = require('../controllers/taskController')

const router = express.Router()

router.get('/', getTasks) // Listar todas as tarefas
router.post('/', addTask) // Adicionar uma nova tarefa
router.put('/:id', updateTask) // Editar título/descrição
router.put('/:id/move', moveTask) // Mover tarefa entre colunas
router.delete('/:id', deleteTask) // Excluir tarefa

module.exports = router
