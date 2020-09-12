import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {TableComponent} from '../components/table/table.component';
import {NotFoundComponent} from '../components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
