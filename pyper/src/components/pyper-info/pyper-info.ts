import { Component, Input } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';

/**
 * Generated class for the PyperInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pyper-info',
  templateUrl: 'pyper-info.html'
})
export class PyperInfoComponent {

  @Input('title') title: string;
  @Input('message') message: string;
  
  constructor(public modalCtrl: ModalController,public alertCtrl: AlertController) {
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.title,
      message: this.message,
      buttons: ['Close']
    });
    alert.present();
  }

}
