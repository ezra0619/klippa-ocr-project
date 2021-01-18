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

  readDocumentOCR(pdfTextExtractionMethod: string, apiKey: string, url: string){

    var formData: any = new FormData();
    formData.append('url', url);
    // formData.append('template', template);
    formData.append('pdf_text_extraction', pdfTextExtractionMethod);
    console.log(formData);
    console.log(apiKey);

    // var formData: any = new FormData();
    // formData.append('url', "https://cdn-kiosk-api.telegraaf.nl/fa8c45b4-77e5-11e8-8f40-d53bd066a070.jpg");
    // console.log("we are before api")
    // this.http.post('https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=EtbeyiXY2yZz5qm2cnzPBgaYGon6LIuj', formData).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // )

    // let headers = { 'Content-Type': 'multipart/form-data'};


    return this.http.post(
      "https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=" + apiKey, 
      formData
    )
      // https://custom-ocr.klippa.com/api/v1?X-Auth-Key=key/parseDocument
  }
}