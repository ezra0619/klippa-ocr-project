import { TestBed } from '@angular/core/testing';

import { NgAuth.Service.TsService } from './ng-auth.service';

describe('NgAuth.Service.TsService', () => {
  let service: NgAuth.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgAuth.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
