import { CampaignProvider } from '../../../../../providers/dataaccess/campaignProvider';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../../../providers/sharedServices/sharedService';
import * as moment from 'moment';
import { GridOptions } from 'ag-grid-community';
import { CampaignActionRenderer } from '../../../../../components/ag-grid-renderer/campaign-action-renderer/campaign-action-renderer';
import { Influencer } from '../../../../../interfaces/influencer';
import { merge, concat, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import _ from "lodash";
import { PostProvider } from '../../../../../providers/dataaccess/postProvider';
import { Campaign } from '../../../../../interfaces/campaign';

/**
 * Generated class for the CampaignViewPosts page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign-view-posts',
  templateUrl: 'campaign-view-posts.html',
})
export class CampaignViewPosts {
  private campaign : Campaign;
  public gridOptions: GridOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postProvider: PostProvider, public sharedService: sharedService) {
    if (this.sharedService.isLoggedIn() === false) {
      navCtrl.setRoot('default');
    }
    this.campaign = navParams['data'];

    this.gridOptions = <GridOptions>{
      columnDefs: this.getColumnDefs(),
      rowData: [],
      frameworkComponents: this.getFrameWorkComponents(),

      enableColResize: true,
      deltaRowDataMode: false,

      getRowNodeId: function (data) {
        return data.code;
      },
      onGridReady: () => this.fetchGridRows(this.campaign),
      onRowClicked: (params) => this.navCtrl.push('CampaignPostPage', {'post' : params.data})
    }
  }

  // valueGetter: COMPUTE THE VALUE USING OTHER COLUMN VALUES/ROW PROPERTIES
  // cellRenderer: RENDER CUSTOM HTML/ VALUES INSIDE CELL
  // autoHeight: ADJUSTS ALL ROWS ACCORDING TO MAX HEIGHT OF ROW IN ENTIRE GRID
  // minWidth: DISPLAY ALL BUTTONS IN campaignActionRenderer
  getColumnDefs(): Array<any> {
    return [
      {
        headerName: 'Influencer',
        //TODO Get Influencer Name
        field: 'influencerUid',
        autoHeight: true,
        pinned: 'left'
      },
      {
        headerName: 'Status',
        field: 'status',
        autoHeight: true,
      },
      {
        headerName: 'Posted on',
        valueFormatter: (params) => this.formatDateTime(params.data.createdDate),
        autoHeight: true
      },
      {
        headerName: 'Reach',
        valueGetter: this.getInfluencersOfCampaign,
        autoHeight: true
      }
    ];
  }

  getFrameWorkComponents(): any {
    return {
      'campaignActionRenderer': CampaignActionRenderer
    };
  }

  setGridRows(rows, api): void {
    api.setRowData(rows);
    api.sizeColumnsToFit();
    api.refreshCells();
  }

  fetchGridRows(campaign: Campaign): void {

    this.postProvider.getPostsByCampaignId(campaign.productName)
      .subscribe(
        rows => {
          if (this.gridOptions.api) {
            this.setGridRows(rows, this.gridOptions.api);
          }
        }
      );
  }

  displayRowsForCampaigns(rows : any[], sortBy : string[]){
    
    if (sortBy.length > 0)
      rows = _.sortBy(rows, sortBy);
    if (this.gridOptions.api) {
      this.setGridRows(rows, this.gridOptions.api);
    }
    
}
  ionViewCanEnter() {
    return this.sharedService.isLoggedIn();
  }

  getInfluencersOfCampaign(params: any): any {
    return 0;
  }
  //TODO: UTILITY move to util service
  formatDateTime(timestamp: any) {
    if (typeof timestamp == 'string') {

      return moment(Date.parse(timestamp))
        .format('YYYY/MM/DD');

    } else if (typeof timestamp == 'object') {
      return moment(timestamp.toMillis())
        .format('YYYY/MM/DD');
    }
  }
}