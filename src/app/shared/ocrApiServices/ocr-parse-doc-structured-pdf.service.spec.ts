import { TestBed } from '@angular/core/testing';

import { OcrParseDocStructuredPDFService } from './ocr-parse-doc-structured-pdf.service';

describe('OcrParseDocStructuredPDFService', () => {
  let service: OcrParseDocStructuredPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcrParseDocStructuredPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
