import { TestBed } from '@angular/core/testing';

import { ListcontactService } from './listcontact.service';

describe('ListcontactService', () => {
  let service: ListcontactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListcontactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
