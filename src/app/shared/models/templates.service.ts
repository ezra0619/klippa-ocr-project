import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor() { }

  financialTemplate: string = "Financial Document (.png, .jpg, .pdf)"
  structuredPDFTemplate: string = "Structured PDF (.pdf)"
}
