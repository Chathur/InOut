import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Platform } from 'ionic-angular';
import { authUserDataModel } from './user.auth.data';
import { NFC, Ndef } from '@ionic-native/nfc';
import { Subscription } from 'rxjs/Rx';

/**
 * Generated class for the NfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html',
})
export class NfcPage {
  readingTag: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public nfc: NFC,
    public ndef: Ndef,
    public alertCtrl: AlertController,
    public platform: Platform) {

  }



  public readNFC() {
    if (this.readingTag) {
      this.platform.ready().then(() => {
        this.initNFC();
      });
    }

  }

  private initNFC() {

    this.showAlert("Keep your phone closer to NFC tag");
    this.nfc.addNdefListener()
      .subscribe(data => {
        this.showAlert(this.nfc.bytesToString(data.tag.ndefMessage[0].payload).substring(3));
        this.readingTag = false;
      },
        err => {
          this.showAlert(err);
        })

  }

  private showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
