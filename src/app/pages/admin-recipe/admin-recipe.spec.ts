import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipe } from './admin-recipe';

describe('AdminRecipe', () => {
  let component: AdminRecipe;
  let fixture: ComponentFixture<AdminRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRecipe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
