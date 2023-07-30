import { TestBed } from '@angular/core/testing';

import { GetDataFromApiService } from './get-data-from-api.service';

describe('GetDataFromApiService', () => {
  let service: GetDataFromApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataFromApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
