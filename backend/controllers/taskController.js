const { v4: uuidv4 } = require('uuid');

let tarefas = [];


// Criar uma nova tarefa
exports.createTask = (req, res) => {
    const {titulo, descricao} = req.body;

    if(!titulo || !descricao){
        res.status(400).json({
            erro: true,
            mensagem: "Todos os campos são obrigatórios!"
        });
    }

    const novaTarefa = {
        id: uuidv4(),
        titulo,
        descricao
    };

    tarefas.push(novaTarefa);

    return res.status(201).json({
        erro: false,
        mensagem: "Tarefa criada com sucesso",
        tarefas: novaTarefa
    });
};

// Edita as Tarefas
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if(!tarefa) {
        return res.status(404).json({
            erro: true,
            mensagem: 'Tarefa não encontrada!'
        })
    }

    if(tarefa) tarefa.titulo = titulo;
    if(descricao) tarefa.descricao = descricao;

    return res.status(200).json({
        erro: false,
        mensagem: 'Tarefa editada com sucesso!'
    });

};

// Listar Tarefas
exports.listTasks = (req, res) => {
    return res.status(200).json({
        erro: false,
        mensagem: "Tarefas listadas com sucesso!",
        tarefas,
    })
};

// Deletar uma tarefa
exports.deleteTask = (req, res) => {
    const { id } = req.params;

    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if(!tarefa) {
        return res.status(404).json({
            erro: true,
            mensagem: "Tarefa não encontrada!"
        })
    }

    tarefas = tarefas.filter(t => t.id !== id);

    return res.status(200).json({
        erro: false,
        mensagem: "Tarefa deletada com sucesso!",
        tarefa,
    })


};