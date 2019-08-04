import { sharedService } from './../../providers/sharedServices/sharedService';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  slideImgs: string[];



  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedService : sharedService) {
    
  }

  
  ionViewCanEnter(){
    return this.sharedService.isLoggedIn();
  }
  
  ngOnInit(): void {
    this.slideImgs=[
      "../../assets/imgs/slider1.jpg",
      "../../assets/imgs/slider2.jpg",
      "../../assets/imgs/slider3.jpg"
    ]
  }

  redirectWithRole(role: number){
    this.sharedService.setRole(role);
    this.navCtrl.setRoot('LoginPage');
  }

  


}
