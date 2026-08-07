import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block-head',
  standalone: false,
  templateUrl: './block-head.html',
  styleUrl: './block-head.css',
})
export class BlockHead {
  @Input() title!: string;
}
