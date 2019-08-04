import { CampaignProvider } from './../../../../../providers/dataaccess/campaignProvider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../../../providers/sharedServices/sharedService';


/**
 * Generated class for the CampaignSubmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign-submit',
  templateUrl: 'campaign-submit.html',
})
export class CampaignSubmitPage {
  

  public responseTimeOptions = [];
  public publishDate;
  public submissionDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public campaignProvider : CampaignProvider) {
    this.populateResponseTimeOptions();

    // if(this.sharedService.isLoggedIn() === false){
    //   navCtrl.setRoot('default');
    // }
  }

  populateResponseTimeOptions(): any {
    this.responseTimeOptions.push('2 hrs');
    this.responseTimeOptions.push('12 hrs');
    this.responseTimeOptions.push('24 hrs');
    this.responseTimeOptions.push('2 days');
    this.responseTimeOptions.push('3 days');
   
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignSubmitPage');
  }

  saveCampaignDetails(){
    this.campaignProvider.saveCampaign();
  }
  

}
