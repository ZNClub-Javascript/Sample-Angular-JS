import { Component, Input } from '@angular/core';

/**
 * Generated class for the PyperLikeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-like',
  templateUrl: 'pyper-like.html'
})
export class PyperLikeComponent {

  @Input('liked') liked : boolean = false;

  toggleLikeState(){
    this.liked = !this.liked;
  }

}
