export type TaskTypes = {
    id: string
    title: string
    description: string
    state: string,
    createdAt: Date,
}


export enum TaskState {
    Pending = "Pendente",
    InProgress = "Em andamento",
    Done = "Feito"
}