import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../../providers/sharedServices/sharedService';
import { Campaign } from '../../../../interfaces/campaign';
import { storage } from 'firebase';
import { Brand } from '../../../../interfaces/brand';
import _ from "lodash";

@IonicPage()
@Component({
  selector: 'influencer-detail',
  templateUrl: 'influencer-detail.html'
})
export class InfluencerDetailPage implements OnInit {
  campaign: Campaign;
  brand: Brand;
  _  = null;

  constructor(public navCtrl: NavController, private navParams: NavParams, public sharedService: sharedService) {
    this.campaign = navParams['data'].data;
    this.brand = navParams['data'].brand;
    this.loadDreamBoardImages(this.campaign);
    this._ = _;
  }

  ionViewCanEnter() {
     return this.sharedService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  loadDreamBoardImages(campaign: Campaign) {
    let promises = [];
    if (campaign.dreamboardImageUrls) {
      campaign.dreamboardImageUrls
        .forEach(url => promises.push(this.readImagePromise(url)));
    }
    Promise.all(promises)
      .then(imageUrls => imageUrls.forEach((url, index, arr) => campaign.dreamboardImageUrls[index] = url))
      .catch(error => console.error("Error: while fetching dreamboard urls :" + error));
  }

  goToCampaignPost() {
    this.navCtrl.push('CampaignPostPage', {'campaign' : this.campaign});
  }

  getSocialMediaNames():string {
    return this.campaign.socialMedia
    .map( media => media.name)
    .map( name => _.capitalize(name))
    .join(" | ");
  }

  //TODO UTILITY
  readImagePromise(storagePathName) {
    // Create a reference to the file we want to download
    return storage().ref().child(storagePathName).getDownloadURL();
  }

  
}
