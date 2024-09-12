import { Link } from "react-router-dom";
import "../../listaProdutos";
import { MinhaTabela } from "../../style/styled";
import { Lista } from "../../types";
import { useState } from "react";

export default function Produtos() {

  //MUDANDO O TÍTULO DA PÁGINA!!!
  document.title = "PRODUTOS";
  
  const listaProdutosString = localStorage.getItem("lista") || '[]';
  const lista:Lista[] = JSON.parse(listaProdutosString);
  
  const [produtos] = useState<Lista[]>(lista);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <MinhaTabela>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Imagem</th>
            <th>Editar | Excluir</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>{produto.desc}</td>
              <td><img src={produto.imagem} alt={produto.nome} /></td>
              <td><Link to={`/editar/produtos/${produto.id}`}>Editar</Link> | <Link to={`/excluir/produtos/${produto.id}`}>Excluir</Link></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>Total de produtos: <span>{produtos.length}</span></td>
          </tr>
        </tfoot>
      </MinhaTabela>
    </div>
  );
}
