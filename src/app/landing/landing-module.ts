import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing-module';
import { Footer } from './footer/footer';
import { Navbar } from './navbar/navbar';
import { Page } from './page/page';
import { BlockContent } from './block-content/block-content';
import { BlockHead } from './block-head/block-head';
import { Main } from './main/main';
import { BootstrapDemo } from './bootstrap-demo/bootstrap-demo';
import { FormsModule } from '@angular/forms';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap/carousel';

@NgModule({
  declarations: [Page, Navbar, Footer, BlockHead, BlockContent, Main, BootstrapDemo],
  imports: [CommonModule, LandingRoutingModule, NgbCarousel, NgbSlide, FormsModule],
  exports: [Page],
})
export class LandingModule {}
