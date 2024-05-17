import { Endereco } from "./endereco.model";
import { Telefone } from "./telefone.model";


export class Fornecedor {
    id!: number;
    nome!: string;
    dataContrato!: number;
    listaTelefone!: Telefone[];
    listaEndereco!: Endereco[];
}
