import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the HomeDefaultComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-default',
  templateUrl: 'home-default.html'
})
export class HomeDefaultComponent {

  slideImgs: Array<string>;

  @Output() navToDiffPage = new EventEmitter<number>();

  constructor(public navCtrl: NavController) {
    console.log('Hello HomeDefaultComponent Component');
  }

  

}