function App() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-50">
      <div className="max-w-[1200px] min-h-[100vh] md:min-h-[80vh] w-full p-6 px-8 bg-white rounded-xl shadow">
        <div className="text-3xl font-bold uppercase">Tarefas</div>
        <div className="flex gap-2 mt-4">
          <div className="flex-1 border rounded p-1 px-2">Pendente</div>
          <div className="flex-1 border rounded p-1 px-2">Em andamento</div>
          <div className="flex-1 border rounded p-1 px-2">Feito</div>
        </div>
      </div>
    </div>
  );
}

export default App;
