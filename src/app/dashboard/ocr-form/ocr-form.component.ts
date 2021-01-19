import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { NgAuthService } from 'src/app/shared/ng-auth.service.ts.service';
import { OcrParseDocDefaultService } from 'src/app/shared/ocr-parse-doc-default.service';
import { OcrParseDocStructuredPDFService } from 'src/app/shared/ocr-parse-doc-structured-pdf.service';


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
  currentUserID: string;
  basePath: string;
  downloadableURL: string = '';
  task: AngularFireUploadTask;

  ref: AngularFireStorageReference;
  
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
              private ocrParseDocDefault: OcrParseDocDefaultService,
              private ocrParseDocStructuredPDF: OcrParseDocStructuredPDFService,
              private afDatabase: AngularFirestore,
              public ngAuthService: NgAuthService,
              private afStorage: AngularFireStorage) {
          
  }

  ngOnInit() {

    console.log(btoa("password"));

    this.ngAuthService.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.currentUserID = user.uid;
        this.basePath = '/' + this.currentUserID + '/files';

        // testing purposes
        console.log("user is signed in");
        console.log(user.uid);

      } else {
        // No user is signed in.
      }
    });

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

  async convertFileToLink(file: File){

    const filePath = `${this.basePath}/${file.name}`;
    this.ref = this.afStorage.ref(filePath);
    this.task = this.ref.put(file);

    return (await this.task).ref.getDownloadURL()

    // (await this.task).ref.getDownloadURL().then(url => console.log(url))

    // const url = this.ref.getDownloadURL();
    // console.log(url);
  }

  onSubmit() {

    var typeOfDocuments = this.ocrForm.value.formArray[0].documentTypeField;
    var typeOfTemplate = this.ocrForm.value.formArray[1].templateField;
    var pdfExtractionMethod = this.ocrForm.value.formArray[2].pdfExtractionMethodsField;
    var APIkey = this.ocrForm.value.formArray[3].apiKeyField;

    // var filesUploaded = this.currentFormValuesDinamic.filesUploaded[0];
    var filesUploaded = this.currentFormValuesDinamic.filesUploaded;
    
    // var urlUploaded = this.currentFormValuesDinamic.urlUploaded[0];
    var urlUploaded = this.currentFormValuesDinamic.urlUploaded;

    var scenarioUrl = this.currentFormValuesDinamic.showUrlUpload;
    var scenarioFile = this.currentFormValuesDinamic.showFileUpload;
    var currentUser: string = this.currentUserID;

    // var ocrParseMethod: string;
    if (typeOfTemplate === "Financial Document (.png, .jpg, .pdf)"){

    }else if (typeOfTemplate === "Structured PDF (.pdf)"){

    }

    console.log(
      typeOfDocuments,
      typeOfTemplate,
      pdfExtractionMethod,
      APIkey,
      filesUploaded,
      urlUploaded,
      scenarioUrl,
      scenarioFile,
      currentUser
    )

    //Scenario 1 - DEFAULT PARSING
    if (typeOfTemplate === "Financial Document (.png, .jpg, .pdf)"){
      // 1.2 - user has URLs
      //we dont need to convert anything for the api request
      //simply send a request to the api for each link

      if(scenarioUrl === true && scenarioFile === false){

        for(let i=0;i<urlUploaded.length;i++){

          console.log(urlUploaded[i]);
            // the below is working
            this.ocrParseDocDefault.readDocumentOCR(pdfExtractionMethod, APIkey, urlUploaded[i]).subscribe( responseData => {
              console.log(responseData);

              var dbUser = this.afDatabase.firestore.collection("users").doc(this.currentUserID).collection('scannedDocs').doc();

              dbUser.set({
                url: urlUploaded,
                date: new Date(),
                data: responseData
              })
            }, error => {
              console.log(error)
            })
        }

      }

      // 1.2 -- user has files
      //we first have to convert the files into links
      //then for each link generated by uploading the files to storage, we send an api request

      if(scenarioUrl === false && scenarioFile === true){

        for(let i=0;i<filesUploaded.length;i++){

          this.convertFileToLink(filesUploaded[i]).then(url => {
            console.log(url);
  
            this.ocrParseDocDefault.readDocumentOCR(pdfExtractionMethod, APIkey, url).subscribe( responseData => {
              console.log(responseData);
  
              var dbUser = this.afDatabase.firestore.collection("users").doc(this.currentUserID).collection('scannedDocs').doc();
  
              dbUser.set({
                url: url,
                date: new Date(),
                data: responseData
              })
            }, error => {
              console.log(error)
            })
          });

        }

      }

    //Scenario 2 - STRUCTURED PDF PARSING

    }else if (typeOfTemplate === "Structured PDF (.pdf)"){

      // 1.2 - user has URLs
      //we dont need to convert anything for the api request
      //simply send a request to the api for each link
      if(scenarioUrl === true && scenarioFile === false){

        for(let i=0;i<urlUploaded.length;i++){

          console.log(urlUploaded[i]);
            // the below is working
            this.ocrParseDocStructuredPDF.readDocumentOCR(urlUploaded[i], APIkey).subscribe( responseData => {
              console.log(responseData);

              var dbUser = this.afDatabase.firestore.collection("users").doc(this.currentUserID).collection('scannedDocs').doc();

              dbUser.set({
                url: urlUploaded,
                date: new Date(),
                data: responseData
              })
            }, error => {
              console.log(error)
            })
        }

      }

      // 1.2 -- user has files
      //we first have to convert the files into links
      //then for each link generated by uploading the files to storage, we send an api request

      if(scenarioUrl === false && scenarioFile === true){

        for(let i=0;i<filesUploaded.length;i++){

          this.convertFileToLink(filesUploaded[i]).then(url => {
            console.log(url);
  
            this.ocrParseDocStructuredPDF.readDocumentOCR(url, APIkey).subscribe( responseData => {
              console.log(responseData);
  
              var dbUser = this.afDatabase.firestore.collection("users").doc(this.currentUserID).collection('scannedDocs').doc();
  
              dbUser.set({
                url: url,
                date: new Date(),
                data: responseData
              })
            }, error => {
              console.log(error)
            })
          });

        }

      }      
      
    }

  }

}



        // the below is working
        // this.ocrApiService.readDocumentOCR(pdfExtractionMethod, APIkey, urlUploaded).subscribe( responseData => {
        //   console.log(responseData);

        //   var dbUser = this.afDatabase.firestore.collection("users").doc(this.currentUserID).collection('scannedDocs').doc();

        //   dbUser.set({
        //     url: urlUploaded,
        //     data: responseData
        //   })
        // }, error => {
        //   console.log(error)
        // })


  // randomButton(){
  //   console.log(Math.random().toString(36).substring(2));
  // }

