import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Usuario } from "../../../../models/usuario.model";
import { UsuarioService } from "../../../../services/usuario.service";

export const usuarioResolver: ResolveFn<Usuario> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(UsuarioService).findById(route.paramMap.get('id')!);
    }