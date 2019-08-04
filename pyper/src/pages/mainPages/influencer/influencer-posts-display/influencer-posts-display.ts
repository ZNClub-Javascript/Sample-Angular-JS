import { sharedService } from './../../../../providers/sharedServices/sharedService';
import { PostProvider } from './../../../../providers/dataaccess/postProvider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../../../interfaces/post';

/**
 * Generated class for the InfluencerPostsDisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-influencer-posts-display',
  templateUrl: 'influencer-posts-display.html',
})
export class InfluencerPostsDisplayPage {
  status : number;
  posts : Array<Post>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postProvider : PostProvider) {
    this.status = navParams['data'];
    
    this.postProvider.getMyPostsByStatus(this.status)
    .subscribe(
      posts => {
        console.log('posts by provider ' + posts);
        this.posts = posts
      }
    );

  }


}
