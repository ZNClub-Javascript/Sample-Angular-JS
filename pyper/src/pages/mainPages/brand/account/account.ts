import { UtilService } from './../../../../providers/utilService/utilService';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Brand } from '../../../../interfaces/brand';
import { sharedService } from '../../../../providers/sharedServices/sharedService';
import { BrandProvider } from '../../../../providers/dataaccess/brandProvider';
import { Payment } from '../../../../interfaces/payment';
import { AngularFirestore } from 'angularfire2/firestore';
import { storage } from 'firebase';
import firebase from 'firebase';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  private collectionName = "brands";

  public FAILED_SAVE_MESSAGE = "Error: Could not update brand details due to ";
  public brand: Brand;
  public defaultPayment: Payment;
  public isEditable: Map<string, boolean> = new Map<string, boolean>();
  public productToBeAdded: string;
  public regionToBeAdded: string;
  private logoImage: File;
  public logoImageDisplayUrl: string;
  public noSrcTextLogo: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private brandProvider: BrandProvider, public sharedService: sharedService,private utilService: UtilService, public afs: AngularFirestore) {
    this.resetIsEditable();

    //BRAND
    if (sharedService.roleId == 1) {

      brandProvider.getBrandById(sharedService.uid)
        .subscribe(response => {
          this.brand = response;

          this.populateDefaultPayment();

          if (this.brand.logoUrl != null && this.brand.logoUrl != "") {
            this.utilService.readImage(this.brand.logoUrl).then(
              (url) => {
                this.logoImageDisplayUrl = url;
              }
            );
          } else {
            this.noSrcTextLogo = "Upload Brand Logo";
          }

        });
      //INFLUENCER
    } else if (sharedService.roleId == 2) {
      this.noSrcTextLogo = "Upload Influencer Logo";


      //PR AGENCY
    } else if (sharedService.roleId == 3) {
      this.noSrcTextLogo = "Upload PR Agency Logo";

    }
  }

  ionViewCanEnter(){
    return this.sharedService.isLoggedIn();
  }
  
  private populateDefaultPayment() {
    this.defaultPayment = {
      creditCardNumber: "",
      expiryDate: "",
      cvv: null,
      isDefault: true
    };
    const defaults = this.brand.payments.filter((payment) => payment.isDefault);
    //EXACTLY 1 DEFAULT (IDEAL)
    if (defaults.length == 1) {
      this.defaultPayment = defaults[0];

      //MORE THAN 1 DEFAULT (SHOULD NOT BE ALLOWED BY VALIDATION)
    } else if (defaults.length > 1) {
      //TODO Fix this or select first as default
      this.defaultPayment = defaults[0];
      //NO DEFAULTS BUT HAS PAYMENTS (SHOULD NOT BE ALLOWED BY VALIDATION)
    } else if (this.brand.payments.length >= 1) {
      this.defaultPayment = this.brand.payments[0];
      this.defaultPayment.isDefault = true;
    }
  }

  private resetIsEditable() {
    ['name', 'logoUrl', 'rating', 'aboutUs', 'uniqueFact', 'products', 'geographies',
      'creditCard', 'isDefault']
      .forEach(property => this.isEditable.set(property, false));
  }

  // presentAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Credit Card Info',
  //     message: 'Credit CardNo.: xxxxxxxx xx91 <br/> Expiry Date: YYYY/MM <br/> CVV : ***',
  //     buttons: ['Dismiss']
  //   });
  //   alert.present();
  // }

  addToProducts() {
    this.brand.products.push(this.productToBeAdded);
    this.productToBeAdded = null;
  }

  addToGeographies() {
    this.brand.geographies.push(this.regionToBeAdded);
    this.regionToBeAdded = null;
  }

  removeItem(item: string, items: Array<string>) {
    //TODO replace with lodash
    const index: number = items.indexOf(item);
    if (index !== -1) {
      items.splice(index, 1);
    }
  }

  isEditEnabled() {
    return Array.from(this.isEditable.values())
      .filter(value => value)
      .length > 0
  }


  onEdit(property: string): void {
    this.isEditable.set(property, true);
  }

  onUpload(files, choice: string) {
    this.onEdit(choice);
    this.logoImage = files[0];
  }

  onSave() {
    //validate
    if (this.isValid()) {
      //persist
      this.updateBrand(this.sharedService.uid);

    } else {
      console.error("could not execute onSave");
    }

    //hide edit options
    this.resetIsEditable();
    //confirm

  }

  isValid(): boolean {
    let isValid = true;
    return isValid;
  }
  //TODO Move implementation code to brandProvider
  updateBrand(uid: string): any {
    console.log("Default payment " + JSON.stringify(this.defaultPayment));
    try {
      this.setLogoUrl()
        .then(() => {
          console.log('updating brand');
          console.log("Default payment " + JSON.stringify(this.defaultPayment));

          this.brand.payments.push(this.defaultPayment);
          const result = this.afs.doc<Brand>(`${this.collectionName}/${uid}`).set(this.brand);
          console.log('updateBrand completed');
        }, (error) => {
          console.log("Error: could not upload logo due to " + error);
        })

      //return result;
    } catch (error) {
      console.error(this.FAILED_SAVE_MESSAGE + error);
    }
  }

  setLogoUrl(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      if (this.logoImage == null) {
        resolve();
      }

      this.uploadImage('logo', this.logoImage)
        .then(url => {
          console.log('logo upload completed for ' + url);
          this.brand.logoUrl = url;
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

  //TODO UTILITY
  uploadImage(path: string, image): Promise<string> {
    const img = image;
    const logoStorage = storage().ref();
    const storagePathName = 'brands/' + path + '/' + this.sharedService.uid + '_' + this.brand.name;

    // this.readImage(storagePathName);
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

  

  
}
