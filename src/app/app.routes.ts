import { Routes } from '@angular/router';
import { ProdutoListaComponent } from './components/produto-lista/produto-lista.component';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '', component: ProdutoListaComponent, canActivate: [authGuard] },
  { path: 'novo', component: ProdutoFormComponent, canActivate: [authGuard] },
  { path: 'editar/:id', component: ProdutoFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
