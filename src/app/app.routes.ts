import { Routes } from '@angular/router';
import { Root } from './root/root';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { ItemDetails } from './item-details/item-details';
import { ItemList } from './item-list/item-list';
import { Item } from './item/item';

export const routes: Routes = [
  {
    path: '',
    component: Root,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'item/:id',
    component: Item,
  },
  {
    path: 'item/:id/details',
    component: ItemDetails,
  },
  {
    path: 'item/:id/list',
    component: ItemList,
  },
];
