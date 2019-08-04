import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CampaignProvider } from './../../../../../providers/dataaccess/campaignProvider';
import { Observable } from 'rxjs';
import { Campaign } from '../../../../../interfaces/campaign';
import * as moment from 'moment';

import { sharedService } from '../../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the CampaignViewInfluencerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign-view-influencer',
  templateUrl: 'campaign-view-influencer.html',
})
export class CampaignViewInfluencerPage {

  public campaignData;
  private myCampaigns: Observable<Array<Campaign>>;
  private selectedCampaign: Observable<Campaign>;
  private rowData;
  private rowSelection;



  columnDefs = [
    { headerName: 'Type', field: 'type' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'From', field: 'from' },
    { headerName: 'To', field: 'to' },
    { headerName: 'Influencers', field: 'influencers' },
    { headerName: 'Reach', field: 'reach' },
    { headerName: 'Cost', field: 'cost' },
    { headerName: 'Enggmt', field: 'enggmt' },
    { headerName: 'Repeat', field: 'repeat' }
  ];

  gridOptions = {
    columnDefs: this.columnDefs,
    rowData: this.rowData,
    enableColResize: true
  };


  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public campaignProvider: CampaignProvider, public sharedService: sharedService) {

    // this.selectedCampaign = campaignProvider.getCampaignById("DuVBykEEy63w6N5Fjzzb");
    this.myCampaigns = campaignProvider.getCampaignsByBrandId("oIILrWJ251ZKNFctSprG");
    var type = campaignProvider.setType;
    this.campaignData = this.navParams.get("row");
    this.rowSelection = "single";
  }
  ionViewCanEnter() {
    return this.sharedService.isLoggedIn();
  }
  ngOnInit(): void {

    let arr = [];
    this.myCampaigns.subscribe(
      arrayOfCampaigns => {
        for (let c of arrayOfCampaigns) {
          console.log('type' + JSON.stringify(c.contentType));
          arr.push(
            {
              type: c.contentType,
              name: c.productName,
              //dont use below moment() implementation, does not work. Please remove this code if not required.
              from: moment(c.publishBriefDate, 'DD/MM/YYYY').format('YYYY-MM-DD[T]HH:mm:ss'),
              to: c.submissionEndDate,
              influencers: "12",
              reach: "12000",
              cost: c.cost,
              enggmt: "enggmt",
              repeat: "+"

            }
          )
          this.rowData = arr;
          console.log("rowData1" + JSON.stringify(this.rowData));
        }
      }
    )


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignViewMainPage');
  }

  createSampleCampaign() {
    let object = this.campaignProvider
      .setBrandUid('oIILrWJ251ZKNFctSprG')
      .setContentType('some content type')
      .setCost(1000.0)
      // .setCoverImageUrl(null)
      .setDonts(['DONT', 'DO', 'THIS'])
      .setDos(['DONT', 'DO', 'THIS'])
      //.setDreamboardImageUrls(null)
      .setType(this.campaignProvider.sharedService.INFLUENCER_CAMPAIGN)
      .setFilter({
        minimumAge: 20,
        maximumAge: 30,
        regions: ['Mumbai'],
        interests: ['Food and Drinks']
      })
      // .setLogoUrl(null)
      .setName('Some Campaign Name on ' + new Date())
      .setProductCategory('CATEGORY')
      .setProductDescription('Some description')
      .setProductName('Some Product Name on ' + new Date())
      .setProductUrl('url')
      .setPublishBriefDate(new Date())
      .setSocialMedia([{
        name: 'Facebook',
        hashtags: ['some', 'hashtags'],
        mentions: ['some', 'mentions'],
        followers: null
      }
      ])
      .setSpecification('specs')
      .setSubmissionEndDate(new Date());

    // this.campaignProvider.save();
  }
}
