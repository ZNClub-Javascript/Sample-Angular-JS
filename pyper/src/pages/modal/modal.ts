import { sharedService } from './../../providers/sharedServices/sharedService';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormsModule, NgForm } from '@angular/forms';
import { BrandProvider } from '../../providers/dataaccess/brandProvider';
import { Brand } from '../../interfaces/brand';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  public panImg;
  public gstImg;
  private gstUrl: FileList;
  private panUrl: FileList;
  private brand: Brand;

  @ViewChild('ModalPage') campaignCreateForm: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public brandprovider: BrandProvider, private sharedService: sharedService) {
    if (sharedService.roleId == 1) {

      this.brandprovider.getBrandById(sharedService.uid)
        .subscribe(response => {
          this.brand = response;

        });

    }
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');

  }


  changeListener(event, choice: String): void {
    console.log('Inside Change Listener');
    const files: FileList = event.srcElement.files;
    console.log(JSON.stringify(event.target.files));
    if (choice === 'panimg') {
      this.panImg = files;
      console.log('Pan Url ' + this.panUrl);
    } else if (choice === 'gstimg') {
      this.gstImg = files;
      console.log('GST Url ' + this.panUrl);

    }
  }




  goToUploadDoc() {
    console.log('Inside Upload Document');
    this.brandprovider.setTemporarayPanImage(this.panImg).setTemporarayGstImage(this.gstImg);
    // this.brandprovider.setGstUrl();
    // this.brandprovider.setPanUrl();

    this.brandprovider.saveBrand(this.sharedService.uid);
    this.closeModal();
  }



}
