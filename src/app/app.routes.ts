import { Routes } from '@angular/router';
import { ProdutoListaComponent } from './components/produto-lista/produto-lista.component';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';

export const routes: Routes = [
  { path: '', component: ProdutoListaComponent },
  { path: 'novo', component: ProdutoFormComponent },
  { path: 'editar/:id', component: ProdutoFormComponent },
  { path: '**', redirectTo: '' }
];
