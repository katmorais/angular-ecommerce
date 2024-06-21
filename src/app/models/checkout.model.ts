import {ItemCarrinho} from "./itemcarrinho.model";

export class Checkout {
  id!: number;
  address!: string;
  cardNumber!: string;
  expiryDate!: string;
  cvv!: string;
  itens!: ItemCarrinho[];
}
