import { Component, Input } from '@angular/core';

/**
 * Generated class for the PyperBulletListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-bullet-list',
  templateUrl: 'pyper-bullet-list.html'
})
export class PyperBulletListComponent {

  @Input('list') list = [];
  @Input('icon') icon : string;
  @Input('iconColor') iconColor: string;

  text: string;

  constructor() {
    console.log('Hello PyperBulletListComponent Component');
    this.text = 'Hello World';
  }

  deleteElement(element : string){
    const index: number = this.list.indexOf(element);
    if (index !== -1) {
        this.list.splice(index, 1);
    } 
  }
}
