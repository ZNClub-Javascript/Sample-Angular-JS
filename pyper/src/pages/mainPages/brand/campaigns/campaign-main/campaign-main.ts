import { CampaignCreatorsPage } from './../campaign-creators/campaign-creators';
import { sharedService } from './../../../../../providers/sharedServices/sharedService';
import { CampaignProvider } from './../../../../../providers/dataaccess/campaignProvider';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Slides, ModalController , ViewController } from 'ionic-angular';
import { CampaignCreatePage } from '../campaign-create/campaign-create';
import { CampaignBriefPage } from '../campaign-brief/campaign-brief';
import { CampaignReviewPage } from '../campaign-review/campaign-review';
import { CampaignSubmitPage } from '../campaign-submit/campaign-submit';
import { BrandProvider } from '../../../../../providers/dataaccess/brandProvider';
import { Brand } from '../../../../../interfaces/brand';

/**
 * Generated class for the CampaignCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign-main',
  templateUrl: 'campaign-main.html',
})
export class CampaignMainPage {
  @ViewChild(CampaignCreatePage) campaignCreatePage: CampaignCreatePage;
  @ViewChild(CampaignBriefPage) campaignBriefPage: CampaignBriefPage;
  @ViewChild(CampaignCreatorsPage) campaignCreatorsPage: CampaignCreatorsPage;
  @ViewChild(CampaignReviewPage) campaignReviewPage: CampaignReviewPage;
  @ViewChild(CampaignSubmitPage) campaignSubmitPage: CampaignSubmitPage;


  currentPageIndex: number = 1;
  totalPages: number = 5;
  startPages: number = 1;
  brand: Brand = null;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public campaignProvider: CampaignProvider, public sharedService: sharedService,public brandProvider: BrandProvider, public modalCtrl : ModalController) {
    if(this.sharedService.isLoggedIn() === false){
      navCtrl.setRoot('default');
  }
    this.campaignProvider.setBrandUid(this.sharedService.uid);
  }

  ionViewCanEnter(){
    return this.sharedService.isLoggedIn();
  }



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  goToNextPage() {
    
    this.saveCampaignDetails();
    if (this.totalPages !== (this.currentPageIndex)) {
      if((this.campaignProvider.getType() === this.sharedService.CONTENT_CAMPAIGN) && this.currentPageIndex == 2)
        this.currentPageIndex = (this.currentPageIndex + 1); 
      this.currentPageIndex = (this.currentPageIndex + 1);
    }
  }

  submit() {
    console.log('Submitted Campaign')
    this.navCtrl.setRoot('HomePage');
  }

  saveCampaignDetails(): any {
    //todo remove setup and use lifecycle hooks instead
    console.log('Currently on Page ' + this.currentPageIndex);
    switch (this.currentPageIndex) {
      case 1: this.campaignCreatePage.saveCampaignDetails();
          // this.campaignReviewPage.loadImage(this.campaignProvider.getTemporarayCoverImage());
        break;
      case 2: this.campaignBriefPage.saveCampaignDetails();
      this.campaignReviewPage.setup();
        break;
        case 3: this.campaignCreatorsPage.saveCampaignDetails();
        this.campaignReviewPage.setup();
        this.campaignReviewPage.setFilter();
        break;
        case 4: this.campaignReviewPage.saveCampaignDetails();
        break;
        case 5: this.campaignSubmitPage.saveCampaignDetails();
              this.submit();
        break;
    }
  }

  isFormValid(){
    switch(this.currentPageIndex){
      case 1 : return this.campaignCreatePage.isFormValid();
      case 2 : return this.campaignBriefPage.isFormValid();
      case 3 : return this.campaignCreatorsPage.isFormValid();
      default : return true;
    }
  }
  isDocUploaded(){
    return true;
  }

  goToUploadDoc(){
   
    var data = { message : 'hello world' };
    var modalPage = this.modalCtrl.create('ModalPage',data);
     modalPage.present(); 
  }


  
  

  isPageVisible(page): boolean {
    return page === this.currentPageIndex;
  }

  goToPreviousPage() {
    
    if (this.startPages !== (this.currentPageIndex)){
      if((this.campaignProvider.getType() === this.sharedService.CONTENT_CAMPAIGN) && this.currentPageIndex == 4)
        this.currentPageIndex = (this.currentPageIndex - 1);
      this.currentPageIndex = (this.currentPageIndex - 1);
    }
  }
}
