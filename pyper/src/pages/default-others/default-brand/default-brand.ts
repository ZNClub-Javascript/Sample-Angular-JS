import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../providers/sharedServices/sharedService';

/**
 * Generated class for the DefaultBrandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-default-brand',
  templateUrl: 'default-brand.html',
})
export class DefaultBrandPage {

  slideImgs: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sharedService : sharedService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.slideImgs = [
      "../../assets/imgs/defaultpage/slider1.png",
      "../../assets/imgs/defaultpage/slider2.png",
      "../../assets/imgs/defaultpage/slider3.png",
      "../../assets/imgs/defaultpage/slider4.png",
      "../../assets/imgs/defaultpage/slider5.png",
      "../../assets/imgs/defaultpage/slider6.png",
    ]

  }

  goTo(page: string) {
    this.sharedService.setRole(1);
    this.navCtrl.push(page);
  }
}
