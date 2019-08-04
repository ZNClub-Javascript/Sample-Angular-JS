import { sharedService } from './../../providers/sharedServices/sharedService';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the HomeInfluencerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-influencer',
  templateUrl: 'home-influencer.html'
})
export class HomeInfluencerComponent {

  slideImgs: Array<string>;
  slideImgsAndDesc: Array<any>;

  constructor(public navCtrl: NavController, private sharedService: sharedService) {
    console.log('Hello HomeInfluencerComponent Component');
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.slideImgs = [
      "../../assets/imgs/slider1.jpg",
      "../../assets/imgs/slider2.jpg",
      "../../assets/imgs/slider3.jpg"
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

  setRoot(page: string) {
    this.sharedService.setRole(2);
    this.navCtrl.setRoot(page);
  }
  
}
