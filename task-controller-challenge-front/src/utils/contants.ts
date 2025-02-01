import { getData } from "@/database/localstorageDao";
import { TaskTypes } from "@/ui/types/TaskTypes";


export const LOCAL_STORAGE_KEY = "myTaskList";
export const storedTasks = getData(LOCAL_STORAGE_KEY) as TaskTypes[];

export const mockTasks: TaskTypes[] = [
    {
      id: "1",
      title: "Finalizar relatório",
      description: "Escrever e revisar o relatório trimestral da empresa.",
      state: "Pendente",
      createdAt: new Date()
    },
    {
      id: "2",
      title: "Reunião com o time",
      description: "Discutir as metas para o próximo trimestre.",
      state: "Em andamento",
      createdAt: new Date()
    },
    {
      id: "3",
      title: "Implementar nova feature",
      description: "Desenvolver a funcionalidade de login com OAuth.",
      state: "Em andamento",
      createdAt: new Date()
    },
    {
      id: "4",
      title: "Atualizar documentação",
      description: "Revisar e atualizar a documentação da API.",
      state: "Feito",
      createdAt: new Date()
    },
    {
      id: "5",
      title: "Responder e-mails",
      description: "Verificar e responder os e-mails pendentes do suporte.",
      state: "Pendente",
      createdAt: new Date()
    },
  ];
  