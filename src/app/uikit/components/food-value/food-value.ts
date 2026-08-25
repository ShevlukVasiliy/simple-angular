import { Component, Input } from '@angular/core';
import { FoodValue as FoodValueData } from '../../../interface/posts/get-post';

@Component({
  selector: 'app-food-value',
  imports: [],
  templateUrl: './food-value.html',
  styleUrl: './food-value.css',
})
export class FoodValue {
  @Input({ required: true }) foodValue!: FoodValueData;
}
