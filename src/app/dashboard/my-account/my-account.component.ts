import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { DbScannedDocResponseModel } from 'src/app/shared/db-scanned-doc-response.model';
import { NgAuthService } from 'src/app/shared/ng-auth.service.ts.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  currentUserID: string;
  basePath: string;
  dbUserScanCollection: any;
  scannedDocuments: DbScannedDocResponseModel[] = [];
  
  responseCollection: {
    docID: string,
    url: string,
    date: Date,
    ocrTemplate: string,
    documentInformation: {},
    paymentInformation: {},
    customerInformation: {},
    merchantInformation: {},
    customFields: {},
    amountInformation: {}
  } = {
    docID: "",
    url: "",
    date: new Date,
    ocrTemplate: "",
    documentInformation: {},
    paymentInformation: {},
    customerInformation: {},
    merchantInformation: {},
    customFields: {},
    amountInformation: {}
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
  
  filteredObjects: {
    docID: string,
    url: string,
    date: Date,
    ocrTemplate: string,
    documentInformation: {},
    paymentInformation: {},
    customerInformation: {},
    merchantInformation: {},
    customFields: {},
    amountInformation:{}
  }[] = [];
 
  ngOnInit(): void {

    //collect the logged user id information
    this.ngAuthService.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.currentUserID = user.uid;
        this.basePath = '/' + this.currentUserID + '/files';
        this.dbUserScanCollection = this.afDatabase.firestore.collection("users").doc(this.currentUserID).collection('scannedDocs');

        this.dbUserScanCollection.get().then((querySnapshot) => { 
          querySnapshot.forEach((doc) => {
              console.log(doc.id, "=>", doc.data());
              //filter the empty data
              //make nice new uwu object -> categorize it
              //fill this object with data from doc as you please
              //add that as scanned document
              //foreach in view with key => value
              var newObject = {
                'docID': doc.id,
                'docData': doc.data()
              };  
              console.log(newObject)
              this.scannedDocuments.push(newObject);
          })
       }).then(() => {
          for(let item of this.scannedDocuments){
            console.log(item);

            this.responseCollection.docID = item.docID;
            this.responseCollection.url = item.docData.url;
            this.responseCollection.date = item.docData.date;
            this.responseCollection.ocrTemplate = item.docData.ocrTemplate;


            for(let [key, value] of Object.entries(item.docData.data.data)){
              console.log(key);
              //first check, if it is not empty
              if(value != "" && value != null){
                if(this.documentInformationKeys.indexOf(key) > -1){
                  this.responseCollection.documentInformation[key] = value;
                  // console.log(this.responseCollection.documentInformation[key]);
                }else if(this.paymentInformationKeys.indexOf(key) > -1){
                  this.responseCollection.paymentInformation[key] = value;
                  // console.log(this.responseCollection.paymentInformation[key]);
                }else if(this.customerInformationKeys.indexOf(key) > -1){
                  this.responseCollection.customerInformation[key] = value;
                  // console.log(this.responseCollection.customerInformation[key]);
                }else if(this.merchantInformationKeys.indexOf(key) > -1){
                  this.responseCollection.merchantInformation[key] = value;
                  // console.log(this.responseCollection.merchantInformation[key]);
                }else if(this.customFieldsKeys.indexOf(key) > -1){
                  this.responseCollection.customFields[key] = value;
                  // console.log(this.responseCollection.customFields[key]);
                }else if(this.amountInformationKeys.indexOf(key) > -1){
                  this.responseCollection.amountInformation[key] = value;
                  // console.log(this.responseCollection.amountInformation[key]);
                }
        
              }
            }

            this.filteredObjects.push(this.responseCollection);
            console.log(this.responseCollection);
            this.responseCollection = {
              docID: "",
              url: "",
              date: new Date,
              ocrTemplate: "",
              documentInformation: {},
              paymentInformation: {},
              customerInformation: {},
              merchantInformation: {},
              customFields: {},
              amountInformation: {}
            }
            console.log(this.responseCollection);
          }
          console.log(this.filteredObjects);
       });

      } else {
        // No user is signed in.
      }
    });

  
  }

  constructor(private afDatabase: AngularFirestore,
              public ngAuthService: NgAuthService
             ) { 

  }

  logResponseCollection(){
    console.log(this.filteredObjects);
  }

  filterMerchant = (a: KeyValue<string,any>) => {
    return a.key.indexOf('merchant') > -1 ? 0 : -1;
    // console.log(a.key.indexOf('merchant'))
  }
}
