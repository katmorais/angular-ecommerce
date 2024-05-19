import { Cor } from "./cor.model"
import { Fornecedor } from "./fornecedor.model"
import { Marca } from "./marca.model"
import { Tamanho } from "./tamanho.model"
import { TipoCamiseta } from "./tipocamiseta.model"

export class Camiseta{
  id!:number
  nome!: string
  descricao!: string
  estoque!: number
  preco!: number
  estampa!: string
  tecido!: string
  fornecedor!: Fornecedor
  tipoCamiseta!: TipoCamiseta
  marca!: Marca
  cor!: Cor
}

