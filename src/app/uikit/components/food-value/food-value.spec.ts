import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodValue } from './food-value';

describe('FoodValue', () => {
  let component: FoodValue;
  let fixture: ComponentFixture<FoodValue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodValue],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodValue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
