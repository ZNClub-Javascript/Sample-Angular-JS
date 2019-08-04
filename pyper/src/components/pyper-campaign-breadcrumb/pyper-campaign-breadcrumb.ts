import { sharedService } from './../../providers/sharedServices/sharedService';
import { CampaignProvider } from './../../providers/dataaccess/campaignProvider';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the PyperCampaignBreadcrumbComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-campaign-breadcrumb',
  templateUrl: 'pyper-campaign-breadcrumb.html'
})
export class PyperCampaignBreadcrumbComponent {

  @Input('currentPageIndex') currentPageIndex : number;

  constructor(public campaignProvider: CampaignProvider, public sharedService : sharedService) {

  }

  isInfluencer(){
    return this.campaignProvider.getType() === this.sharedService.INFLUENCER_CAMPAIGN;
  }
}
