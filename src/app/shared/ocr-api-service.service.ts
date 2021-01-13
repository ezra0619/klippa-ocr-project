import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OCRAPIServiceService {

  constructor(private http: HttpClient) { }

  //Klippa OCR Api key
  
  apikey: string = environment.klipaOCRAPIKey;

  readDocumentOCR(){
    // let headers = { 'Content-Type': 'multipart/form-data'};
    return this.http.post(
      "https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=" + this.apikey,
      {
        url: "https://2.bp.blogspot.com/_WKGRsB-7x8k/SbEgI9ITUrI/AAAAAAAAAQc/9t9RRTrxglg/w1200-h630-p-k-no-nu/boerenvolk.JPG"
      },
      {
        headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
      }
    )
      //https://custom-ocr.klippa.com/api/v1?X-Auth-Key=key/parseDocument
  }

}
