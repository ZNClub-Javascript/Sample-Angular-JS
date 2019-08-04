import { sharedService } from './../sharedServices/sharedService';

/*
Provider responsible for DAO operations of Campaign interface
*/

import { Observable, merge, combineLatest } from 'rxjs';
import { filter, map, observeOn } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, Query } from 'angularfire2/firestore';
import { Campaign } from '../../interfaces/campaign';
import { storage } from 'firebase';
import firebase from 'firebase';
import { Influencer } from '../../interfaces/influencer';
import _ from "lodash";
import { Post } from '../../interfaces/post';

@Injectable()
export class PostProvider {
    private collectionName = "posts";
    public FAILED_SAVE_MESSAGE = "Error: Could not save campaign due to ";
    private post: Post;

    constructor(public afs: AngularFirestore, public sharedService: sharedService) {
    }

    /*
    DAO Operations
    */
    getPostsByBrandId(brandUid: string): Observable<Array<Post>> {
        return this.afs.collection<Post>(`${this.collectionName}`,
            ref => ref.where('brandUid', '==', brandUid)
        )
            .valueChanges();
    }

    getPostsByInfluencerId(influencerUid: string): Observable<Array<Post>> {
        return this.afs.collection<Post>(`${this.collectionName}`,
            ref => ref.where('influencerUid', '==', influencerUid)
        )
            .valueChanges();
    }

    getPostsByCampaignId(campaignUid: string): Observable<Array<Post>> {
        return this.afs.collection<Post>(`${this.collectionName}`,
            ref => ref.where('campaignUid', '==', campaignUid)
        )
            .valueChanges();
    }

    getPostsByStatus(status: number): Observable<Array<Post>> {
        return this.afs.collection<Post>(`${this.collectionName}`,
            ref => ref.where('status', '==', status)
        )
            .valueChanges();
    }

    getMyPostsByStatus(status: number): Observable<Array<Post>> {
        console.log('influencer id is ' + this.sharedService.uid);
        return this.afs.collection<Post>(`${this.collectionName}`,
            ref => ref.where('influencerUid','==',this.sharedService.uid).where('status', '==', status)
        )
            .valueChanges();
    }

    getBrandPostsByStatus(status: number): Observable<Array<Post>> {
        console.log('influencer id is ' + this.sharedService.uid);
        return this.afs.collection<Post>(`${this.collectionName}`,
            ref => ref.where('brandUid','==',this.sharedService.uid).where('status', '==', status)
        )
            .valueChanges();
    }

    getAllPosts(): Observable<Array<Post>> {
        return this.afs.collection<Post>(`${this.collectionName}`).valueChanges();
    }

}