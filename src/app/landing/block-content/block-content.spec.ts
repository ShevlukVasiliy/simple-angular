import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockContent } from './block-content';

describe('BlockContent', () => {
  let component: BlockContent;
  let fixture: ComponentFixture<BlockContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockContent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
