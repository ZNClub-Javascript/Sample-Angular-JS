import { UtilService } from './../../providers/utilService/utilService';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

/**
 * Generated class for the PyperCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-card',
  templateUrl: 'pyper-card.html'
})
export class PyperCardComponent implements OnInit{
  

  @Output() cardTap = new EventEmitter<any>();
  @Input('socialMedia') socialMedia : any;
  @Input('imageUrl')imageUrl : string;
  @Input('title') title: string;
  @Input('subtitle') subtitle:string;
  @Input('status') status:number;
  @Input('displayLike') displayLike : boolean = false; 
  liked: boolean = false;

  constructor() {
    
  }

  ngOnInit(): void {
  }

  toggleLike(){
    this.liked = true;
  }
  onClick(){
    console.log('clicked');
    this.cardTap.emit();
  }

}
