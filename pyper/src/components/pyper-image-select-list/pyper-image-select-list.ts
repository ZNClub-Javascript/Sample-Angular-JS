import { Component, Input } from '@angular/core';

/**
 * Generated class for the PyperImageSelectListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-image-select-list',
  templateUrl: 'pyper-image-select-list.html'
})
export class PyperImageSelectListComponent {

  @Input('list') list :any[];
  @Input('selectedList') selectedList : any[];

  constructor() {
    console.log('Hello PyperImageSelectListComponent Component');
    this.list = [];
    this.selectedList = [];
  }

  toggleSelect(isSelected : boolean, selectedData){
    let data = selectedData.title;
    if(isSelected == true){
      this.selectedList.push(data);
    }
    else{
      let index = this.selectedList.indexOf(data);
      this.selectedList.splice(index, 1);
    }
  }

}
