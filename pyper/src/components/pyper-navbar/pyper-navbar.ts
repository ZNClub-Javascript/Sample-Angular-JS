import { Component, Input } from '@angular/core';
import { PopoverController, NavController, Platform } from 'ionic-angular';
import { HomepopoverPage } from '../../pages/others/homepopover/homepopover';
import { sharedService } from '../../providers/sharedServices/sharedService';

/**
 * Generated class for the PyperNavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-navbar',
  templateUrl: 'pyper-navbar.html'
})
export class PyperNavbarComponent {

  @Input('isLoggedIn') isLoggedIn: boolean = false;
  isBrand : boolean;
  isInfluencer : boolean;


  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public platform : Platform,private sharedService : sharedService ) {
    this.isBrand = sharedService.isUserABrand();
    this.isInfluencer = sharedService.isUserAnInfluencer();
    this.isLoggedIn = sharedService.isLoggedIn();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(HomepopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  setRoot(page : string){
    this.navCtrl.setRoot(page);
  }

  isPageActive(pageName : string){
    return pageName === this.getActiveName();
  }

  getActiveName(){
    return this.navCtrl.getActive().name;
  }

  isBrowser(){
    let value = this.platform.is('core') && !this.platform.is('mobile') && !this.platform.is('mobileweb') && (this.platform.width() > 500);
    return value;
  }
}
