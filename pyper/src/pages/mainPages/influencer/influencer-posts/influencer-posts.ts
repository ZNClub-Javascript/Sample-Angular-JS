import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the InfluencerPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-influencer-posts',
  templateUrl: 'influencer-posts.html',
})
export class InfluencerPostsPage {

  constructor(public navCtrl: NavController, public sharedService: sharedService) {}

  ionViewCanEnter(){
    return this.sharedService.isLoggedIn();
  }

  goToPostsDisplayPage(status : number){
    this.navCtrl.push('InfluencerPostsDisplayPage', status);
  }
}
