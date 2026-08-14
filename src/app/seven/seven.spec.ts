import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seven } from './seven';

describe('Seven', () => {
  let component: Seven;
  let fixture: ComponentFixture<Seven>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seven],
    }).compileComponents();

    fixture = TestBed.createComponent(Seven);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
