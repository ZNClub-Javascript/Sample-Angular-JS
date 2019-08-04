import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedService: sharedService) {
    if (this.sharedService.isLoggedIn() === false) {
      navCtrl.setRoot('default');
    }
  }

  ionViewCanEnter() {
    return this.sharedService.isLoggedIn();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  goToPendingPosts() {
    this.navCtrl.setRoot('PostStatusPage');
  }


}
