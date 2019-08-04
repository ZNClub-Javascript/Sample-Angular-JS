import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CampaignProvider } from '../../../../../providers/dataaccess/campaignProvider';
import { NgForm } from '@angular/forms';
import { SocialMediaPlatform } from '../../../../../interfaces/campaign'
import { sharedService } from '../../../../../providers/sharedServices/sharedService';
/**
 * Generated class for the CampaignBriefPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign-brief',
  templateUrl: 'campaign-brief.html',
})
export class CampaignBriefPage {

  public dos = [];
  public donts = [];

  public formDo : string;
  public formDont : string;
  public formfbhashtags : string;
  public formfbmentions : string;
  public forminstahashtags : string;
  public forminstamentions : string;
  public formtwitterhashtags : string;
  public formtwittermentions : string;
  public formyoutubehashtags : string;
  public formyoutubementions : string;


  public fbhashtags = [];
  public instahashtags = [];
  public twitterhashtags = [];
  public youtubehashtags = [];

  public fbmentions = [];
  public instamentions = [];
  public twittermentions = [];
  public youtubementions = [];

  public isFb : boolean = true;
  public isInsta : boolean = true;
  public isTwitter : boolean = true;
  public isYoutube : boolean = true;

  public fb : SocialMediaPlatform ;
  public insta : SocialMediaPlatform;
  public twitter : SocialMediaPlatform;
  public youtube : SocialMediaPlatform;

  public dreamboardUrls = [];
  public dreamboardFileUploadInstances = [];

  @ViewChild('campaignBriefForm') campaignBriefForm : NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, public campaignProvider: CampaignProvider) {
    this.dreamboardFileUploadInstances.push(1);
    this.fb = {
      name : "facebook",
      hashtags : [],
      mentions :[]
    };
    this.insta = {
      name : "instagram",
      hashtags : [],
      mentions :[]
    };
    this.twitter = {
      name : "twitter",
      hashtags : [],
      mentions :[]
    };
    this.youtube = {
      name : "youtube",
      hashtags : [],
      mentions :[]
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignBriefPage');
  }

  onUploadFile(files, choice: string){
    if (choice === 'dreamboard-image-input') {
      this.dreamboardUrls.push(files);
      this.dreamboardFileUploadInstances.push(1);
      
    } 
  }

  saveCampaignDetails(){
    let SM = [];
    SM.push(this.fb);
    SM.push(this.insta);
    SM.push(this.twitter);
    SM.push(this.youtube);
    let data = this.campaignBriefForm.value;
    this.campaignProvider.setContentType(data.contentType)
    .setDonts(this.donts)
    .setDos(this.dos)
    .setSpecification(data.specification)
    .setTemporarayDreamboardImageFiles(this.dreamboardUrls)
    .setSocialMedia(SM);

    console.log('Campaign ' + JSON.stringify(this.campaignProvider.getCampaign()));

  }

  //dos and donts
  addToDos(){
    let data = this.campaignBriefForm.value;
    this.dos.push(data.dos);
    this.formDo = null;

  }

  addToDonts(){
    let data = this.campaignBriefForm.value;
    this.donts.push(data.donts);
    this.formDont = null;
  }
  
  

  //facebook
  addTofbhashtags(){
    let data = this.campaignBriefForm.value;
    this.fb.hashtags.push('#' + data.fbhashtags);
    this.formfbhashtags = null;
  }
  addTofbmentions(){
    let data = this.campaignBriefForm.value;
    this.fb.mentions.push('@' + data.fbmentions);
    this.formfbmentions = null;
  }
  
 


  toggleFb(){
    if(!this.isFb){
      this.fb.hashtags = [];
      this.formfbhashtags = null;
      this.fb.mentions = [];
      this.formfbmentions = null;
    }
  }


  //twitter
  addTotwitterhashtags(){
    let data = this.campaignBriefForm.value;
    this.twitter.hashtags.push('#' + data.twitterhashtags);
    this.formtwitterhashtags = null;
  }
  addTotwittermentions(){
    let data = this.campaignBriefForm.value;
    this.twitter.mentions.push('@' + data.twittermentions);
    this.formtwittermentions = null;
  }
  
 
  toggleTwitter(){
    if(!this.isTwitter){
      this.twitter.hashtags = [];
      this.formtwitterhashtags = null;
      this.twitter.mentions = [];
      this.formtwittermentions = null;
    }
  }
  
  //insta
  addToinstahashtags(){
    let data = this.campaignBriefForm.value;
    this.insta.hashtags.push('#' + data.instahashtags);
    this.forminstahashtags = null;
  }
  addToinstamentions(){
    let data = this.campaignBriefForm.value;
    this.insta.mentions.push('@' + data.instamentions);
    this.forminstamentions = null;
  }
  
 

  toggleInsta(){
    if(!this.isInsta){
      this.insta.hashtags = [];
      this.forminstahashtags = null;
      this.insta.mentions = [];
      this.forminstamentions = null;
    }
  }
  //youtube
  addToyoutubehashtags(){
    let data = this.campaignBriefForm.value;
    this.youtube.hashtags.push('#' + data.youtubehashtags);
    this.formyoutubehashtags = null;
  }
  addToyoutubementions(){
    let data = this.campaignBriefForm.value;
    this.youtube.mentions.push('@' + data.youtubementions);
    this.formyoutubementions = null;
  }
  
 

  toggleYoutube(){
    if(!this.isYoutube){
      this.youtube.hashtags = [];
      this.formyoutubehashtags = null;
      this.youtube.mentions = [];
      this.formyoutubementions = null;
    }
  }

  public isFormValid(){
    return this.campaignBriefForm.valid 
        && (this.dos.length > 0 )
        && (this.donts.length > 0 )

    ;
  }
}
