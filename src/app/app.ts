import { Component, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public randomNumbers = signal<string[]>([]);
  public orderedNumbers = signal<number[]>([]);

  public isRandomRun = signal<boolean>(true);
  public isOrderedRun = signal<boolean>(true);

  public sub!: Subscription;

  constructor() {
    this.subscribe();
  }

  subscribe() {
    this.sub = interval(2000).subscribe(() => {
      if (this.isRandomRun()) {
        this.addToRandomNumbers(this.genRandomNumber());
      }
      if (this.isOrderedRun()) {
        var newValue = this.orderedNumbers().length + 1;
        this.addToOrderedNumbers(newValue);
      }
    });
  }

  addRandom() {
    this.isRandomRun.update(() => true);
  }
  addOrdered() {
    this.isOrderedRun.update(() => true);
  }
  dontAddRandom() {
    this.isRandomRun.update(() => false);
  }
  dontAddOrdered() {
    this.isOrderedRun.update(() => false);
  }

  public addToRandomNumbers(value: number) {
    this.randomNumbers.update((old) => [...old, `Random Value: ${value}`]);
  }
  public addToOrderedNumbers(value: number) {
    this.orderedNumbers.update((old) => [...old, value]);
  }

  public genRandomNumber(): number {
    return Math.floor(Math.random() * 1000);
  }
}
