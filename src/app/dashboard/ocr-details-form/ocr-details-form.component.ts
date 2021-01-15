import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  
  constructor(private http: HttpClient, private afDatabase: AngularFirestore) {
    var dbUser = afDatabase.firestore.collection("users").doc("IDXfLrL7EBZkSuiEeZeQWIqOVdo1");
    dbUser.set({
      scannedDocs: {
        "ohr3s-8343df": {
            url: "",
            data: {
              "result": "success",
              "data": {
                  "document_type": "receipt",
                  "amount": 642,
                  "amount_change": 1360,
                  "vatamount": 0,
                  "amountexvat": 642,
                  "currency": "EUR",
                  "date": "",
                  "purchasedate": "",
                  "purchasetime": "",
                  "vatitems": [],
                  "vat_context": "",
                  "lines": [
                      {
                          "description": "",
                          "lineitems": [
                              {
                                  "title": "ELSTAR",
                                  "description": "",
                                  "amount": 199,
                                  "amount_each": 199,
                                  "amount_ex_vat": 199,
                                  "vat_amount": 0,
                                  "vat_percentage": 0,
                                  "quantity": 1,
                                  "sku": "",
                                  "vat_code": ""
                              },
                              {
                                  "title": "BANANEN",
                                  "description": "",
                                  "amount": 201,
                                  "amount_each": 201,
                                  "amount_ex_vat": 201,
                                  "vat_amount": 0,
                                  "vat_percentage": 0,
                                  "quantity": 1,
                                  "sku": "",
                                  "vat_code": ""
                              },
                              {
                                  "title": "AH LAMP",
                                  "description": "",
                                  "amount": 89,
                                  "amount_each": 89,
                                  "amount_ex_vat": 89,
                                  "vat_amount": 0,
                                  "vat_percentage": 0,
                                  "quantity": 1,
                                  "sku": "",
                                  "vat_code": ""
                              },
                              {
                                  "title": "AH LAMP",
                                  "description": "",
                                  "amount": 89,
                                  "amount_each": 89,
                                  "amount_ex_vat": 89,
                                  "vat_amount": 0,
                                  "vat_percentage": 0,
                                  "quantity": 1,
                                  "sku": "",
                                  "vat_code": ""
                              },
                              {
                                  "title": "BOERENVOLK",
                                  "description": "",
                                  "amount": 64,
                                  "amount_each": 64,
                                  "amount_ex_vat": 64,
                                  "vat_amount": 0,
                                  "vat_percentage": 0,
                                  "quantity": 1,
                                  "sku": "",
                                  "vat_code": ""
                              }
                          ]
                      }
                  ],
                  "paymentmethod": "cash",
                  "payment_auth_code": "",
                  "payment_card_number": "",
                  "payment_card_account_number": "",
                  "payment_card_bank": "",
                  "payment_card_issuer": "",
                  "payment_due_date": "",
                  "terminal_number": "",
                  "document_subject": "",
                  "package_number": "",
                  "invoice_number": "",
                  "invoice_type": "",
                  "receipt_number": "",
                  "shop_number": "",
                  "transaction_number": "",
                  "transaction_reference": "",
                  "order_number": "",
                  "table_number": "",
                  "table_group": "",
                  "server": "",
                  "merchant_name": "Albert Heijn",
                  "merchant_id": "",
                  "merchant_coc_number": "",
                  "merchant_vat_number": "",
                  "merchant_bank_account_number": "",
                  "merchant_bank_account_number_bic": "",
                  "merchant_chain_liability_bank_account_number": "",
                  "merchant_chain_liability_amount": 0,
                  "merchant_bank_domestic_account_number": "",
                  "merchant_bank_domestic_bank_code": "",
                  "merchant_website": "",
                  "merchant_email": "",
                  "merchant_address": "",
                  "merchant_street_name": "",
                  "merchant_house_number": "",
                  "merchant_zipcode": "",
                  "merchant_city": "",
                  "merchant_municipality": "",
                  "merchant_province": "",
                  "merchant_country": "",
                  "merchant_country_code": "NL",
                  "merchant_phone": "0503131800",
                  "merchant_main_activity_code": "",
                  "customer_name": "",
                  "customer_number": "",
                  "customer_reference": "",
                  "customer_address": "",
                  "customer_street_name": "",
                  "customer_house_number": "",
                  "customer_zipcode": "",
                  "customer_city": "",
                  "customer_municipality": "",
                  "customer_province": "",
                  "customer_country": "",
                  "customer_phone": "",
                  "customer_vat_number": "",
                  "customer_coc_number": "",
                  "customer_bank_account_number": "",
                  "customer_bank_account_number_bic": "",
                  "customer_website": "",
                  "customer_email": "",
                  "payment_slip_code": "",
                  "payment_slip_reference_number": "",
                  "payment_slip_customer_number": "",
                  "document_language": "NL",
                  "matched_keywords": null,
                  "matched_lineitems": null,
                  "matched_purchase_order_id": "",
                  "barcodes": null,
                  "hash": "",
                  "hash_duplicate": false,
                  "raw_text": "           ALBERT HEIJN\n           Brugstraat 14\n         tel. 050-3131800\n                            EUR\n       ELSTAR              1,99\n       BANANEN              2,01\n       1,190kg EUR 1,69/kg\n       AH LAMP              0,89\n       AH LAMP              0,89\n       BOERENVOLK           0,64\n       SUBTOTAAL            6,42\nTOTAAL                  6,42\n       CONTANT             20,00\n       TERUG               13,60\nTOTAAL ZAKJES           0"
              },
              "request_id": "Krk22ffdDuEgH7OH7V3l8oBEQhk7Ua91"
            }
        }
      }
    }, { merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

   }

  ngOnInit(): void {
  }


  //!! to figure out how to span multiple url fields 
  // and store the information correctly for each
}
