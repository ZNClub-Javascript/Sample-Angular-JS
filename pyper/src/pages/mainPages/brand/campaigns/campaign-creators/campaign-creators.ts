import { CampaignProvider } from './../../../../../providers/dataaccess/campaignProvider';
import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BrandProvider } from '../../../../../providers/dataaccess/brandProvider';
import { sharedService } from '../../../../../providers/sharedServices/sharedService';

/**
 * Generated class for the CampaignCreatorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign-creators',
  templateUrl: 'campaign-creators.html',
})
export class CampaignCreatorsPage {
  

  @ViewChild('campaignCreatorsform') campaignCreatorsform : NgForm;


  agegroup: any = { lower: 18, upper: 60 };
  male:boolean = false;
  female: boolean = false;
  regions = [];
  formRegion : string;
  image: string[];
  title: string[];
  cols : Array<{image: string , title : string}>;
  interests : any[];
  

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public campaignprovider : CampaignProvider , public brandprovider : BrandProvider, public sharedService: sharedService) {
    if(this.sharedService.isLoggedIn() === false){
      navCtrl.setRoot('default');
  }
    this.populateImages();
    this.interests = [];
    console.log(this.cols);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignCreatorsPage');
  }

  populateImages(): any {
    this.image =  ['assets/categories/animal.jpg', 'assets/categories/automative.jpg','assets/categories/beauty_and_personal_care.jpg'
                  ,'assets/categories/business_finance_and_insurance.jpg','assets/categories/children_and_family.jpg','assets/categories/education_and_books.jpg'
                  ,'assets/categories/entertainment_and_movies.jpg','assets/categories/fashion.jpg','assets/categories/food_and_drinks.jpg'
                  ,'assets/categories/health_fitness_and_sport.jpg','assets/categories/home_and_garden.jpg','assets/categories/photography_art_and_design.jpg'
                  ,'assets/categories/restaurant_bar_and_hotel.jpg'
                  ,'assets/categories/social_media_web_and_technology.jpg'
                  ,'assets/categories/technology_products.jpg'
                  ,'assets/categories/travel.jpg'];
    this.title =  ['Animal', 'Automative', 'Beauty and Personal Care','Business Finance and Insurance'
                  , 'Children and Family', 'Education and Books','Entertainment and Movies'
                  , 'Fashion', 'Food and Drinks','Health, Fitness and Sports', 'Home and Garden'
                  , 'Photography, Arts and Dance', 'Restaurants, Bar and Hotel', 'Social Media Web and Technology'
                  ,'Technology Products', 'Travel'];
    this.cols = [];
    for (let i = 0; i < this.image.length; i++) {
      this.cols.push({
        title: this.title[i],
        image: this.image[i]
      });
    }
  }
 
  addToRegions(){
    let data = this.campaignCreatorsform.value;
    this.regions.push(data.regions);
    this.formRegion = null;
  }
  
  deleteRegion(msg: string){ 
    const index: number = this.regions.indexOf(msg);
    if (index !== -1) {
        this.regions.splice(index, 1);
    } 
  }
  

  saveCampaignDetails(){

    let data = this.campaignCreatorsform.value;
    this.campaignprovider.setFilter(
      {
        minimumAge: this.agegroup.lower,
        maximumAge: this.agegroup.upper,
        gender: {
          male:this.male,
          female:this.female
        },
        regions: this.regions,
        interests: this.interests

      }
    )
  }

  public isFormValid(){
    return this.campaignCreatorsform.valid && (this.regions.length > 0);
  }
}
