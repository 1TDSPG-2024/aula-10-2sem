import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){

    //MUDANDO O TÍTULO DA PÁGINA!!!
    document.title = "Home";

    const navigate = useNavigate();

    useEffect(() => {
      console.log("Executando sempre!!!"); 
    });

    const [usuario, setUsuario] = useState({
      id:0,
      login:"",
      avatar_url:""
    })
    
    useEffect(() => {
      fetch("https://api.github.com/users/felipe-2833")
      .then(response =>{
        if(!response.ok){
            throw new Error("Requisição de dados falhou!!");
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setUsuario(data);
        })
        .catch(error => {
          console.error(error);
          navigate("/error");
        });

    },[]);

      let str = "";
      const [contador , setContador] = useState(0);

      const [conteudo] = useState("...")

      const mostraDif = () => {
        str = conteudo;
      }

    return(
      <div>
        <h1>Olá, mundo sou o Home!</h1>
        <p>Este o componente da página principal...</p>

          <div>
            <button onClick={()=> setContador(contador + 1)}>Contador - {contador}</button>
            <button onClick={()=> mostraDif()}>Show Dif</button>
              <p>{conteudo}</p>
          </div>
          <div>
            <figure>
              <img src={usuario.avatar_url} alt={usuario.login} />
              <figure>{usuario.login}</figure>
            </figure>
          </div>

      </div>
    );
  }