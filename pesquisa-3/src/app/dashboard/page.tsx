export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Bem-vindo ao sistema de pesquisas.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg">Criar Pesquisa</h2>
            <p className="text-sm text-slate-500 mt-2">
              Crie uma nova pesquisa para seus clientes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg">Minhas Pesquisas</h2>
            <p className="text-sm text-slate-500 mt-2">
              Veja todas as pesquisas criadas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg">Resultados</h2>
            <p className="text-sm text-slate-500 mt-2">
              Analise as respostas recebidas.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}