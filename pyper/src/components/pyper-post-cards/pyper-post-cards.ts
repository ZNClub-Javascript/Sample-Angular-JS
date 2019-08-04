import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilService } from '../../providers/utilService/utilService';

/**
 * Generated class for the PyperPostCardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-post-cards',
  templateUrl: 'pyper-post-cards.html'
})
export class PyperPostCardsComponent {


  @Input('posts') posts: any[];
  data: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private utilService: UtilService) {

  }

  ngOnChanges() {
    console.log('posts' + JSON.stringify(this.posts));
    if (this.posts) {
      this.data = this.posts.map(
        dataElement => {
          let obj = {
            'imageUrl': '',
            'title': dataElement.caption,
            'id': dataElement.imageUrl,
            'status':dataElement.status
          };
          this.utilService.readImage(dataElement.imageUrl).then(
            url => obj.imageUrl = url
          );
          return obj;
        }
      )
    }
  }

}
