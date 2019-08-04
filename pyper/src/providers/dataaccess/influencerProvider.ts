/*
Provider responsible for DAO operations of Influencer interface
*/
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Influencer } from '../../interfaces/influencer';
import { sharedService } from '../sharedServices/sharedService';
import { storage } from 'firebase';
import firebase from 'firebase';
import { NumberFloatingFilterComp } from 'ag-grid-community/dist/lib/filter/floatingFilter';
import { map } from 'rxjs/operators';



@Injectable()
export class InfluencerProvider {

    influencer: Influencer;
    collectionName = "influencers";

    constructor(public afs: AngularFirestore, public sharedService: sharedService) {

    }

    getInfluencerById(influencerUid: string): Observable<Array<Influencer>> {
        return this.afs.collection<Influencer>(`${this.collectionName}`,
            ref => ref
                .where('influencerUid', '==', influencerUid)
        ).valueChanges();
        // return Observable.of(this.createEmptyInfluencer());
    }

    async createNewInfluencer(): Promise<firebase.firestore.DocumentReference> {
        //todo complete all the fields 
        let influencer = this.createEmptyInfluencer();
        influencer.influencerUid = this.sharedService.uid;
        influencer.name = this.sharedService.name ? this.sharedService.name : 'DemoUser';
        influencer.email = this.sharedService.email ? this.sharedService.email : 'pyper@gmail.com';
        influencer.photoUrl = this.sharedService.photoUrl ? this.sharedService.photoUrl : '';
        let prom = await this.saveInfluencer(influencer);
        if (prom)
            return prom;
        else {
            console.error('Error while creating Influencer');
            return null;
        }
    }

    public createEmptyInfluencer(): Influencer {
        return {
            email: null,
            influencerUid: null,
            age: null,
            name: null,
            photoUrl: null,
            gender: null,
            interests: null,
            regions: null
        };
    }

    updateInfluencer(influencer: Influencer) {

        this.afs.doc<Influencer>(`${this.collectionName}/${influencer.influencerUid}`).update({
            age: influencer.age,
            gender: influencer.gender,
            interests: influencer.interests
        });
        console.log('Influencer update Completed');
    }

    async saveInfluencer(influencer: Influencer) {
        try {
            const result = await this.afs.collection<Influencer>(`${this.collectionName}`)
                .add(influencer);
            console.log("Influencer saved to db " + result);
            return result;
        } catch (error) {
            console.error('Error while saving influencer to db');
            return null;
        }
    }


    updateToFirebase(influencer: Influencer) {
        let postFirebaseCollectionRef = this.findFirebaseRef(influencer);

        let postIds = this.getFirebasePostDocs(postFirebaseCollectionRef);

        postIds.subscribe(
            influencerUid => {
                console.log('Trying to update influencer' + JSON.stringify(influencer));
                try {
                    this.afs.doc<Influencer>(`${this.collectionName}/` + influencerUid[0].id).set(influencer);

                } catch (error) {
                    console.error(
                        'Failed to update influencer due to ' + error
                    );
                }
            }
        )

    }

    getFirebasePostDocs(postFirebaseCollectionRef: AngularFirestoreCollection<Influencer>): Observable<Object> {
        return postFirebaseCollectionRef.snapshotChanges().pipe(
            map(actions => actions.map(
                a => {
                    const id = a.payload.doc.id;
                    return { id }
                }
            ))
        );
    }

    findFirebaseRef(influencer: Influencer): AngularFirestoreCollection<Influencer> {
        return this.afs.collection<Influencer>(`${this.collectionName}`,
            ref => ref.where('influencerUid', '==', influencer.influencerUid)
        )

    }

    hasBasicDetails(influencer: Influencer) {
        return influencer.age && influencer.gender && influencer.interests
    }
}