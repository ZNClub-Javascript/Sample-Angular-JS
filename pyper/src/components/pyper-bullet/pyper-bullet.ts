import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * Generated class for the PyperBulletComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-bullet',
  templateUrl: 'pyper-bullet.html'
})
export class PyperBulletComponent implements OnInit{

  @Input('text') text: string;
  @Input('icon') icon: string;
  @Input('iconColor') iconColor : string;
  @Input('isCloseEnabled') isCloseEnabled: boolean;

  @Output() textDeleted = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
    if(this.isCloseEnabled == undefined || this.isCloseEnabled == null) {
      this.isCloseEnabled = true;
    }
  }

  isIcon(){
    let isNotIcon =  this.icon === '' || this.icon === null || this.icon === undefined;
    return !isNotIcon;
  }
  delete(){
    console.log('delete Do called for ' + this.text);
    this.textDeleted.emit(this.text);
  }
  checkCloseEnabled(){
    return this.isCloseEnabled == true;
  }

}
