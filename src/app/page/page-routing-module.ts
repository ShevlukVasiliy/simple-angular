import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Item } from './item/item';

const routes: Routes = [
  {
    path: '',
    component: Item,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