// var dbUser = this.afDatabase.firestore.collection("users").doc(currentUser).collection('scannedDocs').doc();

//         dbUser.set({
//           url: urlUploaded,
//           date: new Date(),
//           data: {
//                   "result": "now",
//                   "data": {
//                       "document_type": "receipt",
//                       "amount": 655,
//                       "amount_change": 1360,
//                       "vatamount": 0,
//                       "amountexvat": 642,
//                       "currency": "EUR",
//                       "date": "",
//                       "purchasedate": "",
//                       "purchasetime": "",
//                       "vatitems": [],
//                       "vat_context": "",
//                       "lines": [
//                           {
//                               "description": "",
//                               "lineitems": [
//                                   {
//                                       "title": "ELSTAR",
//                                       "description": "",
//                                       "amount": 199,
//                                       "amount_each": 199,
//                                       "amount_ex_vat": 199,
//                                       "vat_amount": 0,
//                                       "vat_percentage": 0,
//                                       "quantity": 1,
//                                       "sku": "",
//                                       "vat_code": ""
//                                   },
//                                   {
//                                       "title": "BANANEN",
//                                       "description": "",
//                                       "amount": 201,
//                                       "amount_each": 201,
//                                       "amount_ex_vat": 201,
//                                       "vat_amount": 0,
//                                       "vat_percentage": 0,
//                                       "quantity": 1,
//                                       "sku": "",
//                                       "vat_code": ""
//                                   },
//                                   {
//                                       "title": "AH LAMP",
//                                       "description": "",
//                                       "amount": 89,
//                                       "amount_each": 89,
//                                       "amount_ex_vat": 89,
//                                       "vat_amount": 0,
//                                       "vat_percentage": 0,
//                                       "quantity": 1,
//                                       "sku": "",
//                                       "vat_code": ""
//                                   },
//                                   {
//                                       "title": "AH LAMP",
//                                       "description": "",
//                                       "amount": 89,
//                                       "amount_each": 89,
//                                       "amount_ex_vat": 89,
//                                       "vat_amount": 0,
//                                       "vat_percentage": 0,
//                                       "quantity": 1,
//                                       "sku": "",
//                                       "vat_code": ""
//                                   },
//                                   {
//                                       "title": "BOERENVOLK",
//                                       "description": "",
//                                       "amount": 64,
//                                       "amount_each": 64,
//                                       "amount_ex_vat": 64,
//                                       "vat_amount": 0,
//                                       "vat_percentage": 0,
//                                       "quantity": 1,
//                                       "sku": "",
//                                       "vat_code": ""
//                                   }
//                               ]
//                           }
//                       ],
//                       "paymentmethod": "cash",
//                       "payment_auth_code": "",
//                       "payment_card_number": "",
//                       "payment_card_account_number": "",
//                       "payment_card_bank": "",
//                       "payment_card_issuer": "",
//                       "payment_due_date": "",
//                       "terminal_number": "",
//                       "document_subject": "",
//                       "package_number": "",
//                       "invoice_number": "",
//                       "invoice_type": "",
//                       "receipt_number": "",
//                       "shop_number": "",
//                       "transaction_number": "",
//                       "transaction_reference": "",
//                       "order_number": "",
//                       "table_number": "",
//                       "table_group": "",
//                       "server": "",
//                       "merchant_name": "Albert Heijn",
//                       "merchant_id": "",
//                       "merchant_coc_number": "",
//                       "merchant_vat_number": "",
//                       "merchant_bank_account_number": "",
//                       "merchant_bank_account_number_bic": "",
//                       "merchant_chain_liability_bank_account_number": "",
//                       "merchant_chain_liability_amount": 0,
//                       "merchant_bank_domestic_account_number": "",
//                       "merchant_bank_domestic_bank_code": "",
//                       "merchant_website": "",
//                       "merchant_email": "",
//                       "merchant_address": "",
//                       "merchant_street_name": "",
//                       "merchant_house_number": "",
//                       "merchant_zipcode": "",
//                       "merchant_city": "",
//                       "merchant_municipality": "",
//                       "merchant_province": "",
//                       "merchant_country": "",
//                       "merchant_country_code": "NL",
//                       "merchant_phone": "0503131800",
//                       "merchant_main_activity_code": "",
//                       "customer_name": "",
//                       "customer_number": "",
//                       "customer_reference": "",
//                       "customer_address": "",
//                       "customer_street_name": "",
//                       "customer_house_number": "",
//                       "customer_zipcode": "",
//                       "customer_city": "",
//                       "customer_municipality": "",
//                       "customer_province": "",
//                       "customer_country": "",
//                       "customer_phone": "",
//                       "customer_vat_number": "",
//                       "customer_coc_number": "",
//                       "customer_bank_account_number": "",
//                       "customer_bank_account_number_bic": "",
//                       "customer_website": "",
//                       "customer_email": "",
//                       "payment_slip_code": "",
//                       "payment_slip_reference_number": "",
//                       "payment_slip_customer_number": "",
//                       "document_language": "NL",
//                       "matched_keywords": null,
//                       "matched_lineitems": null,
//                       "matched_purchase_order_id": "",
//                       "barcodes": null,
//                       "hash": "",
//                       "hash_duplicate": false,
//                       "raw_text": "           ALBERT HEIJN\n           Brugstraat 14\n         tel. 050-3131800\n                            EUR\n       ELSTAR              1,99\n       BANANEN              2,01\n       1,190kg EUR 1,69/kg\n       AH LAMP              0,89\n       AH LAMP              0,89\n       BOERENVOLK           0,64\n       SUBTOTAAL            6,42\nTOTAAL                  6,42\n       CONTANT             20,00\n       TERUG               13,60\nTOTAAL ZAKJES           0"
//                   },
//                   "request_id": "Krk22ffdDuEgH7OH7V3l8oBEQhk7Ua91"
//                 }

            
//           })