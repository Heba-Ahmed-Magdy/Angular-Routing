/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { USerService } from './USer.service';

describe('Service: USer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [USerService]
    });
  });

  it('should ...', inject([USerService], (service: USerService) => {
    expect(service).toBeTruthy();
  }));
});
