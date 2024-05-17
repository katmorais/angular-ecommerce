import { Usuario } from "./usuario.model";

export class Cartao{
  id!: number
  nome!: String;
  numeroCartao!: String;
  dataVencimento!: String;
  usuario!: Usuario;


}