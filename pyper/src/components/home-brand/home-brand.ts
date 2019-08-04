import { sharedService } from './../../providers/sharedServices/sharedService';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the HomeBrandComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-brand',
  templateUrl: 'home-brand.html'
})
export class HomeBrandComponent {

  text: string;
  slideImgs: Array<any>;
  constructor(public navCtrl: NavController, private sharedService: sharedService) {
    console.log('Hello HomeBrandComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.slideImgs = [{
      "img": "../../assets/imgs/slider1.jpg",
      "heading": "Brief",
      "desc": "Create a campaign brief outlining your objective"
    },

    {
      "img": "../../assets/imgs/slider2.jpg",
      "heading": "Invite",
      "desc": "Specify the type of influencers you would like to collaborate with"
    },

    {
      "img": "../../assets/imgs/slider3.jpg",
      "heading": "Browse",
      "desc": "Influencers who love your brand will submit posts for approval"
    },

    {
      "img": "../../assets/imgs/slider1.jpg",
      "heading": "Buy",
      "desc": "Buy only if you like it, reject if you don't"
    },

    {
      "img": "../../assets/imgs/slider2.jpg",
      "heading": "Measure",
      "desc": "Measure and drive better ROIs in all your campaigns"
    },

    {
      "img": "../../assets/imgs/slider3.jpg",
      "heading": "Repurpose",
      "desc": "You can also buy the content and repurpose it the way you want "
    }
    ]

  }

  setRoot(page: string) {
    this.sharedService.setRole(1);
    this.navCtrl.setRoot(page);
  }

}
