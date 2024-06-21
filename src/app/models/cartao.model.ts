import { ClienteModel } from "./clienteModel";

export class Cartao{
  id!: number
  nome!: String;
  numeroCartao!: String;
  dataVencimento!: String;
  usuario!: ClienteModel;


}
