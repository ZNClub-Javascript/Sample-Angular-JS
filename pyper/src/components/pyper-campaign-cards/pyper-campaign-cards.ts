import { UtilService } from './../../providers/utilService/utilService';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PyperCampaignCardsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-campaign-cards',
  templateUrl: 'pyper-campaign-cards.html'
})
export class PyperCampaignCardsComponent implements OnChanges {
  

  @Input('campaigns') campaigns : any[];
  data : any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private utilService : UtilService) {
    
  }

  goToCampaignDetail(campaign: any) {
    this.navCtrl.push('InfluencerDetailPage', campaign);
  }

  ngOnChanges(){
    this.data = this.campaigns.map(
      dataElement => {
        let obj = {
          'imageUrl' :'',
          'title' : dataElement.data.productName,
          'subtitle' : dataElement.data.productDescription,
          'socialMedia' : dataElement.socialMedia,
          'id': dataElement.data.brandUid + '_' + dataElement.data.productName
        };
        this.utilService.readImage(dataElement.data.coverImageUrl).then(
          url => obj.imageUrl = url
        );
        return obj;
      }
    )
  }

  goToCampain(event){
      let campaignToClick = this.campaigns.filter(
        campaign =>{
          const id = campaign.data.brandUid+'_'+campaign.data.productName;
          return (event == id);
        } 
      )[0];


     this.goToCampaignDetail(campaignToClick);
  }
}
