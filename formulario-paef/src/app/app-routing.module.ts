import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { FormularioPaefComponent } from './components/fomulario-paef/formulario-paef.component';

const routes: Routes = [
  { path: '', component: FormularioPaefComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
