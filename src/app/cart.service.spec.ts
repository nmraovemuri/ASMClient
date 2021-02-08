import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });
});
