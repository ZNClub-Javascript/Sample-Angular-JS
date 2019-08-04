/*
Provider responsible for DAO operations of Brand interface
*/
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Brand } from '../../interfaces/brand';
import { sharedService } from '../sharedServices/sharedService';
import { storage } from 'firebase';
import firebase from 'firebase';



@Injectable()
export class BrandProvider {
    private brand: Brand;
    private userRef: AngularFirestoreDocument<Brand> = null;
    private brandCollectionRef: AngularFirestoreCollection = null;
    private collectionName = "brands";
    private temporaryGstUrl: File;
    private temporaryPanUrl: File;

    constructor(public afs: AngularFirestore, public sharedService: sharedService) {
        if (this.sharedService.roleId === 1) {
            this.getBrandById(this.sharedService.uid).subscribe(
                br => {
                    this.brand = br;
                    this.brand.brandUid = this.sharedService.uid;
                }
            )
            if (!this.brand) {
                this.brand = this.createEmptyBrand();
            }
        }
        // this.createTestBrand();
    }

    createEmptyBrand(): Brand {
        return {
            brandUid: "",
            aadharFileUrl: "",
            name: null,
            logoUrl: "",
            rating: 0.0,
            aboutUs: "",
            uniqueFact: "",
            products: [],
            geographies: [],
            payments: [],
            gstUrl: "",
            panUrl: "",

        };
    }

    getBrandById(uid: string): Observable<Brand> {
        return this.afs.doc<Brand>(`${this.collectionName}/${uid}`).valueChanges();
    }

    setGstUrl(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.uploadImage('gst', this.temporaryGstUrl)
                .then(url => {
                    console.log('GST Image upload completed for ' + url);
                    this.brand.gstUrl = url;
                    resolve();
                }
                )
                .catch(err => {
                    console.log('Error while uploading Gst');
                    reject(err);
                })
        }
        );

        return promise;
    }

    public setTemporarayGstImage(images) {
        if (images && images.length > 0) {
            this.temporaryGstUrl = images[0];
        }
        return this;
    }

    setPanUrl() {
        let promise = new Promise((resolve, reject) => {
            this.uploadImage('pan', this.temporaryPanUrl)
                .then(url => {
                    console.log('PAN Image upload completed for ' + url);
                    this.brand.panUrl = url;
                    resolve();
                }
                )
                .catch(err => {
                    console.log('Error while uploading Pan image');
                    reject(err);
                })
        }
        );

        return promise;
    }

    public setTemporarayPanImage(images) {
        if (images && images.length > 0) {
            this.temporaryPanUrl = images[0];
        }
        return this;
    }

    uploadImage(path: string, image): Promise<string> {
        const img = image;
        console.log('Attempting to upload image' + JSON.stringify(img));
        const logoStorage = storage().ref();
        const storagePathName = 'brands/' + path + '/' + this.brand.brandUid + '_' + this.brand.name;
        let uploadTask = logoStorage.child(storagePathName).put(img);

        let promise = new Promise<string>((resolve, reject) =>
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    // upload in progress
                    console.log(snapshot);
                },
                (error) => {
                    // upload failed
                    console.log(error);
                    reject(error);
                },
                () => {
                    // upload success
                    console.log('COMPLETED');
                    resolve(storagePathName);
                }
            ));

        return promise;
    }

    save(brand: Brand, uid: string): Promise<void> {
        if (brand != null) {
            return this.afs.doc<Brand>(`${this.collectionName}/${uid}`).set(brand);
        }
    }

    isBrandValid(): boolean {
        return (this.brand.gstUrl != undefined) && (this.brand.panUrl != undefined);
    }
    
    saveBrand(uid: string) {
        if (this.isBrandValid()) {
            this.setGstUrl()
                .then(() => this.setPanUrl()
                    .then(
                        () => {
                            console.log('Saving Brand');
                            this.afs.doc<Brand>(`${this.collectionName}/${uid}`).update({
                                gstUrl: this.brand.gstUrl,
                                panUrl: this.brand.panUrl
                            });

                            console.log('Brand Save Completed');
                        }
                    )
                );
        } else {
            console.log('Either PAN or Aadhar not uploaded');
        }
    }





}