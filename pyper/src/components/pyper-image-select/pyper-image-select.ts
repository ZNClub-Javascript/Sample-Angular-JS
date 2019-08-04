import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the PyperImageSelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-image-select',
  templateUrl: 'pyper-image-select.html'
})
export class PyperImageSelectComponent {

  @Input('text') text: string;
  @Input('src') src : string;

  @Output() onSelect = new EventEmitter<boolean>();

  isSelected : boolean = false;
  isHovered : boolean = false;

  constructor() {
    console.log('Hello PyperImageSelectComponent Component');
    this.text = 'Add Text';
  }

  toggleSelect(){
    this.isSelected = !this.isSelected;
    this.onSelect.emit(this.isSelected);
  }

  hover(){
    this.isHovered = true;
  }

  hoverOff(){
    this.isHovered = false;
  }

}
