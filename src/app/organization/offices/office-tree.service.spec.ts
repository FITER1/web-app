import { TestBed } from '@angular/core/testing';

import { OfficeTreeService } from './office-tree.service';

describe('OfficeTreeService', () => {
  let service: OfficeTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
