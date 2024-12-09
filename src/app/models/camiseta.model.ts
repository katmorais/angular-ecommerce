import {Cor} from "./cor.model"
import {Fornecedor} from "./fornecedor.model"
import {Marca} from "./marca.model"
import {TipoCamiseta} from "./tipocamiseta.model"
import {Tamanho} from "./tamanho.model";
import {SexoModel} from "./sexo.model";

export class Camiseta {
  id!: number
  nome!: string
  descricao!: string
  estoque!: number
  preco!: number
  estampa!: string
  tecido!: string
  tamanho!: Tamanho
  sexo!: SexoModel
  fornecedor!: Fornecedor
  tipoCamiseta!: TipoCamiseta
  marca!: Marca
  cores!: Cor[]
  nomeImagem!: string;
}

