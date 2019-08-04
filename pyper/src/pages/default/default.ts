import { sharedService } from './../../providers/sharedServices/sharedService';

import { Component, OnInit, Input } from '@angular/core';
import { NavController, IonicPage, PopoverController, Platform } from 'ionic-angular';
import { HomepopoverPage } from '../others/homepopover/homepopover';

/**
 * Generated class for the DefaultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-default',
  templateUrl: 'default.html',
})
export class DefaultPage implements OnInit {


  @Input()
  isLoggedIn: boolean = false;
  slideImgs: Array<string>;

  pageIndex: number;

  constructor(public navCtrl: NavController, public platform: Platform, public sharedService: sharedService) {
    this.pageIndex = 1;

  }

  setRoot(page: string) {
    this.navCtrl.setRoot(page);
  }


  ngOnInit(): void {
    this.slideImgs = [
      "../../assets/imgs/defaultpage/slider1.png",
      "../../assets/imgs/defaultpage/slider2.png",
      "../../assets/imgs/defaultpage/slider3.png",
      "../../assets/imgs/defaultpage/slider4.png",
      "../../assets/imgs/defaultpage/slider5.png",
      "../../assets/imgs/defaultpage/slider6.png",
    ]
  }




  isPageActive(num: number) {
    return this.pageIndex === num;
  }

  isBrowser() {
    let value = this.platform.is('core') && !this.platform.is('mobile') && !this.platform.is('mobileweb') && (this.platform.width() > 500);
    return value;
  }

  getActiveName() {
    return this.navCtrl.getActive().name;
  }

  goTo(name: string) {
    switch (name) {
      case 'DefaultBrandPage': this.sharedService.setRole(1);
        break;
      case 'DefaultInfluencerPage': this.sharedService.setRole(2);
        break;
    }
    this.navCtrl.setRoot(name);
  }
}
