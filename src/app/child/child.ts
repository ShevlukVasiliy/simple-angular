import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';

type Order = {
  orderNumber: number;
  id: string;
  authorName: string;
  order: any;
};

@Component({
  selector: 'app-child',
  imports: [NgTemplateOutlet],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  public orders: Order[] = [
    {
      orderNumber: 1,
      authorName: 'Иван',
      id: 'ord-1',
      order: { name: 'шоколадка' },
    },
    {
      orderNumber: 2,
      authorName: 'Николай',
      id: 'ord-2',
      order: { name: 'шоколадка' },
    },
    {
      orderNumber: 3,
      authorName: 'Сергей',
      id: 'ord-3',
      order: { name: 'валенки' },
    },
  ];
}
