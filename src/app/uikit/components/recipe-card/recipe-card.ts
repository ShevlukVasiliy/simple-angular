import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  imports: [NgClass],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  @Input() mode: 'blue' | 'basic' = 'basic';
  @Input() size: 'sm' | 'lg' = 'sm';
  @Input({ required: true }) title!: string;
  @Input({ required: true }) timeCooking!: number;
  @Input({ required: true }) tags!: string[];
  @Input({ required: true }) imageUrl!: string;

  printTags(): string {
    var tags = this.tags;

    if (tags.length === 0) {
      return '';
    }

    var firstTag = tags[0];
    var count = tags.length - 1;

    return `${firstTag} и еще ${count}`;
  }
}
