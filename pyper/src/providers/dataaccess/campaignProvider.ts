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

@Injectable()
export class CampaignProvider {
    private collectionName = "campaigns";
    public INVALID_INFLUENCER_CAMPAIGN_MESSAGE = 'Warning: Unable to assign filter. Please set Campaign Type as INFLUENCER.';
    public INVALID_CAMPAIGN_MESSAGE = 'Warning: Cannot create Campaign without valid brand Uid and type.';
    public FAILED_SAVE_MESSAGE = "Error: Could not save campaign due to ";
    private campaign: Campaign;
    private temporaryLogoFile: File;
    private temporaryCoverFile: File;
    private temporaryDreamBoardFiles = [];
    public temporaryCoverImageSrc;
    public temporaryLogoImageSrc;
    public temporaryDreamboardImagesSrc = [];

    constructor(public afs: AngularFirestore, public sharedService: sharedService) {
        this.campaign = this.createEmptyCampaign();
    }
    /*
    Object Builder setters
    */
    createEmptyCampaign(): Campaign {
        return {
            brandUid: null,
            // sharedService.getUid,
            type: null,
            filter: null,
            name: null,
            logoUrl: null,
            coverImageUrl: null,
            productName: null,
            productDescription: null,
            productCategory: null,
            productUrl: null,
            productMarketInformation: null,
            socialMedia: null,
            dreamboardImageUrls: [],
            contentType: null,
            specification: null,
            dos: null,
            donts: null,
            cost: null,
            publishBriefDate: new Date(),
            submissionEndDate: new Date()
        };
    }

    setBrandUid(brandUid) {
        this.campaign.brandUid = brandUid;
        return this;
    }

    setType(type) {
        this.campaign.type = type;
        return this;
    }

    getType() {
        return this.campaign.type;
    }

    setFilter(filter) {
        if (this.campaign.type == this.sharedService.INFLUENCER_CAMPAIGN) {
            this.campaign.filter = filter;
        } else {
            console.error();
        }
        return this;
    }

    setName(name) {
        this.campaign.name = name;
        return this;
    }

