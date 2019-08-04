import { Component, Input } from '@angular/core';

/**
 * Generated class for the PyperHoverImageSquareComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-hover-image-square',
  templateUrl: 'pyper-hover-image-square.html'
})
export class PyperHoverImageSquareComponent {

  @Input('text') text: string;
  @Input('src') src : string;
  @Input('noSrcText') noSrcText : string; 

  isHovered : boolean = false;

  constructor() {
    this.text = 'Edit';
    this.noSrcText = '+';
  }


  hover(){
    this.isHovered = true;
  }

  hoverOff(){
    this.isHovered = false;
  }

  isSrcValid(){
    let flag = ( this.src != undefined && this.src != '');
    return flag;
  }

}
