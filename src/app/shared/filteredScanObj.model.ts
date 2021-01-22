
export interface FilteredScanObjModel {
    docID: string,
    url: string,
    date: Date,
    ocrTemplate: string,
    documentInformation: {},
    paymentInformation: {},
    customerInformation: {},
    merchantInformation: {},
    customFields: {
      raw_text: string, 
      lines: [
        {
        "description": string,
        "lineitems": [
            {
            "amount": number,
            "amount_each": number,
            "amount_ex_vat": number,
            "description": string,
            "quantity": number,
            "sku": string,
            "title": string,
            "vat_amount": number,
            "vat_code": string,
            "vat_percentage": number
            }
          ]
        }
      ],
      barcodes: [
        {
        "type": string,
        "value": string
        }
      ], 
      matched_lineitems: [
        {
        "id": string,
        "lineitems": [
            {
            "amount": number,
            "amount_each": number,
            "amount_ex_vat": number,
            "description": string,
            "quantity": number,
            "sku": string,
            "title": string,
            "vat_amount": number,
            "vat_code": string,
            "vat_percentage": number
            }
          ]
        }
      ],
    },
    amountInformation:{
        "currency": string, 
        "amount": number, 
        "amount_change": number, 
        "amountexvat": number, 
        "vatamount": number
    }
}