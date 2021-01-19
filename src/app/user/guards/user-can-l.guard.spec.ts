import { TestBed } from '@angular/core/testing';

import { UserCanLGuard } from './user-can-l.guard';

describe('UserCanLGuard', () => {
  let guard: UserCanLGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserCanLGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
