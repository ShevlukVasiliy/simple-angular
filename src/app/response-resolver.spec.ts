import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { responseResolver } from './response-resolver';

describe('responseResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => responseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
