export interface OCRResponseFinancialTemplateModel {

    "data": {
        "amount": 0,
        "amount_change": 0,
        "amountexvat": 0,
        "barcodes": [
            {
                "type": "",
                "value": "string"
            }
        ],
        "currency": "string",
        "customer_address": "string",
        "customer_bank_account_number": "string",
        "customer_bank_account_number_bic": "string",
        "customer_city": "string",
        "customer_coc_number": "string",
        "customer_country": "string",
        "customer_email": "string",
        "customer_house_number": "string",
        "customer_municipality": "string",
        "customer_name": "string",
        "customer_number": "string",
        "customer_phone": "string",
        "customer_province": "string",
        "customer_reference": "string",
        "customer_street_name": "string",
        "customer_vat_number": "string",
        "customer_website": "string",
        "customer_zipcode": "string",
        "date": "string",
        "document_language": "string",
        "document_subject": "string",
        "document_type": "",
        "hash": "string",
        "hash_duplicate": true,
        "invoice_number": "string",
        "invoice_type": "",
        "lines": [
            {
                "description": "string",
                "lineitems": [
                    {
                        "amount": 0,
                        "amount_each": 0,
                        "amount_ex_vat": 0,
                        "description": "string",
                        "quantity": 0,
                        "sku": "string",
                        "title": "string",
                        "vat_amount": 0,
                        "vat_code": "string",
                        "vat_percentage": 0
                    }
                ]
            }
        ],
        "matched_keywords": [
            {
                "count": 0,
                "id": "string",
                "matches": [
                "string"
                ]
            }
        ],
        "matched_lineitems": [
            {
                "id": "string",
                "lineitems": [
                    {
                        "amount": 0,
                        "amount_each": 0,
                        "amount_ex_vat": 0,
                        "description": "string",
                        "quantity": 0,
                        "sku": "string",
                        "title": "string",
                        "vat_amount": 0,
                        "vat_code": "string",
                        "vat_percentage": 0
                    }
                ]
            }
        ],
        "matched_purchase_order_id": "string",
        "merchant_address": "string",
        "merchant_bank_account_number": "string",
        "merchant_bank_account_number_bic": "string",
        "merchant_bank_domestic_account_number": "string",
        "merchant_bank_domestic_bank_code": "string",
        "merchant_chain_liability_amount": 0,
        "merchant_chain_liability_bank_account_number": "string",
        "merchant_city": "string",
        "merchant_coc_number": "string",
        "merchant_country": "string",
        "merchant_country_code": "string",
        "merchant_email": "string",
        "merchant_house_number": "string",
        "merchant_id": "string",
        "merchant_main_activity_code": "string",
        "merchant_municipality": "string",
        "merchant_name": "string",
        "merchant_phone": "string",
        "merchant_province": "string",
        "merchant_street_name": "string",
        "merchant_vat_number": "string",
        "merchant_website": "string",
        "merchant_zipcode": "string",
        "order_number": "string",
        "package_number": "string",
        "payment_auth_code": "string",
        "payment_card_account_number": "string",
        "payment_card_bank": "string",
        "payment_card_issuer": "string",
        "payment_card_number": "string",
        "payment_due_date": "string",
        "payment_slip_code": "string",
        "payment_slip_customer_number": "string",
        "payment_slip_reference_number": "string",
        "paymentmethod": "",
        "purchasedate": "string",
        "purchasetime": "string",
        "raw_text": "string",
        "receipt_number": "string",
        "server": "string",
        "shop_number": "string",
        "table_group": "string",
        "table_number": "string",
        "terminal_number": "string",
        "transaction_number": "string",
        "transaction_reference": "string",
        "vat_context": "",
        "vatamount": 0,
        "vatitems": [
            {
                "amount": 0,
                "amount_excl_vat": 0,
                "amount_incl_excl_vat_estimated": true,
                "amount_incl_vat": 0,
                "code": "string",
                "percentage": 0
            }
        ]
    },
    "request_id": "string",
    "result": "string"
}