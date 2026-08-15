import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Child } from './child/child';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Child],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  @ViewChild('child', { read: ViewContainerRef })
  private viewRef!: ViewContainerRef;
  private componentRef!: ComponentRef<Child>;
  addComponent() {
    this.viewRef.clear();
    this.componentRef = this.viewRef.createComponent(Child);
  }
  deleteComponent() {
    this.viewRef.clear();
  }
}
