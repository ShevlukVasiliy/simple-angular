import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockHead } from './block-head';

describe('BlockHead', () => {
  let component: BlockHead;
  let fixture: ComponentFixture<BlockHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockHead],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockHead);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
