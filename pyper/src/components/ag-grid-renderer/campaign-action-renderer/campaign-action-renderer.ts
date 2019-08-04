import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'campaign-action-cell',
    templateUrl: 'campaign-action-renderer.html' 
})
export class CampaignActionRenderer implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any) {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
    }
    
    afterGuiAttached(params: any) {
    }

    onRepeat(){
        console.log('This is '+this.params.data.productName);
    }

    onView(){
        console.log('This is '+this.params.data.productName);
        // this.navCtrl.push(CampaignViewInfluencerPage, { row: campaign.data })
    }
}