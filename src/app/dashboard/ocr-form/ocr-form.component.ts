import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-ocr-form',
  templateUrl: './ocr-form.component.html',
  styleUrls: ['./ocr-form.component.scss']
})
export class OcrFormComponent implements OnInit {

  isLinear = true;

  ocrForm: FormGroup;

  documentTypeGroup: FormGroup;
  templateGroup: FormGroup;
  pdfExtractionMethodsGroup: FormGroup;
  apiKeyGroup: FormGroup;
  fileOrFolderGroup: FormGroup;
  filesUploadGroup: FormGroup;
  
  typeOfDocumentsValue: string = "";
  typeOfTemplate: string = "";
  fileOrFolderValue: string = "";

  //create html template form input fields

  nrOfInputFields: number = 1;

  typeOfDocuments: {id: string, value: string}[] = [
    {
      id: "documentType",
      value: "Document/s"
    },
    {
      id: "urlType",
      value: "URL/s"
    }
  ];

  templates: {id: string, value: string}[] = [
    {
      id: "templateFinancial",
      value: "Financial Document (.png, .jpg, .pdf)"
    },
    {
      id: "templateStructuredPDF",
      value: "Structured PDF (.pdf)"
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

  filesOrFolder: {id: string, value: string}[] = [
    {
      id: "Files",
      value: "Files",
    },
    {
      id: "Folder",
      value: "Folder",
    }
  ]
  get formArray(): AbstractControl | null { return this.ocrForm.get('formArray'); }

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.ocrForm = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.documentTypeGroup = this.formBuilder.group({
          documentTypeField: ['', Validators.required]
        }),
        this.templateGroup = this.formBuilder.group({
          templateField: ['', Validators.required]
        }),
        this.pdfExtractionMethodsGroup = this.formBuilder.group({
          pdfExtractionMethodsField: ['', Validators.required]
        }),
        this.apiKeyGroup = this.formBuilder.group({
          apiKeyField: ['', Validators.required]
        }),
        this.fileOrFolderGroup = this.formBuilder.group({
          fileOrFolderField: ['', Validators.required]
        }),
        this.filesUploadGroup = this.formBuilder.group({
          filesUpload: ['', Validators.required]
        }),
      ])
    })
    
  }

  setCurrentDocType(docType: string){
    this.typeOfDocumentsValue = docType;
    console.log(this.typeOfDocumentsValue);
  }

  setTemplate(template: string){
    this.typeOfTemplate = template;
    console.log(this.typeOfTemplate);
  }

  setFileOrFolder(value: string){
    this.fileOrFolderValue = value;
    console.log(this.fileOrFolderValue);
  }

  addUrlField(){
    this.nrOfInputFields = this.nrOfInputFields + 1;
  }

  removeUrlField(){
    this.nrOfInputFields = this.nrOfInputFields - 1 ;
    console.log(this.nrOfInputFields);
  }

  submit() {
    //the number of urls or files will 
    //determine how many requests will be sent to the API
    //problem - only the last file/url is registered 
    //== to change validators
    console.log(this.ocrForm.value);
  }
}
