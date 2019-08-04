import { Component, Output, EventEmitter, Input } from '@angular/core';

/**
 * Generated class for the PyperFileinputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-fileinput',
  templateUrl: 'pyper-fileinput.html'
})
export class PyperFileinputComponent {

  @Input('text') text : string;
  @Output() OnUpload = new EventEmitter<any>();
  @Input('noSrcText') noSrcText : string;
  @Input('src') src : string;


  constructor() {
    this.text = 'File';
    this.noSrcText = '+';
  }

  invokeUpload(event){
    const files = event.srcElement.files;
    this.OnUpload.emit(files);
    let reader = new FileReader();
    reader.onload= (event) => {
      this.src = event.target["result"];
    }
    reader.readAsDataURL(files[0]);

  }

  isFileImagePresent(){
    return this.src;
  }

}
