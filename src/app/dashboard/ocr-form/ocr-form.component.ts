import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgAuthService } from 'src/app/shared/authentication/ng-auth.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { OcrParseDocDefaultService } from 'src/app/shared/ocrApiServices/ocr-parse-doc-default.service';
import { OcrParseDocStructuredPDFService } from 'src/app/shared/ocrApiServices/ocr-parse-doc-structured-pdf.service';
import { TemplatesService } from 'src/app/shared/models/templates.service';

@Component({
  selector: 'app-ocr-form',
  templateUrl: './ocr-form.component.html',
  styleUrls: ['./ocr-form.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})


export class OcrFormComponent implements OnInit {

  isLinear = true;

  ocrForm: FormGroup;
  documentTypeGroup: FormGroup;
  templateGroup: FormGroup;
  pdfExtractionMethodsGroup: FormGroup;
  apiKeyGroup: FormGroup;
  filesUploadGroup: FormGroup;

  basePath: string;
  downloadableURL: string = '';
  dbUser;

  isLoading: boolean = false;
  error: boolean = false;
  errors: string[] = [];
  successfulResponses: string[] = [];

  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;
  
  currentFormValuesDinamic: {
    typeOfDocumentsValue: string, //Document or URL
    typeOfTemplate: string, //Financial Document or Structured PDF
    pdfExtractionMethods: string, // Fast or Full
    APIkey: string, //
    filesUploaded: File[], //if typeOfDocumentsValue === Document and showFileUpload === true
    urlUploaded: string //if typeOfDocumentsValue === URL and showUrlUpload === true
    showUrlUpload: boolean;
    showFileUpload: boolean;
    acceptedExtension: string;
  } = {
    typeOfDocumentsValue: "",
    typeOfTemplate: "",
    pdfExtractionMethods: "",
    APIkey: "",
    filesUploaded: [],
    urlUploaded: "",
    showUrlUpload: false,
    showFileUpload: false,
    acceptedExtension: ".png, .jpg, .pdf"
  }

  typeOfDocuments: {id: string, value: string}[] = [
    {
      id: "documentType",
      value: "Document"
    },
    {
      id: "urlType",
      value: "URL"
    }
  ];

  templates: {id: string, value: string}[] = [
    {
      id: "templateFinancial",
      value: this.Templates.financialTemplate
    },
    {
      id: "templateStructuredPDF",
      value: this.Templates.structuredPDFTemplate
    }
  ]

  pdfExtractionMethods: {id: string, value: string}[] = [
    {
      id: "fastPDFExtraction",
      value: "Fast"
    },
    {
      id: "fullPDFExtraction",
      value: "Full"
    }
  ]

  get formArray(): AbstractControl | null { return this.ocrForm.get('formArray'); }

  constructor(private formBuilder: FormBuilder,
              private ocrParseDocDefault: OcrParseDocDefaultService,
              private ocrParseDocStructuredPDF: OcrParseDocStructuredPDFService,
              private afDatabase: AngularFirestore,
              public ngAuthService: NgAuthService,
              private afStorage: AngularFireStorage,
              private Templates: TemplatesService) {
    
    let user = JSON.parse(localStorage.getItem('user'));
    this.basePath = '/' + user.uid + '/files';
    this.dbUser = this.afDatabase.firestore.collection("users").doc(user.uid).collection('scannedDocs');

    this.ocrForm = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.documentTypeGroup = this.formBuilder.group({
          documentTypeField: ['', Validators.required]
        }),
        this.templateGroup = this.formBuilder.group({
          templateField: [Templates.financialTemplate, Validators.required]
        }),
        this.pdfExtractionMethodsGroup = this.formBuilder.group({
          pdfExtractionMethodsField: ['', Validators.required]
        }),
        this.apiKeyGroup = this.formBuilder.group({
          apiKeyField: ['', Validators.required]
        }),
        this.filesUploadGroup = this.formBuilder.group({
          filesUpload: ['', Validators.required]
        }),
      ])
    })

  }

  ngOnInit() {}

  setCurrentDocType(docType: string){

    this.currentFormValuesDinamic.typeOfDocumentsValue = docType;
    this.error= false;
    this.errors = [];
    this.successfulResponses = [];

    if(docType === "Document"){

      this.currentFormValuesDinamic.showUrlUpload = false;
      this.currentFormValuesDinamic.showFileUpload = true;
      // if the user decides to come back and modify the doc type then the whole form will be reset
      this.currentFormValuesDinamic.typeOfTemplate = "",
      this.currentFormValuesDinamic.pdfExtractionMethods = "",
      this.currentFormValuesDinamic.APIkey = "",
      this.currentFormValuesDinamic.filesUploaded = [],
      this.currentFormValuesDinamic.urlUploaded = "",
      this.currentFormValuesDinamic.acceptedExtension = ".png, .jpg, .pdf";

    }else if(docType === "URL"){
      this.currentFormValuesDinamic.showUrlUpload = true;
      this.currentFormValuesDinamic.showFileUpload = false;
      // if the user decides to come back and modify the doc type then the whole form will be reset
      this.currentFormValuesDinamic.typeOfTemplate = "",
      this.currentFormValuesDinamic.pdfExtractionMethods = "",
      this.currentFormValuesDinamic.APIkey = "",
      this.currentFormValuesDinamic.filesUploaded = [],
      this.currentFormValuesDinamic.urlUploaded = "",
      this.currentFormValuesDinamic.acceptedExtension = ".png, .jpg, .pdf";
    }
  }

  setTemplate(template: string){

    this.currentFormValuesDinamic.typeOfTemplate = template;
    this.error= false;
    this.errors = [];
    this.successfulResponses = [];

    console.log(this.currentFormValuesDinamic.typeOfTemplate);
    if(template === this.Templates.financialTemplate){
      this.currentFormValuesDinamic.acceptedExtension = ".png, .jpg, .pdf";
    }else if(template === this.Templates.structuredPDFTemplate){
      this.currentFormValuesDinamic.acceptedExtension = ".pdf";
    }
  }

  setPDFScanMethod(method: string){

    this.currentFormValuesDinamic.pdfExtractionMethods = method;
    this.error= false;
    this.errors = [];
    this.successfulResponses = [];

  }

  detectFiles(event){
    let validationType = this.currentFormValuesDinamic.acceptedExtension;
    let files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      //validation // if valid then push to files
      var name: string = files[i].name;

      if(validationType === ".png, .jpg, .pdf"){
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'pdf') {
          this.currentFormValuesDinamic.filesUploaded.push(files[i]);
        }
      }else if (validationType === ".pdf"){
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == "pdf") {
          this.currentFormValuesDinamic.filesUploaded.push(files[i]);
        }
      }
      this.error= false;
      this.errors = [];
      this.successfulResponses = [];
    }
  }

  detectURL(event){

    let currentFile = event.target.value;
    this.currentFormValuesDinamic.urlUploaded = currentFile;
    this.error= false;
    this.errors = [];
    this.successfulResponses = [];

  }

  async convertFileToLink(file: File){
    var name = Date.now();
    const filePath = `${this.basePath}/${name}`;
    this.ref = this.afStorage.ref(filePath);
    this.task = this.ref.put(file);
    return (await this.task).ref.getDownloadURL()
  }

  onSubmit() {

    this.error= false;
    this.errors = [];
    this.successfulResponses = [];
    this.isLoading = true;

    // var typeOfDocuments = this.ocrForm.value.formArray[0].documentTypeField;
    var typeOfTemplate = this.ocrForm.value.formArray[1].templateField;
    var pdfExtractionMethod = this.ocrForm.value.formArray[2].pdfExtractionMethodsField;
    var APIkey = this.ocrForm.value.formArray[3].apiKeyField;

    var filesUploaded = this.currentFormValuesDinamic.filesUploaded;
    var urlUploaded = this.currentFormValuesDinamic.urlUploaded;
    var scenarioUrl = this.currentFormValuesDinamic.showUrlUpload;
    var scenarioFile = this.currentFormValuesDinamic.showFileUpload;

    //SCENARIO URL

    if(scenarioUrl){

      if(typeOfTemplate === this.Templates.financialTemplate){

        this.ocrParseDocDefault.readDocumentOCR(pdfExtractionMethod, APIkey, urlUploaded).subscribe( responseData => {

          this.dbUser.doc().set({
            url: urlUploaded,
            date: new Date(),
            ocrTemplate: typeOfTemplate,
            data: responseData
          }).then( () => {
            this.isLoading = false;
            this.successfulResponses.push(urlUploaded + " was successfully scanned.");
          })

        }, error => {
          
          this.isLoading = false;
          this.error = true;
          let errorMessage = typeof error.error.message === 'undefined' 
                            ? "An unknown error occured." 
                            : error.error.message
          this.errors.push(urlUploaded + " : " + errorMessage);
        })

      }

    //SCENARIO FILE
    }else if(scenarioFile){

      if(typeOfTemplate === this.Templates.financialTemplate){

        for(let i=0;i<filesUploaded.length;i++){

          this.convertFileToLink(filesUploaded[i]).then(url => {
            this.isLoading = true;

            this.ocrParseDocDefault.readDocumentOCR(pdfExtractionMethod, APIkey, url).subscribe( responseData => {
    
              this.dbUser.doc().set({
                url: url,
                date: new Date(),
                ocrTemplate: typeOfTemplate,
                data: responseData
              }).then( () => {
                this.isLoading = false;
                this.successfulResponses.push(filesUploaded[i].name.toString() + " was successfully scanned.");
              })

            }, error => {
              this.isLoading = false;
              this.error = true;
              let errorMessage = typeof error.error.message === 'undefined' 
                            ? "An unknown error occured." 
                            : error.error.message
              this.errors.push(filesUploaded[i].name.toString() + " : " + errorMessage);
            })
          });

        }
        this.isLoading = false;

      }else if(typeOfTemplate === this.Templates.structuredPDFTemplate){

        for(let i=0;i<filesUploaded.length;i++){

          this.convertFileToLink(filesUploaded[i]).then(url => {
            this.ocrParseDocStructuredPDF.readDocumentOCR(filesUploaded[i], APIkey).subscribe( responseData => {
    
              this.dbUser.doc().set({
                url: url,
                date: new Date(),
                ocrTemplate: typeOfTemplate,
                data: responseData
              }).then( () => {
                this.isLoading = false;
                this.successfulResponses.push(filesUploaded[i].name.toString() + " was successfully scanned.");
              })

            }, error => {
              this.isLoading = false;
              this.error = true;
              let errorMessage = typeof error.error.message === 'undefined' 
                            ? "An unknown error occured." 
                            : error.error.message
              this.errors.push(filesUploaded[i].name.toString() + " : " + errorMessage);
            })
          });

        }
      }
    }

  }

}
