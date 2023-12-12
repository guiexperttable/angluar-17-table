import { TestBed } from '@angular/core/testing';

import { AngularTableService } from './angular-table.service';

describe('AngularTableService', () => {
  let service: AngularTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
