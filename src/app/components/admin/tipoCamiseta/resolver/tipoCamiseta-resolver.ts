import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { TipoCamisetaService } from "../../../../services/tipoCamiseta.service";
import { TipoCamiseta } from "../../../../models/tipocamiseta.model";

export const tipocamisetaResolver: ResolveFn<TipoCamiseta> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(TipoCamisetaService).findById(route.paramMap.get('id')!);
    }
