import { useParams } from "react-router-dom";
import { Lista } from "../../types";
import { useEffect, useState } from "react";

export default function EditarProdutos(){

      //MUDANDO O TÍTULO DA PÁGINA!!!
      document.title = "EDITAR PRODUTOS";

      //Realizando um destructuring para recuperar o parâmetro que foi passado na rota:
      //Ex: Se a rota criada foi: /meus-dados/:dados
      //O destructuring irá recuperar o dado que foi passado na rota e atribuir a propriedade de um elemento cuja o nome é aquele criado na rota, antes do dois pontos,ou seja, (:dados)
      //Então teriamos que realizar a seguinte ação para receber esta informação.
      // const{dados} = useParams(), um detalhe aqui é que o useParams() pertence ao react-router e deve ser importado dele
      const {id} = useParams();
 
      const listaProdutosString = localStorage.getItem("lista") || '[]';
      const lista:Lista[] = JSON.parse(listaProdutosString);

      const [produto, setProduto] = useState<Lista>();

      const [prodEditar, setProdEditar] = useState(
        {
          id: Number(id),
          nome: "",
          preco: 0,
          desc:"",
          imagem:""
        }
      );
   
      useEffect(()=>{
        setProduto(lista.find((prod) => prod.id === Number(id)));
      },[]);

      const handleSubmit = (evento:React.FormEvent<HTMLFormElement>) => {

        evento.preventDefault();

        let indexProduto:number;

        


        if(prodEditar){
          indexProduto = lista.findIndex(p => p.id == prodEditar.id)
          lista.splice(indexProduto,1,prodEditar);
          localStorage.setItem("lista", JSON.stringify(lista));
          alert("Produto editado com sucesso!");
        }else{
          alert("Erro ao editar produto!");
        }

      }

      return(
      <div>
        <h1>Olá, mundo sou o EditarProdutos!</h1>
        <div>
          <h2>ID: {id}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome:</label>
              <input type="text" name="nome" value={prodEditar?.nome}  onChange={(e)=> setProdEditar({...prodEditar, nome:e.target.value})} />
            </div>
            <div>
              <label>Preço:</label>
              <input type="number" name="preco" value={prodEditar?.preco} onChange={(e)=> setProdEditar({...prodEditar, nome:e.target.value})}/>
            </div>
            <div>
              <label>Descrição:</label>
              <textarea name="desc" value={prodEditar?.desc} onChange={(e)=> setProdEditar({...prodEditar, nome:e.target.value})}/>
            </div>
            <div>
              <figure>
                <img src={prodEditar?.imagem} alt={prodEditar?.desc} />
              </figure>
            </div>
            <div>
              <button type="submit">Editar</button>
            </div>
          </form>
        </div>
      </div>
    );
  } 