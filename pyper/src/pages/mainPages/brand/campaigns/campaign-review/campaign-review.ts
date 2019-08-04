import { CampaignProvider } from './../../../../../providers/dataaccess/campaignProvider';
import { Campaign, SocialMediaPlatform } from './../../../../../interfaces/campaign';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the CampaignReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign-review',
  templateUrl: 'campaign-review.html',
})
export class CampaignReviewPage{
  
  public agegroup: any = { lower: 18, upper: 60 };
  public male: boolean;
  public female: boolean;
  public targetRegions = [];
  public interests = [];

  public brandCoverImageUrl;

  public campaign : Campaign;
  public SM : SocialMediaPlatform[];
  
  public fb: SocialMediaPlatform ;
  public fbhashtags = [];
  public fbmentions = [];
  
  public insta : SocialMediaPlatform;
  public instahashtags = [];
  public instamentions = [];

  public twitter: SocialMediaPlatform;
  public twitterhashtags = [];
  public twittermentions = [];

  public youtube :SocialMediaPlatform;
  public youtubehashtags = [];
  public youtubementions = [];

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public campaignProvider : CampaignProvider, public sharedService : sharedService) {
    this.campaign = this.campaignProvider.getCampaign();
    
  }

  public setFilter(){
    console.log('Setting filters' + JSON.stringify(this.campaignProvider.getCampaign().filter));
    this.agegroup = { lower: this.campaignProvider.getCampaign().filter.minimumAge, upper: this.campaignProvider.getCampaign().filter.maximumAge };
    this.male = this.campaignProvider.getCampaign().filter.gender.male;
    this.female = this.campaignProvider.getCampaign().filter.gender.female;
    this.targetRegions = this.campaignProvider.getCampaign().filter.regions;
    this.interests = this.campaignProvider.getCampaign().filter.interests;
  }
 public setup(){
  this.SM = this.campaign.socialMedia;
  if(this.SM != undefined){
    for(let i=0; i<this.SM.length; i++){
      if(this.SM[i].name === 'facebook'){
        this.fb = this.SM[i];
        this.fbhashtags = this.fb.hashtags;
        this.fbmentions = this.fb.mentions;
      }
      if(this.SM[i].name === 'instagram'){
        this.insta = this.SM[i];
        this.instahashtags = this.insta.hashtags;
        this.instamentions = this.insta.mentions;
      }
      if(this.SM[i].name === 'twitter'){
        this.twitter = this.SM[i];
        this.twitterhashtags = this.twitter.hashtags;
        this.twittermentions = this.twitter.mentions;
      }
      if(this.SM[i].name === 'youtube'){
        this.youtube = this.SM[i];
        this.youtubehashtags = this.youtube.hashtags;
        this.youtubementions = this.youtube.mentions;
      }
    }
  }
  
  console.log('SM ' + JSON.stringify(this.SM));
  console.log('FB' + JSON.stringify(this.fb));

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignReviewPage');
    
  }

  saveCampaignDetails(){
    console.log('Campaign ' + JSON.stringify(this.campaignProvider.getCampaign()));
    
  }
  isInfluencer(){
    return this.campaignProvider.getType() === this.sharedService.INFLUENCER_CAMPAIGN;
  }

  isSocialMediaPresent(){
    return this.fbhashtags.length || this.fbmentions.length
          ||this.instahashtags.length || this.instamentions.length
          ||this.twitterhashtags.length || this.instamentions.length
          ||this.youtubehashtags.length || this.youtubementions.length;
  }

}
