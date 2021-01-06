import { TestBed } from '@angular/core/testing';

import { OCRAPIServiceService } from './ocr-api-service.service';

describe('OCRAPIServiceService', () => {
  let service: OCRAPIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OCRAPIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
