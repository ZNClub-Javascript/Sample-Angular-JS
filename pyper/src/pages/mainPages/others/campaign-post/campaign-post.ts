import { CampaignProvider } from './../../../../providers/dataaccess/campaignProvider';
import { UtilService } from './../../../../providers/utilService/utilService';
import { Post } from './../../../../interfaces/post';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { sharedService } from '../../../../providers/sharedServices/sharedService';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, Query } from 'angularfire2/firestore';
import { Campaign } from '../../../../interfaces/campaign';
import _ from "lodash";
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'campaign-post',
  templateUrl: 'campaign-post.html'
})
export class CampaignPostPage {
  private collectionName = "posts";
  public FAILED_SAVE_MESSAGE = "Error: Could not save post due to ";
  private image: File;
  public imageDisplayUrl: string;
  campaign: Campaign;
  post: Post;
  isInfluencer: boolean;
  isBrand: boolean;

  constructor(public navCtrl: NavController, private navParams: NavParams, private UtilService: UtilService, private sharedService: sharedService, private afs: AngularFirestore, private campaignProvider: CampaignProvider) {
    this.campaign = navParams.get('campaign');
    this.post = navParams.get('post');
    console.log('Post ' + JSON.stringify(this.post));
    this.initPost();
    this.isBrand = this.sharedService.isUserABrand();
    this.isInfluencer = this.sharedService.isUserAnInfluencer();
  }


  initPost(): any {
    //TODO if null then throw error


    if (this.sharedService.isUserABrand()) {
      //display Image for that post
      this.UtilService.readImage(this.post.imageUrl)
      .then(url => this.imageDisplayUrl  = url);

    } else if (this.sharedService.isUserAnInfluencer()) {
      if (this.campaign != null) {
        this.post = {
          brandUid: this.campaign.brandUid,
          campaignUid: this.campaign.productName,
          influencerUid: this.sharedService.uid,
          imageUrl: '',
          caption: '',
          reach: 0,
          createdDate: new Date(),
          approvedOrDeclinedDate : null,
          publishedDate: null,
          status: 1
        }
      } else {
        console.error("ERROR: no Campaigns to process");
      }

    }

    

  }

  approve() {
    this.post.status = 2;
    this.updateStatusToFirebase(this.post.status);
  }

  decline() {
    this.post.status = 3;
    this.updateStatusToFirebase(this.post.status);
  }

  publish() {
    //validate
    if (this.isInfluencerPostUploadValid()) {
      //persist
      this.save();
      this.goToInfluencerHome();

    } else {
      console.error("could not execute onSave");
    }

    //hide edit options

    //confirm

  }

  onUploadFile(event) {
    let images = event.srcElement.files;
    if (!_.isEmpty(images)) {
      this.image = images[0];
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imageDisplayUrl = event.target["result"];
      }
      reader.readAsDataURL(this.image);
    }


  }

  save(): any {
    try {
      this.setImageUrl()
        .then(() => {
          this.saveToFirebase();

        }, (error) => {
          console.log("Error: could not upload logo due to " + JSON.stringify(error));
        })

      //return result;
    } catch (error) {
      console.error(this.FAILED_SAVE_MESSAGE + error);
    }
  }

  //Firestore functions
  saveToFirebase() {
    console.log("trying to save to firestore db");
    console.log('post ' + JSON.stringify(this.post));
    console.log(JSON.stringify(<Post>this.UtilService.getObject(this.post)));
    const result = this.afs.collection<Post>(`${this.collectionName}`).add(this.post);
    console.log("saved to db " + result);
  }



  findFirebaseRef(): AngularFirestoreCollection<Post> {
    /**
     * use a combination of the following to find the correct post to be manipulated
     * 1) brandUid
     * 2) campaignUid
     * 3) createdDate
     * 4) influencerUid
     * 
     * assuming imageUrl =  posts/brandUid_campaignUId_by_influencerUid/createdDate
     * we can use fetchId = imageUrl
     */

    //TODO test - dont hardcode imageUrl
    return this.afs.collection<Post>(`${this.collectionName}`,
      ref => ref.where('imageUrl', '==', this.post.imageUrl)
    )

  }

  getFirebasePostDocs(postFirebaseCollectionRef: AngularFirestoreCollection<Post>): Observable<Object> {
    return postFirebaseCollectionRef.snapshotChanges().pipe(
      map(actions => actions.map(
        a => {
          const id = a.payload.doc.id;
          return { id }
        }
      ))
    );
  }

  updateStatusToFirebase(status: number) {
    let postFirebaseCollectionRef = this.findFirebaseRef();

    let postIds = this.getFirebasePostDocs(postFirebaseCollectionRef);

    postIds.subscribe(
      postId => {
        console.log('Trying to update post ' + JSON.stringify(this.post));
        try {
          this.afs.doc<Post>(`${this.collectionName}/` + postId[0].id).update({ status: this.post.status });
        } catch (error) {
          console.error(this.FAILED_SAVE_MESSAGE + error);
        }
      }
    )

  }

  //FireStorage functions
  setImageUrl(): Promise<any> {

    let promise = new Promise((resolve, reject) => {
      if (this.post.imageUrl == null) {
        resolve();
      }
      const rootDirectory = 'posts';
      const directory = this.post.brandUid + '_' + this.post.campaignUid + "_by_" + this.post.influencerUid;
      const filename = moment(this.post.createdDate).format('YYYYMMDD_HHmmss');
      //TODO check the naming convention for multiple posts for the given campaign by same influencer
      this.UtilService.uploadImage(rootDirectory, directory, this.image, filename)
        .then(url => {
          this.post.imageUrl = url;
          resolve();
        }
        )
        .catch(err => {
          console.log('Error while uploading logo');
          reject(err);
        })
    }
    );
    return promise;
  }



  //check functions
  isInfluencerPostUploadValid() {
    return !_.isEmpty(this.imageDisplayUrl) && !_.isEmpty(this.post.caption);
  }

  isValid(): boolean {
    return true;
  }

  isPending(): boolean {
    return this.post.status == 1;
  }

  //nav functions
  goToInfluencerHome() {
    this.navCtrl.setRoot("InfluencerHomePage");
  }

}
