import { useRef, useState } from 'react'; // Importar o useState para gerenciar o estado da operação
import axios from 'axios';

export default function App() {
  const tituloInputRef = useRef(null);
  const conteudoInputRef = useRef(null);
  const [mensagem, setMensagem] = useState(""); // Estado para armazenar a mensagem de feedback

  async function CreateTask() {
    try {
      // Verificar se os campos estão preenchidos
      if (!tituloInputRef.current.value || !conteudoInputRef.current.value) {
        throw new Error("Por favor, preencha todos os campos.");
      }
      
      await axios.post(
        "https://localhost:3000/to-do/own",
        {titulo: tituloInputRef.current.value, conteudo: conteudoInputRef.current.value}
      );

      // Atualizar a mensagem de feedback
      setMensagem("Tarefa adicionada com sucesso!");
      
      // Limpar os campos após o envio bem-sucedido
      tituloInputRef.current.value = "";
      conteudoInputRef.current.value = "";
    } catch (error) {
      // Capturar e exibir erros
      setMensagem(`Erro: ${error.message}`);
    }
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
          {/* Exibir a mensagem de feedback para o usuário */}
          {mensagem && <p>{mensagem}</p>}
          <form className="flex flex-col space-y-4" onSubmit={(e) => {
            e.preventDefault(); // Prevenir o comportamento padrão do formulário
            CreateTask(); // Chamar a função de envio quando o formulário for enviado
          }}>
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
