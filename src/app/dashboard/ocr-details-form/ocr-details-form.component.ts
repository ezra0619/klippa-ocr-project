import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-ocr-details-form',
  templateUrl: './ocr-details-form.component.html',
  styleUrls: ['./ocr-details-form.component.scss']
})
export class OcrDetailsFormComponent implements OnInit {

  // urlArray: {value: string}[] = [
  //   {value: ''}
  // ]
  
  typeOfDocuments: {id: string, value: string}[] = [
    {
      id: "documentType",
      value: "Document/Documents"
    },
    {
      id: "urlType",
      value: "URL/URLs"
    }
  ];

  templates: {id: string, value: string}[] = [
    {
      id: "templateFinancial",
      value: "Financial Document (.png, .jpg, .pdf)"
    },
    {
      id: "templateStructuredPDF",
      value: "Structured PDF"
    }
  ]

  pdfExtractionMethods: {id: string, value: string, info: string}[] = [
    {
      id: "fastPDFExtraction",
      value: "Fast",
      info: "Fast scan. This method will try to extract the text4 from the PDF."
    },
    {
      id: "fullPDFExtraction",
      value: "Full",
      info: "Slower scan. This method will scan the whole document, which is slower."
    }
  ]

  documentSelectionTypes: {id: string, value: string}[] = [
    {
      id: "docSelectionTypeIndivF",
      value: "Individually Selected Files"
    },
    {
      id: "docSelectionTypeFolder",
      value: "Folder"
    }
  ]

  //needed info for Request Body
  //need api key as well
  ocrApiRequest: Object = {
    document: "",
    url: "",
    pdfTextExtraction: "fast",
    ApiKey: ""
  };

  ocrDetaisForm = new FormGroup({
    'documentsType': new FormControl('', Validators.required),
    'template': new FormControl('', Validators.required),
    'PDFExtractionMethod': new FormControl('Fast', Validators.required),
    'APIKey': new FormControl('', Validators.required),
    'docSelectionType': new FormControl('', Validators.required),
    'filesToBeProcessed': new FormControl('', Validators.required),
  });
  
  get f(){
    return this.ocrDetaisForm.controls;
  }
  
  submit(){
    console.log(this.ocrDetaisForm);
    console.log(this.ocrDetaisForm.value);
  }
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // testingFireBase(){
  //   return this.http.put()
  // }

  // addURLInputField(){

  // }

  //!! to figure out how to span multiple url fields 
  // and store the information correctly for each
}
