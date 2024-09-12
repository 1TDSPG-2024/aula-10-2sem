import { useNavigate, useParams } from "react-router-dom";
import { Lista } from "../../types";
import { useEffect, useState } from "react";

export default function ExcluirProdutos(){

      //MUDANDO O TÍTULO DA PÁGINA!!!
      document.title = "EXCLUIR PRODUTOS";

      const {id} = useParams();

      const navigate = useNavigate();
 
      const listaProdutosString = localStorage.getItem("lista") || '[]';
      const lista:Lista[] = JSON.parse(listaProdutosString);

      const[prodEditar, setProdEditar] = useState<Lista>({
        id: 0,
        nome: "",
        preco: 0,
        desc: "",
        imagem: "",
      });

      useEffect(() => {

        const objSelecionado = lista.find( p => p.id == Number(id))

        if(objSelecionado){
          setProdEditar(objSelecionado);
        }

      }, [])

      const handleSubmit = (evento:React.FormEvent<HTMLFormElement>) => {

        evento.preventDefault();

        let indexProduto:number;

        if(prodEditar){
          indexProduto = lista.findIndex(p => p.id == prodEditar.id)
          lista.splice(indexProduto,1);
          localStorage.setItem("lista", JSON.stringify(lista));
          alert("Produto excluído com sucesso!");
          navigate("/produtos");
        }else{
          alert("Erro ao excluir produto!");
        }

      }

      return(
      <div>
        <h1>Exclusão de Produto</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome:</label>
              <input type="text" name="nome" disabled={true} value={prodEditar?.nome}/>
            </div>
            <div>
              <label>Preço:</label>
              <input type="number" name="preco"  disabled={true} value={prodEditar?.preco}/>
            </div>
            <div>
              <label>Descrição:</label>
              <textarea name="desc" disabled={true} value={prodEditar?.desc}/>
            </div>
            <div>
              <figure>
                <img src={prodEditar?.imagem} alt={prodEditar?.desc} />
              </figure>
            </div>
            <div>
              <button type="submit">Excluir</button>
            </div>
          </form>
        </div>
      </div>
    );
  } 