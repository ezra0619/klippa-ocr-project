import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDecimalSumStr'
})
export class TwoDecimalSumStrPipe implements PipeTransform {

  transform(number: number): number {
    var numberStr = number.toString();

    //if the string is of length < 3 then just return the string, needs more testing
    if(numberStr.length == 2){

      var numberArr;
      var numberTempStr;
      var finalNr;

      numberArr = numberStr.split('');
      numberArr.splice(0, 0, '0','.');
      numberTempStr = numberArr.join("");
      finalNr = parseFloat(numberTempStr);
      return finalNr;

    }else if(numberStr.length >= 3) {
      
      var numberArr;
      var numberTempStr;
      var finalNr;

      numberArr = numberStr.split('');
      numberArr.splice(numberArr.length - 2, 0, '.');
      numberTempStr = numberArr.join("");
      finalNr = parseFloat(numberTempStr);
      return finalNr;
    } else {
      return number
    }

  }

}
