import { CampaignProvider } from './../../../../../providers/dataaccess/campaignProvider';
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

/**
 * Generated class for the CampaignViewMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-campaign-view-main',
  templateUrl: 'campaign-view-main.html',
})
export class CampaignViewMainPage {

  public gridOptions: GridOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, public campaignProvider: CampaignProvider, public sharedService: sharedService) {
    

    this.gridOptions = <GridOptions>{
      columnDefs: this.getColumnDefs(),
      rowData: [],
      frameworkComponents: this.getFrameWorkComponents(),

      enableColResize: true,
      deltaRowDataMode: false,

      getRowNodeId: function (data) {
        return data.code;
      },
      onGridReady: () => this.fetchGridRows(),
      onRowClicked: (params) => this.navCtrl.push('CampaignViewPosts', params.data)
    }
  }

  // valueGetter: COMPUTE THE VALUE USING OTHER COLUMN VALUES/ROW PROPERTIES
  // cellRenderer: RENDER CUSTOM HTML/ VALUES INSIDE CELL
  // autoHeight: ADJUSTS ALL ROWS ACCORDING TO MAX HEIGHT OF ROW IN ENTIRE GRID
  // minWidth: DISPLAY ALL BUTTONS IN campaignActionRenderer
  getColumnDefs(): Array<any> {
    return [
      {
        headerName: 'Type',
        field: 'type',
        autoHeight: true
      },
      {
        headerName: 'Name',
        field: 'productName',
        autoHeight: true,
        pinned: 'left'
      },
      {
        headerName: 'Started on',
        valueFormatter: (params) => this.formatDateTime(params.data.publishBriefDate),
        autoHeight: true
      },
      {
        headerName: 'Ends on',
        valueFormatter: (params) => this.formatDateTime(params.data.submissionEndDate),
        autoHeight: true
      },
      {
        headerName: 'Influencers',
        valueGetter: this.getInfluencersOfCampaign,
        autoHeight: true
      },
      {
        headerName: 'Reach',
        valueGetter: this.getInfluencersOfCampaign,
        autoHeight: true
      },
      {
        headerName: 'Cost',
        valueGetter: this.getInfluencersOfCampaign,
        autoHeight: true
      },
      {
        headerName: 'Engagements',
        valueGetter: this.getInfluencersOfCampaign,
        autoHeight: true
      },
      {
        headerName: 'Actions',
        cellRenderer: "campaignActionRenderer",
        autoHeight: true,
        minWidth: 200,
        pinned: 'right'
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

  fetchGridRows(): void {
    this.campaignProvider.getCampaignsByBrandId(this.sharedService.uid)
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
    return moment(timestamp.toMillis())
      .format('YYYY/MM/DD');
  }
}