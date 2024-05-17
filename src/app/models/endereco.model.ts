import { Cidade } from "./cidade.model";

export class Endereco {
  id!: number;
  cep!: String;
  rua!: String;
  numero!: String;
  complemento!: String;
  bairro!: String;
  cidade!: Cidade[];
}
