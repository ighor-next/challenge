
export interface Task {
  id: string;
  titulo: string;
  descricao: string;
  status: 'Pendente' | 'Em andamento' | 'Feito';
}
