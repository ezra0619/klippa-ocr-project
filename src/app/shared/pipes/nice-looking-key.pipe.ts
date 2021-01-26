import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'niceLookingKey'
})
export class NiceLookingKeyPipe implements PipeTransform {

  transform(key: string): string {
    if(key === "paymentmethod"){
      return "Payment Method: "
    }else if(key === "purchasedate"){
      return "Purchase Date: "
    }else if(key === "purchasetime"){
      return "Purchase Time: "
    }else {
      var newFormat: string = "";
      newFormat = key.split("_").join(' ');
      newFormat = newFormat + ": ";
      return newFormat;
    }

  }

}
