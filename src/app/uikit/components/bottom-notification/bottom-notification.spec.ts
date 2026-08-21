import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNotification } from './bottom-notification';

describe('BottomNotification', () => {
  let component: BottomNotification;
  let fixture: ComponentFixture<BottomNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
