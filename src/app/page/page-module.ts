import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing-module';
import { Item } from './item/item';

@NgModule({
  declarations: [Item],
  imports: [CommonModule, PageRoutingModule],
})
export class PageModule {}
