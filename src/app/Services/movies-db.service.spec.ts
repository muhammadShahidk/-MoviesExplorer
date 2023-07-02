import { TestBed } from '@angular/core/testing';

import { MoviesDbService } from './movies-db.service';

describe('MoviesDbService', () => {
  let service: MoviesDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
