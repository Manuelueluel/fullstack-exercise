import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaStudentComponent } from './pagina-student/pagina-student.component';
import { PaginaCorsoComponent } from './pagina-corso/pagina-corso.component';
import { Environment } from './environment';
import { ApiPaths } from './api-paths';

const routes: Routes = [
  { path: '', redirectTo: `${ApiPaths.student}`, pathMatch: 'full' },
  { path: `${ApiPaths.student}`, component: PaginaStudentComponent },
  { path: `${ApiPaths.corso}`, component: PaginaCorsoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
