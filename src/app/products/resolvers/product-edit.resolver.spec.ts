import { TestBed } from '@angular/core/testing';

import { ProductEditResolver } from './product-edit.resolver';

describe('ProductEditResolver', () => {
  let resolver: ProductEditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductEditResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
