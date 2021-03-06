import { Component } from '@angular/core';

/**
 * Generated class for the LogoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'logo',
  templateUrl: 'logo.html'
})
export class LogoComponent {

  imgUrl: string;

  constructor() {
    console.log('Hello LogoComponent Component');
    this.imgUrl = 'assets/imgs/nav_logo.jpg';
  }

}
