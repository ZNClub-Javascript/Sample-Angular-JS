import { Injectable } from "@angular/core";
import { sharedService } from "../sharedServices/sharedService";
import { InfluencerProvider } from "../dataaccess/influencerProvider";
import { NavController, NavParams } from "ionic-angular";

// @Injectable()
export class RouterService {

    constructor(public navCtrl: NavController, public navParams: NavParams,private sharedService: sharedService, private influencerProvider: InfluencerProvider) {
    }

    goToUserHomePage() {
        localStorage.setItem('loggedIn', 'true');
        if (this.sharedService.roleId == 1) {
            this.navCtrl.setRoot('HomePage');
      
          } else if (this.sharedService.roleId == 2) {
            this.influencerProvider.getInfluencerById(this.sharedService.uid)
            .subscribe( influencer => {
              
              if(influencer && influencer[0].interests && influencer[0].age && influencer[0].gender){
                this.navCtrl.setRoot('InfluencerMainPage');
              
              } else {
                this.navCtrl.setRoot('InfluencerBasicDetails', influencer);
              }
            }, () => {
              console.error('Error: Could not retrieve influencer details.');
              this.navCtrl.setRoot('InfluencerMainPage');
            });
          }
    }
}