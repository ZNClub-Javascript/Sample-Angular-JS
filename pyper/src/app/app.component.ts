import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, IonicPage, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';
import { sharedService } from '../providers/sharedServices/sharedService';
import { InfluencerProvider } from '../providers/dataaccess/influencerProvider';
import _ from "lodash";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title:string,component: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthProvider, private sharedService: sharedService, private influencerProvider : InfluencerProvider) {
    this.initializeApp();

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.managePostSignIn();
        } else {
          this.rootPage = 'DefaultPage';
        }
      },
      () => {
        this.rootPage = 'DefaultPage';
      }
    );
  }

  //TODO move to shared service
  managePostSignIn() {
    localStorage.setItem('loggedIn','true');
    this.goToUserHomePage();
  }

  
  goToUserHomePage() {
    if (this.sharedService.isUserABrand()) {
      //brand
      this.rootPage = 'HomePage';

    } else if (this.sharedService.isUserAnInfluencer()) {
      //influencer
      //get the influencer
      this.influencerProvider.getInfluencerById(this.sharedService.uid)
      .subscribe( influencers => {
        /**
         * if there are no influncers, try to create one 
         */
        if(_.isEmpty(influencers)){
          //there is no influencer created already
          //Do nothing as it may have directly redirected to default Page earlier
        } else {
          //check if the influencer has age, gender, interests
          let influencer = influencers[0];
          if(!this.influencerProvider.hasBasicDetails(influencer)){
            //todo need to fix this
            this.influencerProvider.influencer = influencer;
            this.rootPage = 'InfluencerBasicDetails' ;
          }else{
            this.rootPage = 'InfluencerMainPage';            
          }
          
        }
      }, () => {
        console.error('Error: Could not retrieve influencer details.');
        this.rootPage = 'InfluencerMainPage';
      });
      // this.navCtrl.setRoot('InfluencerHomePage');
    }
  }

}
