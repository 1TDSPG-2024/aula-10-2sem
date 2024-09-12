import {  useNavigate, useParams } from "react-router-dom";
import { Lista } from "../../types";
import { useEffect, useState } from "react";


export default function ExcluirProdutos(){

      //MUDANDO O TÍTULO DA PÁGINA!!!
      document.title = "EXCLUIR PRODUTOS";

      //Realizando um destructuring para recuperar o parâmetro que foi passado na rota:
      //Ex: Se a rota criada foi: /meus-dados/:dados
      //O destructuring irá recuperar o dado que foi passado na rota e atribuir a propriedade de um elemento cuja o nome é aquele criado na rota, antes do dois pontos,ou seja, (:dados)
      //Então teriamos que realizar a seguinte ação para receber esta informação.
      // const{dados} = useParams(), um detalhe aqui é que o useParams() pertence ao react-router e deve ser importado dele
      const {id} = useParams();

      const navigate = useNavigate() 
 
      const listaProdutosString = localStorage.getItem("lista") || '[]';
      const lista:Lista[] = JSON.parse(listaProdutosString);


      const[prodEditar, setProdEditar] = useState<Lista>({
        id: 0,
        nome: "",
        preco: 0.0,
        desc:"",
        imagem:"",
      });

      useEffect(() => {
        
       
        const objSelecionado = lista.find(p => p.id == Number(id))
        if(objSelecionado){
        setProdEditar(objSelecionado);
        }
      }, [])
      

      const handleChange = (e:React.ChangeEvent) => {
        e.preventDefault()
        //Destructuring do evento com o target pegando os seguintes dados do input:
        //name e value
        const {name, value} = e.target as HTMLInputElement;
        setProdEditar({...prodEditar, [name]:value})
      }

      const handleSubmit = (evento:React.FormEvent<HTMLFormElement>) => {

        evento.preventDefault();

        let indexProduto:number;

        


        if(prodEditar){
          indexProduto = lista.findIndex(p => p.id == prodEditar.id)
          lista.splice(indexProduto,1);
          localStorage.setItem("lista", JSON.stringify(lista));
          alert("Produto excluido com sucesso!");
          navigate("/produtos")
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
              <input type="text" name="nome" disabled={true} value={prodEditar?.nome}  />
            </div>
            <div>
              <label>Preço:</label>
              <input type="number" name="preco" disabled={true}
              value={prodEditar?.preco}/>
            </div>
            <div>
              <label>Descrição:</label>
              <textarea name="desc" disabled={true} value={prodEditar?.desc}/>
            </div>
            <div>
              <figure>
                <img src={prodEditar?.imagem} alt={prodEditar?.desc} />
              </figure>
              <button type="submit">Excluir</button>
            </div>
            <div>
              <button type="submit">Editar</button>
            </div>
          </form>
        </div>
      </div>
    );
  } 