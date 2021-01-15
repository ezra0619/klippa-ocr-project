import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { OCRAPIServiceService } from 'src/app/shared/ocr-api-service.service';
import { OcrApiService } from 'src/app/shared/ocr-api.service';


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
  filesUploadGroup: FormGroup;

  
  currentFormValuesDinamic: {
    typeOfDocumentsValue: string, //Document/s or URL/s
    typeOfTemplate: string, //Financial Document or Structured PDF
    pdfExtractionMethods: string, // Fast or Full
    APIkey: string, //
    filesUploaded: File[], //if typeOfDocumentsValue === Document/s and showFileUpload === true
    urlUploaded: string[] //if typeOfDocumentsValue === URL/s and showUrlUpload === true
    showUrlUpload: boolean;
    showFileUpload: boolean;
    acceptedExtension: string;
  } = {
    typeOfDocumentsValue: "",
    typeOfTemplate: "",
    pdfExtractionMethods: "",
    APIkey: "",
    filesUploaded: [],
    urlUploaded: [""],
    showUrlUpload: false,
    showFileUpload: false,
    acceptedExtension: ".png, .jpg, .pdf"
  }

//enctype="multipart/form-data"

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

  get formArray(): AbstractControl | null { return this.ocrForm.get('formArray'); }

  constructor(private formBuilder: FormBuilder,
              private ocrApiService: OcrApiService,
              private afDatabase: AngularFirestore) {

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
        this.filesUploadGroup = this.formBuilder.group({
          filesUpload: ['', Validators.required]
        }),
      ])
    })
    
  }

  setCurrentDocType(docType: string){
    this.currentFormValuesDinamic.typeOfDocumentsValue = docType;
    if(docType === "Document/s"){
      this.currentFormValuesDinamic.showUrlUpload = false;
      this.currentFormValuesDinamic.showFileUpload = true;
      // if the user decides to come back and modify the doc type then the whole form will be reset
      this.currentFormValuesDinamic.typeOfTemplate = "",
      this.currentFormValuesDinamic.pdfExtractionMethods = "",
      this.currentFormValuesDinamic.APIkey = "",
      this.currentFormValuesDinamic.filesUploaded = [],
      this.currentFormValuesDinamic.urlUploaded = [""],
      this.currentFormValuesDinamic.acceptedExtension = ".png, .jpg, .pdf"
    }else if(docType === "URL/s"){
      this.currentFormValuesDinamic.showUrlUpload = true;
      this.currentFormValuesDinamic.showFileUpload = false;
      // if the user decides to come back and modify the doc type then the whole form will be reset
      this.currentFormValuesDinamic.typeOfTemplate = "",
      this.currentFormValuesDinamic.pdfExtractionMethods = "",
      this.currentFormValuesDinamic.APIkey = "",
      this.currentFormValuesDinamic.filesUploaded = [],
      this.currentFormValuesDinamic.urlUploaded = [""],
      this.currentFormValuesDinamic.acceptedExtension = ".png, .jpg, .pdf"
    }
    console.log(this.currentFormValuesDinamic.typeOfDocumentsValue);
  }

  setTemplate(template: string){
    this.currentFormValuesDinamic.typeOfTemplate = template;
    console.log(this.currentFormValuesDinamic.typeOfTemplate);

    if(template === "Financial Document (.png, .jpg, .pdf)"){
      this.currentFormValuesDinamic.acceptedExtension = ".png, .jpg, .pdf";
      console.log(this.currentFormValuesDinamic.acceptedExtension);
    }else if(template === "Structured PDF (.pdf)"){
      this.currentFormValuesDinamic.acceptedExtension = ".pdf";
      console.log(this.currentFormValuesDinamic.acceptedExtension);
    }
  }

  setPDFScanMethod(method: string){
    this.currentFormValuesDinamic.pdfExtractionMethods = method;
    console.log(this.currentFormValuesDinamic.pdfExtractionMethods);
  }

  addUrlField(){
    this.currentFormValuesDinamic.urlUploaded.push("");
    console.log(this.currentFormValuesDinamic.urlUploaded.length);
    console.log(this.currentFormValuesDinamic.urlUploaded)
  }

  removeUrlField(){
    this.currentFormValuesDinamic.urlUploaded.pop();
    console.log(this.currentFormValuesDinamic.urlUploaded.length);
    console.log(this.currentFormValuesDinamic.urlUploaded)
  }

  detectFiles(event){
    let validationType = this.currentFormValuesDinamic.acceptedExtension;
    let files = event.target.files;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      //validation // if valid then push to files
      var name: string = files[i].name;
      console.log(name);

      if(validationType === ".png, .jpg, .pdf"){
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'pdf') {
          this.currentFormValuesDinamic.filesUploaded.push(files[i]);
          console.log(this.currentFormValuesDinamic.filesUploaded);
        }
      }else if (validationType === ".pdf"){
        var ext = name.substring(name.lastIndexOf('.') + 1);
        if (ext.toLowerCase() == ".pdf") {
          this.currentFormValuesDinamic.filesUploaded.push(files[i]);
          console.log(this.currentFormValuesDinamic.filesUploaded);
        }
      }
      
    }
  }

  detectURLs(event, index){
    console.log(event);
    console.log(event.target.value);
    console.log(index);

    this.currentFormValuesDinamic.urlUploaded[index] = event.target.value;
    console.log(this.currentFormValuesDinamic.urlUploaded[index]);
    console.log(this.currentFormValuesDinamic.urlUploaded);

  }

  onSubmit() {

    console.log(this.ocrForm.value.formArray[0].documentTypeField);
    //the number of urls or files will 
    //determine how many requests will be sent to the API
    //problem - only the last file/url is registered 
    //== to change validators
    // console.log(this.ocrForm.value);
    // console.log(this.currentFormValuesDinamic.urlUploaded)

    //on submit - reset form
    //maybe do restrict the user from going back??
    //or clear values if the user goes back to change anything
    // formArray[0].documentTypeField

    var typeOfDocuments = this.ocrForm.value.formArray[0].documentTypeField;
    var typeOfTemplate = this.ocrForm.value.formArray[1].templateField;
    var pdfExtractionMethod = this.ocrForm.value.formArray[2].pdfExtractionMethodsField;
    var APIkey = this.ocrForm.value.formArray[3].apiKeyField;
    var filesUploaded = this.currentFormValuesDinamic.filesUploaded;
    var urlUploaded = this.currentFormValuesDinamic.urlUploaded;
    var scenarioUrl = this.currentFormValuesDinamic.showUrlUpload;
    var scenarioFile = this.currentFormValuesDinamic.showFileUpload;

    //temp var for testing purposes
    var currentUrl = this.currentFormValuesDinamic.showUrlUpload[0];

    ///
    console.log(
      typeOfDocuments,
      typeOfTemplate,
      pdfExtractionMethod,
      APIkey,
      filesUploaded,
      urlUploaded,
      scenarioUrl,
      scenarioFile
    )
    //Scenarios
    // 1 - user has URLs
        //we dont to convert anything for the api request
        // template: string, pdfTextExtractionMethod: string, apiKey: string, url: string
      if(scenarioUrl === true && scenarioFile === false){
        this.ocrApiService.readDocumentOCR(typeOfTemplate, pdfExtractionMethod, APIkey, currentUrl).subscribe( responseData => {
          console.log(responseData);
          //if successfull put it to the database
          var requestId: string = Math.random().toString(36).substring(2);
          var dbUser = this.afDatabase.firestore.collection("users").doc("IDXfLrL7EBZkSuiEeZeQWIqOVdo1");

          dbUser.set({
            scannedDocs: {
              requestId: {
                  url: currentUrl,
                  data: responseData
                }
              }
            })
            //solve this with a random ID 
            //https://stackoverflow.com/questions/38202763/how-to-know-the-random-id-given-to-a-firebase-data/41462470

        }, error => {
          console.log(error)
        })
      }

    // 2 -- user has files
        //we have to convert the files into links

      if(scenarioUrl === false && scenarioFile === true){
        //for now nothing
      }


  }

  randomButton(){
    console.log(Math.random().toString(36).substring(2));
  }
}
