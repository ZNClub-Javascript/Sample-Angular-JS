import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { UtilService } from '../../../../providers/utilService/utilService';
import { Influencer } from '../../../../interfaces/influencer';
import { InfluencerProvider } from '../../../../providers/dataaccess/influencerProvider';
import _ from "lodash";

@IonicPage()
@Component({
    selector: 'influencer-basic-details',
    templateUrl: 'influencer-basic-details.html'
})
export class InfluencerBasicDetails {

    @ViewChild(Slides) slides: Slides;

    cols: Array<{ image: string, title: string }>;
    influencer: Influencer;
    influencerDetail = 'age';

    constructor(private navCtrl: NavController, private navParams: NavParams, private utilService: UtilService, private influencerProvider: InfluencerProvider) {
        this.cols = utilService.getAllInterests();
        //todo check if everytime it gets the influencer from navparams
        this.influencer = navParams['data'];
        if(!this.influencer.influencerUid){
            this.influencer = this.influencerProvider.influencer;
        }
        if(this.influencer.age != null){
            this.influencer.age = 18;
        }
        if (_.isEmpty(this.influencer.interests)) {
            this.influencer.interests = [];
        }
    }

    goToSlide() {
        this.slides.slideTo(2, 500);
    }

    isValid(){
        return this.influencer 
        && this.influencer.age 
        && this.influencer.gender 
        && !_.isEmpty(this.influencer.interests);
    }
    updateDetails() {

        try{
            this.influencerProvider.updateToFirebase(this.influencer);
            this.navCtrl.setRoot('InfluencerMainPage');
        }
        catch(error){
            console.error('Error while updating influencer');
        }
    }

}