import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block-content',
  standalone: false,
  templateUrl: './block-content.html',
  styleUrl: './block-content.css',
})
export class BlockContent {
  @Input() text!: string;
  @Input() direction: 'left' | 'right' | 'center' = 'left';
}
