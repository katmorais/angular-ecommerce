import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Transportadora } from "../../../../models/transportadora";
import { TransportadoraService } from "../../../../services/transportadora.service";

export const transportadoraResolver: ResolveFn<Transportadora> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(TransportadoraService).findById(route.paramMap.get('id')!);
    }