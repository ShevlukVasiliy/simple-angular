import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inline } from './inline';

describe('Inline', () => {
  let component: Inline;
  let fixture: ComponentFixture<Inline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inline],
    }).compileComponents();

    fixture = TestBed.createComponent(Inline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
