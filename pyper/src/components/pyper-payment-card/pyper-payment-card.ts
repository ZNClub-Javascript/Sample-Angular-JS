import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Payment } from '../../interfaces/payment';

/**
 * Generated class for the PyperPaymentCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-payment-card',
  templateUrl: 'pyper-payment-card.html'
})
export class PyperPaymentCardComponent implements OnInit {

  @Input('isEnabled') isEnabled: boolean = false;
  @Input('name') name: string;
  @Input('defaultPayment') defaultPayment :Payment;

  cardNumber1: string;
  cardNumber2: string;
  cardNumber3: string;
  cardNumber4: string;
  mm: number;
  yy: number;

  constructor() {

  }

  ngOnInit(): void {
    console.log('Hello PyperPaymentCardComponent Component' + this.defaultPayment.creditCardNumber);
    
    this.formatCardNumber();
    this.formatExpDate();
    if (this.name == undefined || this.name == '') {
      this.name = "CARDHOLDER NAME";
    }
  }

  

  formatExpDate() {
    console.log('exp date' + this.defaultPayment.expiryDate);
    if (this.defaultPayment.expiryDate) {
      this.mm = Number(this.defaultPayment.expiryDate.substring(0, 2));
      this.yy = Number(this.defaultPayment.expiryDate.substring(3, 5));
    }
  }

  formatCardNumber() {
    if (this.defaultPayment.creditCardNumber) {
      this.cardNumber1 = this.defaultPayment.creditCardNumber.substring(0, 4);
      this.cardNumber2 = this.defaultPayment.creditCardNumber.substring(4, 8);
      this.cardNumber3 = this.defaultPayment.creditCardNumber.substring(8, 12);
      this.cardNumber4 = this.defaultPayment.creditCardNumber.substring(12, 16);
    }


  }

  test() {
    this.changeInputs();
    alert(this.defaultPayment.creditCardNumber);
    alert(this.cardNumber2);
    alert(this.defaultPayment.expiryDate);
    alert(this.defaultPayment.cvv);
  }

  getStringFor(num: number) {
    if (num != undefined) {
      if (num.toString().length == 1) {
        return '0' + num.toString();
      }
      return num.toString();
    }
    else{
      return '';
    }
  }
  changeInputs() {
    this.defaultPayment.creditCardNumber = this.cardNumber1 + this.cardNumber2 + this.cardNumber3 + this.cardNumber4;
    this.defaultPayment.expiryDate = this.getStringFor(this.mm) + '/' + this.getStringFor(this.yy);
    

  }

}
