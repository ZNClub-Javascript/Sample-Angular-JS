import { UtilService } from './../../../../providers/utilService/utilService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { sharedService } from '../../../../providers/sharedServices/sharedService';
import { PostProvider } from '../../../../providers/dataaccess/postProvider';
import { Post } from '../../../../interfaces/post';
import * as moment from 'moment';
/**
   * This Page is used to display notifications to both brand and influencer
   * Brand must be notified when influencer either 'creates' or 'publishes'
   * Influencer must be notified when brand either 'approves' or 'rejects'
   */

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  

  items: any[] = [];
  posts: Post[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public sharedService: sharedService, private postProvider: PostProvider, private utilService : UtilService) {
    if (this.sharedService.isUserABrand()) {
      this.populateItemsForBrand();
    }
    if(this.sharedService.isUserAnInfluencer()){
      this.populateItemsForInfluencer();
    }
    

  }

  populateItemsForInfluencer(){
    this.postProvider.getPostsByInfluencerId(this.sharedService.uid)
      .subscribe(posts => {
        this.posts = posts.filter(post => post.status === 2 || post.status === 3);
        this.createItems();
      });
  }

  populateItemsForBrand() {

    
    this.postProvider.getPostsByBrandId(this.sharedService.uid)
      .subscribe(posts => {
        this.posts = posts.filter(post => post.status === 1 || post.status === 4);
        this.createItems();
      });

    

  }

  createItems() {
    

    this.items = this.posts.map(post => {
      let item = {
        img: post.imageUrl,
        title: post.caption,
        date: post.createdDate
      }
      this.utilService.readImage(post.imageUrl).then(
        url => item.img = url
      )
      switch (post.status) {
        case 1: item.title = post.influencerUid + ' submitted their post \'' + post.caption + '\' for ' + post.campaignUid + '.'; break;
        case 4: item.title = post.influencerUid + ' published their post \'' + post.caption + '\' for ' + post.campaignUid + '.'; break;
        case 2: item.title = post.brandUid + ' approved your post \'' + post.caption + '\' for ' + post.campaignUid + '.'; break;
        case 3: item.title = post.brandUid + ' declined your post \'' + post.caption + '\' for ' + post.campaignUid + '. Try Again '; break;
        default: 
      }

      return item;
    })

    this.items = this.items.sort((left, right) => {return moment.utc(left.timeStamp).diff(moment.utc(right.timeStamp))});

  }
  ionViewCanEnter() {
    return this.sharedService.isLoggedIn();
  }

  test(item) {
    alert('item ' + JSON.stringify(item));
  }


}
