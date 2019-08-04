import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

/**
 * Generated class for the PyperMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-menu',
  templateUrl: 'pyper-menu.html'
})
export class PyperMenuComponent {
  @ViewChild(Nav) navCtrl: Nav;

  pages: Array<{title:string,component: string}>;

  constructor() {
    console.log('Hello PyperMenuComponent Component');
    this.pages = [
      { "title":"Home", "component": 'HomePage'},
      { "title":"Create", "component": 'CreatePage'},
      { "title":"My Campaigns", "component" : 'CampaignViewMainPage'},
      { "title":"Post", "component": 'PostPage'},
      { "title":"Inbox", "component": 'InboxPage'},
      { "title":"Account", "component": 'AccountPage'},
      
    ];
  }

  openPage(page){
    this.navCtrl.setRoot(page.component);
  }

}
