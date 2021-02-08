import { TestBed } from '@angular/core/testing';

import { ASMService } from './asm.service';

describe('ASMService', () => {
  let service: ASMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ASMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
