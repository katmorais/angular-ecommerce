import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Camiseta } from "../../../../models/camiseta.model";
import { CamisetaService } from "../../../../services/camiseta.service";

export const camisetaResolver: ResolveFn<Camiseta> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CamisetaService).findById(route.paramMap.get('id')!);
    }
