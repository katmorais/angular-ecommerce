import { Cor } from "./cor.model"
import { Fornecedor } from "./fornecedor.model"
import { Marca } from "./marca.model"
import { Tamanho } from "./tamanho.model"
import { TipoCamiseta } from "./tipocamiseta.model"

export class Camiseta{
  id!:number
  nome!: String
  descricao!: String
  estoque!: number
  preco!: number
  estampa!: String
  tecido!: String
  fornecedor!: Fornecedor
  tipoCamiseta!: TipoCamiseta
  marca!: Marca
  cor!: Cor
}

