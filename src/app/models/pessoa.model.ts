import {UsuarioModel} from "./usuario.model";

export class PessoaModel {
  id!: number;
  username!: string;
  dataNascimento!: Date;
  cpf!: string;
  usuario!: UsuarioModel;
}
