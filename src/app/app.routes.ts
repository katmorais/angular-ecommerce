import { Routes } from "@angular/router";
import { CamisetaFormComponent } from "./components/admin/camiseta/camiseta-form/camiseta-form.component";
import { CamisetaListComponent } from "./components/admin/camiseta/camiseta-list/camiseta-list.component";
import { camisetaResolver } from "./components/admin/camiseta/resolver/camiseta-resolver";
import { CartaoFormComponent } from "./components/admin/cartao/cartao-form/cartao-form.component";
import { CartaoListComponent } from "./components/admin/cartao/cartao-list/cartao-list.component";
import { cartaoResolver } from "./components/admin/cartao/resolver/cartao-resolver";
import { CidadeFormComponent } from "./components/admin/cidade/cidade-form/cidade-form.component";
import { CidadeListComponent } from "./components/admin/cidade/cidade-list/cidade-list.component";
import { cidadeResolver } from "./components/admin/cidade/resolver/cidade-resolver";
import { CupomFormComponent } from "./components/admin/cupom/cupom-form/cupom-form.component";
import { cupomResolver } from "./components/admin/cupom/resolver/cupom-resolver";
import { EstadoFormComponent } from "./components/admin/estado/estado-form/estado-form.component";
import { EstadoListComponent } from "./components/admin/estado/estado-list/estado-list.component";
import { estadoResolver } from "./components/admin/estado/resolver/estado-resolver";
import { FornecedorFormComponent } from "./components/admin/fornecedor/fornecedor-form/fornecedor-form.component";
import { FornecedorListComponent } from "./components/admin/fornecedor/fornecedor-list/fornecedor-list.component";
import { fornecedorResolver } from "./components/admin/fornecedor/resolver/fornecedor-resolver";
import { MarcaFormComponent } from "./components/admin/marca/marca-form/marca-form.component";
import { MarcaListComponent } from "./components/admin/marca/marca-list/marca-list.component";
import { tipocamisetaResolver } from "./components/admin/tipoCamiseta/resolver/tipoCamiseta-resolver";
import { TipoCamisetaFormComponent } from "./components/admin/tipoCamiseta/tipoCamiseta-form/tipoCamiseta-form.component";
import { TipoCamisetaListComponent } from "./components/admin/tipoCamiseta/tipoCamiseta-list/tipoCamiseta.list.component";
import { transportadoraResolver } from "./components/admin/transportadora/resolver/transportadora-resolver";
import { TransportadoraFormComponent } from "./components/admin/transportadora/transportadora-form/transportadora-form.component";
import { TransportadoraListComponent } from "./components/admin/transportadora/transportadora-list/transportadora-list.component";
import { usuarioResolver } from "./components/admin/usuario/resolver/usuario-resolver";
import { UsuarioFormComponent } from "./components/admin/usuario/usuario-form/usuario-form.component";
import { UsuarioListComponent } from "./components/admin/usuario/usuario-list/usuario-list.component";
import { CupomListComponent } from "./components/admin/cupom/cupom-list/cupom-list.component";
import { marcaResolver } from "./components/admin/marca/resolver/marca-resolver";


export const routes: Routes = [
    { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
    { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado'},
    { path: 'estados/edit/:id', component: EstadoFormComponent, resolve: {estado: estadoResolver}},

    { path: 'cidades', component: CidadeListComponent, title: 'Lista de Cidades'},
    { path: 'cidades/new', component: CidadeFormComponent, title: 'Nova Cidade'},
    { path: 'cidades/edit/:id', component: CidadeFormComponent, resolve: {cidade: cidadeResolver}},

    { path: 'transportadoras/list', component: TransportadoraListComponent, title: 'Lista de Transportadoras'},
    { path: 'transportadoras/new', component: TransportadoraFormComponent, title: 'Nova Transportadora'},
    { path: 'transportadoras/edit/:id', component: TransportadoraFormComponent, resolve: {transportadora: transportadoraResolver}},

    { path: 'cartoes', component: CartaoListComponent, title: 'Lista de Cartoes'},
    { path: 'cartoes/new', component: CartaoFormComponent, title: 'Novo Cartoes'},
    { path: 'cartoes/edit/:id', component: CartaoFormComponent, resolve: {cartao: cartaoResolver}},

    { path: 'cupons/list', component: CupomListComponent, title: 'Lista de Cupons'},
    { path: 'cupons/new', component: CupomFormComponent, title: 'Novo Cupom'},
    { path: 'cupons/edit/:id', component: CupomFormComponent, resolve: {cupom: cupomResolver}},

    { path: 'camisetas/list', component: CamisetaListComponent, title: 'Lista de Camisetas'},
    { path: 'camisetas/new', component: CamisetaFormComponent, title: 'Nova Camiseta'},
    { path: 'camisetas/edit/:id', component: CamisetaFormComponent, resolve: {camiseta: camisetaResolver}},

    { path: 'fornecedores/list', component: FornecedorListComponent, title: 'Lista de Fornecedores'},
    { path: 'fornecedores/new', component: FornecedorFormComponent, title: 'Novo Fornecedor'},
    { path: 'fornecedores/edit/:id', component: FornecedorFormComponent, resolve: {fornecedor: fornecedorResolver}},

    { path: 'tipocamisetas/list', component: TipoCamisetaListComponent, title: 'Lista de tipos de Camisetas'},
    { path: 'tipocamisetas/new', component: TipoCamisetaFormComponent, title: 'Novo Tipo de Camiseta'},
    { path: 'tipocamisetas/edit/:id', component: TipoCamisetaFormComponent, resolve: {tipoCamiseta: tipocamisetaResolver}},

    { path: 'marcas/list', component: MarcaListComponent, title: 'Lista de Marcas'},
    { path: 'marcas/new', component: MarcaFormComponent, title: 'Novo Tipo de Marca'},
    { path: 'marcas/edit/:id', component: MarcaFormComponent, resolve: {marcaCamiseta: marcaResolver}},

    { path: 'usuarios/list', component: UsuarioListComponent, title: 'Lista de Usuarios'},
    { path: 'usuarios/new', component: UsuarioFormComponent, title: 'Novo Usuario'},
    { path: 'usuarios/edit/:id', component: UsuarioFormComponent, resolve: {usuario: usuarioResolver}},

    { path: 'usuarios/:id/addcard', component: CartaoFormComponent, title: 'Lista de usuarios',resolve:{usuario: usuarioResolver}},

];

