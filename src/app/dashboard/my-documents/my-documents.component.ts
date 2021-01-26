import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';;
import { FilteredScanObjModel } from 'src/app/shared/models/filteredScanObj.model';
import { NgAuthService } from 'src/app/shared/authentication/ng-auth.service';
import { DbScannedDocResponseModel } from 'src/app/shared/models/db-scanned-doc-response.model';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.scss']
})
export class MyDocumentsComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  firstLoad: boolean;
  currentUserID: string;
  basePath: string;
  dbUserScanCollection: any;
  scannedDocuments: DbScannedDocResponseModel[] = [];
  filteredObjects: FilteredScanObjModel[] = [];

  responseCollection:FilteredScanObjModel = {
    docID: "",
    url: "",
    date: new Date(),
    ocrTemplate: "",
    documentInformation: {},
    paymentInformation: {},
    customerInformation: {},
    merchantInformation: {},
    customFields: {
      raw_text: "", 
      lines: [
        {
        "description": "",
        "lineitems": [
            {
            "amount": 0,
            "amount_each": 0,
            "amount_ex_vat": 0,
            "description": "",
            "quantity": 0,
            "sku": "",
            "title": "",
            "vat_amount": 0,
            "vat_code": "",
            "vat_percentage": 0
            }
          ]
        }
      ],
      barcodes: [
        {
        "type": "",
        "value": ""
        }
      ], 
      matched_lineitems: [
        {
        "id": "",
        "lineitems": [
            {
            "amount": 0,
            "amount_each": 0,
            "amount_ex_vat": 0,
            "description": "",
            "quantity": 0,
            "sku": "",
            "title": "",
            "vat_amount": 0,
            "vat_code": "",
            "vat_percentage": 0
            }
          ]
        }
      ],
    },
    amountInformation:{
      "currency": "", 
      "amount": 0, 
      "amount_change": 0, 
      "amountexvat": 0, 
      "vatamount": 0
    }
  }

  paymentInformationKeys = [
    "invoice_number",
    "invoice_type",
    "paymentmethod",
    "purchasedate",
    "purchasetime",
    "order_number",
    "package_number",
    "payment_auth_code",
    "payment_card_account_number",
    "payment_card_bank",
    "payment_card_issuer",
    "payment_card_number",
    "payment_due_date",
    "payment_slip_code",
    "payment_slip_customer_number",
    "payment_slip_reference_number",
    "receipt_number",
    "server",
    "shop_number",
    "table_group",
    "table_number",
    "terminal_number",
    "transaction_number",
    "transaction_reference",
    "vat_context"
  ];

  documentInformationKeys = [
    "date",
    "document_language",
    "document_subject",
    "document_type",
  ];
  customerInformationKeys = [
    "customer_address",
    "customer_bank_account_number",
    "customer_bank_account_number_bic",
    "customer_city",
    "customer_coc_number",
    "customer_country",
    "customer_email",
    "customer_house_number",
    "customer_municipality",
    "customer_name",
    "customer_number",
    "customer_phone",
    "customer_province",
    "customer_reference",
    "customer_street_name",
    "customer_vat_number",
    "customer_website",
    "customer_zipcode"
  ];
  merchantInformationKeys = [
    "merchant_address",
    "merchant_bank_account_number",
    "merchant_bank_account_number_bic",
    "merchant_bank_domestic_account_number",
    "merchant_bank_domestic_bank_code",
    "merchant_chain_liability_amount",
    "merchant_chain_liability_bank_account_number",
    "merchant_city",
    "merchant_coc_number",
    "merchant_country",
    "merchant_country_code",
    "merchant_email",
    "merchant_house_number",
    "merchant_id",
    "merchant_main_activity_code",
    "merchant_municipality",
    "merchant_name",
    "merchant_phone",
    "merchant_province",
    "merchant_street_name",
    "merchant_vat_number",
    "merchant_website",
    "merchant_zipcode"
  ];
  customFieldsKeys = [
    "raw_text", 
    "lines", 
    "barcodes", 
    "matched_lineitems"
  ];
  amountInformationKeys = [
    "currency", 
    "amount", 
    "amount_change", 
    "amountexvat", 
    "vatamount"
  ];

 
  ngOnInit(): void {

  }


  constructor(private afDatabase: AngularFirestore,
              public ngAuthService: NgAuthService
             ) 
  {
    let user = JSON.parse(localStorage.getItem('user'));
    //collect the logged user id information
    this.isLoading = true;
    // User is signed in.
    this.currentUserID = user.uid;
    this.basePath = '/' + this.currentUserID + '/files';
    this.dbUserScanCollection = this.afDatabase.firestore.collection("users").doc(this.currentUserID).collection('scannedDocs').orderBy('date', "desc");

    this.dbUserScanCollection.get().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
          var newObject = {
            'docID': doc.id,
            'docData': doc.data()
          };  
          this.scannedDocuments.push(newObject);
      })
    }).then(() => {
      for(let item of this.scannedDocuments){

        this.responseCollection.docID = item.docID;
        this.responseCollection.url = item.docData.url;
        this.responseCollection.date = item.docData.date;
        this.responseCollection.ocrTemplate = item.docData.ocrTemplate;


        for(let [key, value] of Object.entries(item.docData.data.data)){
          //first check, if it is not empty
          if(value != "" && value != null){
            if(this.documentInformationKeys.indexOf(key) > -1){
              this.responseCollection.documentInformation[key] = value;
            }else if(this.paymentInformationKeys.indexOf(key) > -1){
              this.responseCollection.paymentInformation[key] = value;
            }else if(this.customerInformationKeys.indexOf(key) > -1){
              this.responseCollection.customerInformation[key] = value;
            }else if(this.merchantInformationKeys.indexOf(key) > -1){
              this.responseCollection.merchantInformation[key] = value;
            }else if(this.customFieldsKeys.indexOf(key) > -1){
              this.responseCollection.customFields[key] = value;
            }else if(this.amountInformationKeys.indexOf(key) > -1){
              this.responseCollection.amountInformation[key] = value;
            }
    
          }
        }

        this.filteredObjects.push(this.responseCollection);
        this.responseCollection = {
          docID: "",
          url: "",
          date: new Date,
          ocrTemplate: "",
          documentInformation: {},
          paymentInformation: {},
          customerInformation: {},
          merchantInformation: {},
          customFields: {
            raw_text: "", 
            lines: [
              {
              "description": "",
              "lineitems": [
                  {
                  "amount": 0,
                  "amount_each": 0,
                  "amount_ex_vat": 0,
                  "description": "",
                  "quantity": 0,
                  "sku": "",
                  "title": "",
                  "vat_amount": 0,
                  "vat_code": "",
                  "vat_percentage": 0
                  }
                ]
              }
            ],
            barcodes: [
              {
              "type": "",
              "value": ""
              }
            ], 
            matched_lineitems: [
              {
              "id": "",
              "lineitems": [
                  {
                  "amount": 0,
                  "amount_each": 0,
                  "amount_ex_vat": 0,
                  "description": "",
                  "quantity": 0,
                  "sku": "",
                  "title": "",
                  "vat_amount": 0,
                  "vat_code": "",
                  "vat_percentage": 0
                  }
                ]
              }
            ],
          },
          amountInformation:{
            "currency": "", 
            "amount": 0, 
            "amount_change": 0, 
            "amountexvat": 0, 
            "vatamount": 0
          }
        }
      }
      
      this.isLoading = false;
      this.firstLoad = true;
    });
  }

  downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  toggleScannedDoc(id: string){
    if(document.getElementById(id).classList.contains('d-none')=== true){
      document.getElementById(id).classList.remove("d-none");
      document.getElementById(id).classList.add('d-block');
    }else if(document.getElementById(id).classList.contains('d-none')=== false){
      document.getElementById(id).classList.remove("d-block");
      document.getElementById(id).classList.add('d-none');
    };
  }

  ngOnDestroy(): void {
    this.scannedDocuments = [];
    this.filteredObjects = [];
  }

}
