import { TestBed } from '@angular/core/testing';

import { ListusersService } from './listusers.service';

describe('ListusersService', () => {
  let service: ListusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
