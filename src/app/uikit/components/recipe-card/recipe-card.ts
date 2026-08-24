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
}
