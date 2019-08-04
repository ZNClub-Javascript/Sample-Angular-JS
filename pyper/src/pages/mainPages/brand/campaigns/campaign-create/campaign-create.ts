
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductCategory } from '../../../../../interfaces/productCategory';
import { ProductCategoryProvider } from '../../../../../providers/dataaccess/productCategoryProvider';
import { CampaignProvider } from '../../../../../providers/dataaccess/campaignProvider';
import { Observable } from 'rxjs';
import { Campaign } from '../../../../../interfaces/campaign';
import { FormsModule, NgForm } from '@angular/forms';
import { sharedService } from '../../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the CampaignCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign-create',
  templateUrl: 'campaign-create.html',
})
export class CampaignCreatePage {

  public productCategories: Array<string>;
  private allCampaigns: Observable<Array<Campaign>>;
  private brandCampaigns: Observable<Array<Campaign>>;
  private selectedCampaign: Observable<Campaign>;
  private logoUrl: FileList;
  private coverUrl: FileList;


  @ViewChild('campaignCreateForm') campaignCreateForm: NgForm;

  public brandName: any = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public productCategoryProvider: ProductCategoryProvider,
    public campaignProvider: CampaignProvider, public sharedService: sharedService) {
    if (this.sharedService.isLoggedIn() === false) {
      navCtrl.setRoot('default');
    }
    productCategoryProvider
      .getProductCategory()
      .subscribe(obj => this.productCategories = obj.titles);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignCreatePage');
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Image Info',
      message: 'Image Size should be less than 125mb',
      buttons: ['Dismiss']
    });
    alert.present();
  }


  onSubmit() {

  }


  public saveCampaignDetails() {
    let data = this.campaignCreateForm.value;
    this.campaignProvider.setName(data.brandName)
    .setProductName(data.productName)
    .setProductDescription(data.productDescription)
    .setProductCategory(data.productCategory)
    .setProductUrl(data.productUrl)
    .setproductMarketInformation(data.productMarketInformation)
    .setTemporarayLogoImageFile(this.logoUrl)
    .setTemporarayCoverImageFile(this.coverUrl);

    console.log('Logo Url' + JSON.stringify(this.logoUrl));
    console.log('Campaign ' + JSON.stringify(this.campaignProvider.getCampaign()));

  }


  onUploadFile(files, choice: string) {
    if (choice === 'cover-image-input') {
      this.coverUrl = files;
    } else if (choice === 'logo-image-input') {
      this.logoUrl = files;
    }
  }

  public isFormValid(){
    return this.campaignCreateForm.valid && (this.coverUrl) && (this.logoUrl);
  }
}



