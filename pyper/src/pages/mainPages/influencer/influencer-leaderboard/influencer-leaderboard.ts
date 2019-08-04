import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the InfluencerLeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-influencer-leaderboard',
  templateUrl: 'influencer-leaderboard.html',
})
export class InfluencerLeaderboardPage {

  constructor(public navCtrl: NavController, public sharedService: sharedService) {}

  ionViewCanEnter(){
    return this.sharedService.isLoggedIn();
  }

}
