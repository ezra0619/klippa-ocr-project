import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OcrParseDocDefaultService {

  constructor(private http: HttpClient) { }

  readDocumentOCR(pdfTextExtractionMethod: string, apiKey: string, url: string){

    var formData: any = new FormData();
    formData.append('url', url);
    formData.append('pdf_text_extraction', pdfTextExtractionMethod);
    console.log(formData);
    console.log(apiKey);

    return this.http.post(
      "https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=" + apiKey, 
      formData
    )
  }
}
