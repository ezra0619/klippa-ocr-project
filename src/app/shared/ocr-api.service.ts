import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OcrApiService {

  constructor(private http: HttpClient) { }

  //Klippa OCR Api key
  
  // apikey: string = environment.klipaOCRAPIKey;

  readDocumentOCR(template: string, pdfTextExtractionMethod: string, apiKey: string, url: string){

    // let headers = { 'Content-Type': 'multipart/form-data'};
    return this.http.post(
      "https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=" + apiKey,
      {
        url: url,
        template: template,
        pdf_text_extraction: pdfTextExtractionMethod
      },
      {
        headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
      }
    )
      //https://custom-ocr.klippa.com/api/v1?X-Auth-Key=key/parseDocument
  }
}
