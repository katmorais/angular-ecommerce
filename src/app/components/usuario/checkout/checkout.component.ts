import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CheckoutService} from "../../../services/checkout.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarrinhoService} from "../../../services/carrinho.service";
import {CupomService} from "../../../services/cupom.service";

@Component({
  standalone: true,
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm = new FormGroup({
    address: new FormControl(''),
    cardNumber: new FormControl(''),
    expiryDate: new FormControl(''),
    cvv: new FormControl('')
  });

  constructor(private service: CheckoutService,
              private router: Router,
              private snackBar: MatSnackBar,
              private carrinhoService: CarrinhoService,
              private cupomService: CupomService) {
  }

  obterValorTotal(): string {
    return this.carrinhoService.obterValorTotal().toFixed(2);
  }

  onSubmit(): void {
    this.service.insert(this.checkoutForm.value, this.carrinhoService.obter(), JSON.parse(localStorage.getItem("usuario_logado")??"").id)
      .subscribe({
        next: () => {
          this.showSnackbarTopPosition('Compra realizada com sucesso!', 'Fechar');
          this.carrinhoService.removerTudo();
          this.carrinhoService.removerCupom();
          this.router.navigate(['/']);
        }, error: error => console.error(error)
      });
  }

  showSnackbarTopPosition(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

  onBlurCupom(event: any) {
    if (event.target.value) {
      this.cupomService.findByCupom(event.target.value)
        .subscribe({
          next: (cupons) => {
            if (cupons.length > 0) {
              this.carrinhoService.aplicarCupom(cupons[0]);
              this.showSnackbarTopPosition('Cupom aplicado com sucesso!', 'Fechar');
            } else {
              this.erroCupom();
            }
          }, error: () => this.erroCupom()
        })
    }
  }

  private erroCupom(): void {
    this.showSnackbarTopPosition('Cupom inválido!', 'Fechar');
    this.carrinhoService.removerCupom();
  }
}
