import { TestBed, inject } from '@angular/core/testing';

import { FairsService } from './fairs.service';

describe('FairsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FairsService]
    });
  });

  it('should be created', inject([FairsService], (service: FairsService) => {
    expect(service).toBeTruthy();
  }));
});
