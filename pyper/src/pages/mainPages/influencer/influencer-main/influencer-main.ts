import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { sharedService } from '../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the InfluencerMainPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-influencer-main',
  templateUrl: 'influencer-main.html'
})
export class InfluencerMainPage {

  influencerHomeRoot = 'InfluencerHomePage'
  influencerPostsRoot = 'InfluencerPostsPage'
  influencerInboxRoot = 'InboxPage'
  influencerLeaderboardRoot = 'InfluencerLeaderboardPage'

  notificationMsgs: string;

  constructor(public navCtrl: NavController, public sharedService: sharedService) {
    //todo change this to show unread messages
    this.notificationMsgs = "1";
  }

  ionViewCanEnter(){
    return this.sharedService.isLoggedIn();
  }

}
