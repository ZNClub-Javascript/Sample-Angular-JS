import { sharedService } from './../../../providers/sharedServices/sharedService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DefaultInfluencerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-default-influencer',
  templateUrl: 'default-influencer.html',
})
export class DefaultInfluencerPage {

  slideImgs: Array<string>;
  slideImgsAndDesc: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService : sharedService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.slideImgs = [
      "../../../assets/imgs/influencers/slider1.png",
      "../../../assets/imgs/influencers/slider2.png",
      "../../../assets/imgs/influencers/slider3.png",
    ]

    this.slideImgsAndDesc = [{
      "img": "../../assets/imgs/slider1.jpg",
      "heading": "Explore",
    },

    {
      "img": "../../assets/imgs/slider2.jpg",
      "heading": "Understand",
    },

    {
      "img": "../../assets/imgs/slider3.jpg",
      "heading": "Create",
    },

    {
      "img": "../../assets/imgs/slider1.jpg",
      "heading": "Publish",
    },

    {
      "img": "../../assets/imgs/slider2.jpg",
      "heading": "Earn",
    }
    ]

  }

  goTo(page: string) {
    this.sharedService.setRole(2);
    this.navCtrl.push(page);
  }

  goToPage(page: string){
    this.navCtrl.push(page);
  }

}
