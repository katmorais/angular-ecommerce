import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";

import { inject } from "@angular/core";
import { Cartao } from "../../../../models/cartao.model";
import { CartaoService } from "../../../../services/cartao.service";

export const cartaoResolver: ResolveFn<Cartao> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CartaoService).findById(route.paramMap.get('id')!);
    }