    setLogoUrl(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            this.uploadImage('campaigns','logo', this.temporaryLogoFile, this.campaign.brandUid + '_' + this.campaign.name)
                .then(url => {
                    console.log('logo upload completed for ' + url);
                    this.campaign.logoUrl = url;
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

    setTemporarayLogoImageFile(images) {
        if (images && images.length > 0) {
            this.temporaryLogoFile = images[0];
            this.setTemporaryLogoImageSrc(this.temporaryLogoFile);
        }
        return this;
    }


    setTemporaryLogoImageSrc(file) {
        console.log('Loading Logo Image' + JSON.stringify(file));
        if (file) {
            console.log('File is present')
            let reader = new FileReader();
            reader.onload = (event) => {
                this.temporaryLogoImageSrc = event.target["result"];
                console.log('URL is ' + this.temporaryLogoImageSrc);
            }
            reader.readAsDataURL(file);
        }
    }

    setCoverImageUrl() {
        let promise = new Promise((resolve, reject) => {
            this.uploadImage('campaigns','cover', this.temporaryCoverFile, this.campaign.brandUid + '_' + this.campaign.name )
                .then(url => {
                    console.log('cover image upload completed for ' + url);
                    this.campaign.coverImageUrl = url;
                    resolve();
                }
                )
                .catch(err => {
                    console.log('Error while uploading cover image');
                    reject(err);
                })
        }
        );

        return promise;
    }

    setTemporarayCoverImageFile(images) {
        if (images && images.length > 0) {
            this.temporaryCoverFile = images[0];
            this.setTemporaryCoverImageSrc(this.temporaryCoverFile);
        }
        return this;
    }


    setTemporaryCoverImageSrc(file) {
        console.log('Loading Brand Cover Image' + JSON.stringify(file));
        if (file) {
            console.log('File is present')
            let reader = new FileReader();
            reader.onload = (event) => {
                this.temporaryCoverImageSrc = event.target["result"];
                console.log('URL is ' + this.temporaryCoverImageSrc);
            }
            reader.readAsDataURL(file);
        }
    }


    setDreamboardUrls(): Promise<any> {
        let promises = [];
        let i = 0;
        for (let file of this.temporaryDreamBoardFiles) {
            let promise = new Promise((resolve, reject) => {
                this.uploadImage('campaigns', 'dreamboard', file, this.campaign.brandUid + '_' + this.campaign.name + '_' +i.toString())
                    .then(url => {
                        console.log('dreamboard upload completed for ' + url);
                        this.campaign.dreamboardImageUrls.push(url);
                        resolve();
                    }
                    )
                    .catch(err => {
                        console.log('Error while uploading dreamboard');
                        reject(err);
                    })
            }
            );

            promises.push(promise);
            i++;
        }


        let finalPromise = Promise.all(promises);

        return finalPromise;
    }

    setTemporarayDreamboardImageFiles(images) {
        for (let image of images) {
            if (image && image.length > 0) {
                this.temporaryDreamBoardFiles.push(image[0]);
                this.setTemporaryLogoImageSrc(image[0]);
            }
        }
        return this;
    }


    setTemporaryDreamboardImageSrc(file) {
        console.log('Loading Dreamboard Image' + JSON.stringify(file));
        if (file) {
            console.log('File is present')
            let reader = new FileReader();
            reader.onload = (event) => {
                this.temporaryDreamboardImagesSrc.push(event.target["result"]);
            }
            reader.readAsDataURL(file);
        }
    }

    uploadImage(folder: string, path: string, image, appendedText: string): Promise<string> {
        if (!appendedText) {
            appendedText = '';
        }
        const img = image;
        console.log('Attempting to upload image' + JSON.stringify(img));
        const logoStorage = storage().ref();
        const storagePathName = folder + '/' + path + '/'  + appendedText;
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


    setProductName(productName) {
        this.campaign.productName = productName;
        return this;
    }

    setProductDescription(productDescription) {
        this.campaign.productDescription = productDescription;
        return this;
    }

    setProductCategory(productCategory) {
        this.campaign.productCategory = productCategory;
        return this;
    }

    setProductUrl(productUrl) {
        this.campaign.productUrl = productUrl;
        return this;
    }

    setproductMarketInformation(productMarketInformation) {
        this.campaign.productMarketInformation = productMarketInformation;
        return this;
    }

    setSocialMedia(socialMedia) {
        this.campaign.socialMedia = socialMedia;
        return this;
    }



    setContentType(contentType) {
        this.campaign.contentType = contentType;
        return this;
    }

    setSpecification(specification) {
        this.campaign.specification = specification;
        return this;
    }

    setDos(dos) {
        this.campaign.dos = dos;
        return this;
    }

    setDonts(donts) {
        this.campaign.donts = donts;
        return this;
    }

    setCost(cost) {
        this.campaign.cost = cost;
        return this;
    }

    setPublishBriefDate(publishBriefDate) {
        this.campaign.publishBriefDate = publishBriefDate;
        return this;
    }

    setSubmissionEndDate(submissionEndDate) {
        this.campaign.submissionEndDate = submissionEndDate;
        return this;
    }
    /*
     Validators 
     */
    isValidInfluencer(): boolean {
        if (this.campaign.type == this.sharedService.INFLUENCER_CAMPAIGN) {
            if (this.campaign.filter)
                return true;
            else
                return false;
        }
    }

    isValidContent(): boolean {
        if (this.campaign.type)
            return true;
    }

    isValidCampaignType(): boolean {
        switch (this.campaign.type) {
            case this.sharedService.INFLUENCER_CAMPAIGN: return this.isValidInfluencer();
            case this.sharedService.CONTENT_CAMPAIGN: return this.isValidContent();
        }
    }

    isValidCampaign() {
        return (this.campaign.brandUid && this.campaign.type)
    }

    isValid(): boolean {

        console.log('validating campaign' + this.campaign.brandUid + this.campaign.name + this.campaign.type)
        if (this.isValidCampaign() && this.isValidCampaignType()) {
            return true;

        } else if (!this.isValidCampaign()) {
            console.error(this.INVALID_CAMPAIGN_MESSAGE);

        } else if (!this.isValidCampaignType()) {
            console.error(this.INVALID_INFLUENCER_CAMPAIGN_MESSAGE);
        }
        return false;
    }

    getCampaign(): Campaign {
        return this.campaign;
    }
    /*
    DAO Operations
    */
    getAllCampaigns(): Observable<Array<Campaign>> {
        return this.afs.collection<Campaign>(`${this.collectionName}`).valueChanges();
    }

    getCampaignsByBrandId(brandUid: string): Observable<Array<Campaign>> {
        return this.afs.collection<Campaign>(`${this.collectionName}`,
            ref => ref.where('brandUid', '==', brandUid)
        )
            .valueChanges();
    }

    getContentCampaigns(): Observable<Array<Campaign>> {
        let campaignsForInfluencer: Observable<Array<Campaign>>;

        campaignsForInfluencer = this.afs.collection<Campaign>(`${this.collectionName}`,
            ref => ref
                .where('type', '==', 'CONTENT')
        )
            .valueChanges()

        return campaignsForInfluencer;
    }

    
    getCampaignsByAge(influencer: Influencer, afs: AngularFirestore, collectionName: string): Observable<Array<Campaign>> {

        return afs.collection<Campaign>(`${collectionName}`,
            ref => ref.where('filter.minimumAge', '<=', influencer.age)
        )
            .valueChanges()
            .pipe(
                map(campaigns => campaigns.filter(campaign =>
                    campaign.filter.maximumAge >= influencer.age))
            );


    }

    getCampaignsByGender(influencer: Influencer, afs: AngularFirestore, collectionName: string): Observable<Array<Campaign>>  {

        let genderPropertyType = influencer.gender == 'MALE' ? 'filter.gender.male' : 'filter.gender.female'

        return afs.collection<Campaign>(`${collectionName}`,
            ref => ref.where(genderPropertyType, '==', true)
        )
            .valueChanges()


    }

    getCampaignsByTargetRegions(influencer: Influencer, afs: AngularFirestore, collectionName: string): Observable<Array<Campaign>>  {
        //assuming we have multiple region tags for influencer
        let refs = [];
        influencer.regions.forEach(region => {
            refs.push(afs.collection<Campaign>(`${collectionName}`,
                ref => ref.where('filter.regions', 'array-contains', region)
            )
                .valueChanges())
        });

        return combineLatest<any[]>(refs)
            .pipe(
                map(campaigns => campaigns.reduce((accumulatedCampaigns, currentCampaigns) => {
                    return _.unionBy(accumulatedCampaigns, currentCampaigns, 'productName');
                }))
            )
    }


    
    getCampaignsByInterests(influencer: Influencer, afs: AngularFirestore, collectionName: string): Observable<Array<Campaign>> {

        let refs = [];
        influencer.interests.forEach(interest => {
            refs.push(afs.collection<Campaign>(`${collectionName}`,
                ref => ref.where('filter.interests', 'array-contains', interest)
            )
                .valueChanges())
        });

        return combineLatest<any[]>(refs)
            .pipe(
                map(campaigns => campaigns.reduce((accumulatedCampaigns, currentCampaigns) => {
                    return _.unionBy(accumulatedCampaigns, currentCampaigns, 'productName');
                })),
            )
    }

    getFilteredInfluencerCampaign(selectedFilters : string[], influencer: Influencer): Observable<Array<Campaign>> {
        let result: Observable<Array<Campaign>> = Observable.of([]);
        const filterTypes = {
            'interests': this.getCampaignsByInterests,
            'age': this.getCampaignsByAge,
            'gender' : this.getCampaignsByGender,
            'regions' : this.getCampaignsByTargetRegions
        };

        //age -> gogo
        //region -> clim
        //gender -> nev
        let filteredCampaigns = [];
        let filters = _.intersection(Object.keys(filterTypes), selectedFilters);
        filters.forEach(element => {

            filteredCampaigns.push(filterTypes[element](influencer, this.afs, this.collectionName));
        });

        result = combineLatest(filteredCampaigns)
            .pipe(
                map(campaigns => campaigns.reduce((accumulatedCampaigns, currentCampaigns) => {
                    return _.intersectionBy(accumulatedCampaigns, currentCampaigns, 'productName');
                })),
            )
       
        return result;
    }

    //deprecated
    getCampaignsForInfluencer(influncer: Influencer): Observable<Array<Campaign>> {

        let genderPropertyType = influncer.gender == 'MALE' ? 'filter.gender.male' : 'filter.gender.female'
        let campaignsForInfluencer: Observable<Array<Campaign>>;

        let filterByInfluencerFilterCriteria
            = campaign =>
                campaign.filter.maximumAge >= influncer.age
                // Influencer regions matches Campaign regions
                && _.intersection(campaign.filter.regions, influncer.regions).length > 0
                // Influencer interests matches Campaign interests
                && _.intersection(campaign.filter.interests, influncer.interests).length > 0


        campaignsForInfluencer = this.afs.collection<Campaign>(`${this.collectionName}`,
            ref => ref
                // Influencer gender filter
                .where(genderPropertyType, '==', true)
                .where('filter.minimumAge', '<=', influncer.age)
        )
            .valueChanges()
            .pipe(
                map(campaigns => campaigns.filter(filterByInfluencerFilterCriteria))
            )

        return campaignsForInfluencer;
    }

    saveCampaign() {
        if (this.isValid())
            try {
                this.setLogoUrl()
                    .then(() => {
                        this.setCoverImageUrl()
                            .then(() => {
                                if (this.temporaryDreamBoardFiles.length) {
                                    this.setDreamboardUrls().then(
                                        () => {
                                            console.log('dreamboard Urls -> ' + this.campaign.dreamboardImageUrls);
                                            console.log('saving campaign');
                                            const result = this.afs.collection<Campaign>(`${this.collectionName}`).add(this.campaign);
                                            console.log('campaign saved');
                                        }
                                    );
                                } else {
                                    console.log('saving campaign');
                                    const result = this.afs.collection<Campaign>(`${this.collectionName}`).add(this.campaign);
                                    console.log('campaign saved');
                                }

                            });

                    })

                //return result;
            } catch (error) {
                console.error(this.FAILED_SAVE_MESSAGE + error);
            }
    }

    //TODO Don't we have to upload files here too?
    update(uid: string) {
        try {
            const result = this.afs.doc<Campaign>(`${this.collectionName}/${uid}`).set(this.campaign);
            return result;
        } catch (error) {
            console.error(this.FAILED_SAVE_MESSAGE + error);
        }
    }


}