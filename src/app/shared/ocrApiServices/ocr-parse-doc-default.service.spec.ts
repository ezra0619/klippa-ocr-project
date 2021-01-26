import { TestBed } from '@angular/core/testing';

import { OcrParseDocDefaultService } from './ocr-parse-doc-default.service';

describe('OcrParseDocDefaultService', () => {
  let service: OcrParseDocDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcrParseDocDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
