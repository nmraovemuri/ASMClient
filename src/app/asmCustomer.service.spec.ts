import { TestBed } from '@angular/core/testing';

import { ASMCustomerService } from './asmCustomer.service';

describe('ASMService', () => {
  let service: ASMCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ASMCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
