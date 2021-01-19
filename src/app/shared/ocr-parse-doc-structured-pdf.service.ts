import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OcrParseDocStructuredPDFService {

  constructor(private http: HttpClient) { }

  readDocumentOCR(url: string, apiKey: string){

    var base64StringDoc = btoa(url);

    var formData: any = new FormData();
    formData.append('document', base64StringDoc);
    console.log(formData);
    console.log(apiKey);

    return this.http.post(
      "https://custom-ocr.klippa.com/api/v1/parseStructuredPDF?X-Auth-Key=" + apiKey, 
      formData
    )
  }

}
