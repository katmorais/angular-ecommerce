import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Fornecedor } from "../../../../models/fornecedor.model";
import { FornecedorService } from "../../../../services/fornecedor.service";

export const fornecedorResolver: ResolveFn<Fornecedor> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(FornecedorService).findById(route.paramMap.get('id')!);
    }