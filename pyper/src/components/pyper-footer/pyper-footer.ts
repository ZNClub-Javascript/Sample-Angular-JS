import { Component } from '@angular/core';

/**
 * Generated class for the PyperFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-footer',
  templateUrl: 'pyper-footer.html'
})
export class PyperFooterComponent {

  text: string;

  constructor() {
    console.log('Hello PyperFooterComponent Component');
    this.text = 'Hello World';
  }

}
