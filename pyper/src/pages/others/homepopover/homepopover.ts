import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../../providers/auth/auth';
import { sharedService } from '../../../providers/sharedServices/sharedService';

/**
 * Generated class for the HomepopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  template: `
    <ion-item *ngIf="loggedIn"  (click)="logOut()">Log Out</ion-item>
    <ion-item *ngIf="!loggedIn"  (click)="logInAsBrand()">Log In As Brand</ion-item>
    <ion-item *ngIf="!loggedIn"  (click)="logInAsInfluencer()">Log In As Influencer</ion-item>
    `
})
export class HomepopoverPage {

  loggedIn : boolean;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public auth: AuthProvider, public sharedService: sharedService) {
    this.loggedIn = this.sharedService.isLoggedIn();
  }


  close() {
    this.viewCtrl.dismiss();
  }

  logOut() {
    this.close();
    this.auth.signOut()
      .then(
        () => this.navCtrl.setRoot('DefaultPage'),
        (error) => {
          console.error("Error: Sign Out error due to " + error);
          this.navCtrl.setRoot('DefaultPage')
        });
    
  }

  logInAsBrand() {
    this.close();
    this.sharedService.setRole(1);
    this.navCtrl.setRoot('LoginPage');
  }

  logInAsInfluencer() {
    this.close();
    this.sharedService.setRole(2);
    this.navCtrl.setRoot('LoginPage');
  }
}
