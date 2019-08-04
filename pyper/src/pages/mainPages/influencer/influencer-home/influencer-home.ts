import { UtilService } from './../../../../providers/utilService/utilService';
import { BrandProvider } from './../../../../providers/dataaccess/brandProvider';
import { CampaignProvider } from './../../../../providers/dataaccess/campaignProvider';
import { Component, trigger, state, style, transition, animate, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import _ from "lodash";
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Influencer } from '../../../../interfaces/influencer';
import { storage } from 'firebase';
import { sharedService } from '../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the InfluencerHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-influencer-home',
  templateUrl: 'influencer-home.html',
  animations: [
    trigger('heart', [
      state('unliked', style({
        color: '#fff',
        opacity: '0.5',
        transform: 'scale(1)'
      })),
      state('liked', style({
        color: '#e74c3c',
        opacity: '1',
        transform: 'scale(1.1)'
      })),
      transition('unliked <=> liked', animate('100ms ease-out'))
    ])
  ]
})
export class InfluencerHomePage implements OnInit {

  public likeState: string = 'unliked';
  public iconName: string = 'heart-empty';
  public filterInfluencers: any[];
  gridOptions: any;
  influencerCampaigns = [];

  isFacebook: boolean = false;
  isTwitter: boolean = false;
  isYoutube: boolean = false;
  isInstagram: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private campaignProvider: CampaignProvider, private brandProvider: BrandProvider, private sharedService: sharedService, private utilService : UtilService) {
  }

  ngOnInit() {
    //TODO get logged in influencer
    this.populateCampaigns();

  }

  populateCampaigns() {
    let dummy: Influencer = {
      email: 'frcrcecompsinterns@gmail.com',
      influencerUid: 'P4b9PdfXbPTh7ylnfq5LiPnVNE22',
      name:'Pyper Dummy',
      photoUrl : '',
      age: 18,
      gender: 'MALE',
      interests: ['Automative', 'Animals'],
      regions: ['india']
    };

    let selectedFilter = ['interests', 'gender', 'age', 'regions'];
    let sortBy = ['publishBriefDate', 'submissionEndDate'];


    if (_.isEmpty(selectedFilter)) {
      this.campaignProvider.getAllCampaigns()
        .subscribe(
          rows => this.displayRowsForCampaigns(rows, sortBy)
        );

    } else {
      combineLatest<any[]>([
        this.campaignProvider.getFilteredInfluencerCampaign(selectedFilter, dummy),
        this.campaignProvider.getContentCampaigns()
      ])
        .pipe(
          map(campaigns => campaigns.reduce((accumulatedCampaigns, currentCampaign) => accumulatedCampaigns.concat(currentCampaign)))
        )
        .subscribe(

          rows => this.displayRowsForCampaigns(rows, sortBy)

        );
    }
  }

  displayRowsForCampaigns(rows: any[], sortBy: string[]) {


    if (sortBy.length > 0)
      rows = _.sortBy(rows, sortBy);

    this.influencerCampaigns = [];

    this.influencerCampaigns = rows.map(campaign => {
      return {
        "data": campaign,
        "socialMedia": {
          "isFacebook": _.findIndex(campaign.socialMedia, ['name', 'facebook']) !== -1,
          "isTwitter": _.findIndex(campaign.socialMedia, ['name', 'twitter']) !== -1,
          "isYoutube": _.findIndex(campaign.socialMedia, ['name', 'youtube']) !== -1,
          "isInstagram": _.findIndex(campaign.socialMedia, ['name', 'instagram']) !== -1,
        },
        "brand": null
      };
    });


    this.influencerCampaigns.forEach(campaign => {
      let logoUrlPromise = this.utilService.readImage(campaign.data.logoUrl);
      let coverImageUrlPromise = this.utilService.readImage(campaign.data.coverImageUrl);

      this.brandProvider.getBrandById(campaign.data.brandUid)
        .subscribe(
          brand => {
            if (brand)
              campaign.brand = brand;
          }
        )


      Promise.all([logoUrlPromise, coverImageUrlPromise])
        .then(urls => {
          campaign.data.logoUrl = urls[0];
          campaign.data.coverImageUrl = urls[1];
        })
        .catch(error => {
          console.log("Error while loading images for the campaign");
        });

    })

    this.filterInfluencers = this.influencerCampaigns;
  }

  readImagePromise(storagePathName) {
    // Create a reference to the file we want to download
    return storage().ref().child(storagePathName).getDownloadURL();
  }

  

  toggleLikeState() {

    if (this.likeState == 'unliked') {
      this.likeState = 'liked';
      this.iconName = 'heart';
    } else {
      this.likeState = 'unliked';
      this.iconName = 'heart-empty';
    }

  }

  


  ionViewCanEnter() {
    return this.sharedService.isLoggedIn();
  }

}
