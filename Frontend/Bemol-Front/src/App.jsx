import { useRef } from 'react'; // Importar o useState para gerenciar o estado da operação
import { api } from './services/api'

export default function App() {
  const tituloInputRef = useRef(null);
  const conteudoInputRef = useRef(null);

 

  async function CreateTask() {

    
    // Verificar se os campos estão preenchidos
    if (!tituloInputRef.current.value || !conteudoInputRef.current.value) {
      throw new Error("Por favor, preencha todos os campos.");
    }
    
    await api.post('/to-do', {
      titulo: tituloInputRef.current.value,
      conteudo: conteudoInputRef.current.value
    })
    
    tituloInputRef.current.value = "";
    conteudoInputRef.current.value = "";

}

  return (
    <>
      <header>
        <div className="bg-black flex flex-col items-center">
          <div className="w-5/12 flex bg-black justify-center items-center">
            <h1 className="text-xl text-white">Bemol Digital Api</h1>
          </div>
        </div>
      </header>
      <main className="items-center min-h-screen flex flex-col h-12 bg-gradient-to-r from-sky-500 to-indigo-500 flex-grow">
        <div className="mt-20 w-2/3 items-center justify-center text-white text-center text-7xl mb-24">
          <h1>Adicione uma tarefa</h1>
        </div>
        <div className="w-2/3 text-white items-center">
          <form className="flex flex-col space-y-4" onSubmit={CreateTask}>
            <input
              ref={tituloInputRef}
              type="text"
              placeholder="Insira um título"
              className="text-black rounded-md text-2xl"
            />

            <input
              ref={conteudoInputRef}
              type="text"
              placeholder="Descreva sua tarefa"
              className="text-black rounded-md px-2 h-28"
            />
            <button type="submit">Enviar</button>
          </form>


        </div>
      </main>
    </>
  );
}
