import { Telefone } from "./telefone.model";


export class Transportadora {
    id!: number;
    nome!: string;
    capacidade!: number;
    tarifa!: number;
    listaTelefones: Telefone[] = [];

}