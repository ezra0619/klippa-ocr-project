import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OcrParseDocStructuredPDFService {

  constructor(private http: HttpClient) { }

  readDocumentOCR(document: File, apiKey: string){

    var formData: any = new FormData();
    formData.append('document', document);
    
    return this.http.post(
      "https://custom-ocr.klippa.com/api/v1/parseStructuredPDF?X-Auth-Key=" + apiKey, 
      formData
    )
  }

}
