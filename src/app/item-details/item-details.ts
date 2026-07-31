import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-item-details',
  imports: [RouterOutlet],
  templateUrl: './item-details.html',
  styleUrl: './item-details.css',
})
export class ItemDetails implements OnInit {
  constructor(private activeRoute: ActivatedRoute) {}
  ngOnInit() {
    console.log('current parameter of item: ', this.activeRoute.snapshot.params);
  }
}
