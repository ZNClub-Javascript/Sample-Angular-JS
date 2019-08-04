import { CampaignProvider } from './../../../../providers/dataaccess/campaignProvider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the CampaignCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedService: sharedService, public campaignProvider: CampaignProvider) {
    if (this.sharedService.isLoggedIn() === false) {
      navCtrl.setRoot('default');
    }
  }

  ionViewCanEnter() {
    return this.sharedService.isLoggedIn();
  }

  goToInfluencerCampaignCreatePage() {
    this.campaignProvider.setType(this.sharedService.INFLUENCER_CAMPAIGN);
    this.navCtrl.setRoot('CampaignMainPage');
  }

  goToContentCampaignCreatePage() {
    this.campaignProvider.setType(this.sharedService.CONTENT_CAMPAIGN);
    this.navCtrl.setRoot('CampaignMainPage');
  }
}
