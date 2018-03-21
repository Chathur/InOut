import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { authUserDataModel } from './user.auth.data';
import { NFC, Ndef } from '@ionic-native/nfc';
import { AttendanceServiceProvider } from '../../providers/attendance-service/attendance-service';

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
  providers: [AttendanceServiceProvider]
})
export class NfcPage {

  private user: authUserDataModel = new authUserDataModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public attendanceProvider: AttendanceServiceProvider,
    public nfc: NFC,
    public ndef: Ndef,
    public alertCtrl: AlertController,
    public platform: Platform) {
      this.user = navParams.data.user;
  }



  public readNFC() {

     this.nfc.enabled().then(() => {
      this.platform.ready().then(() => {
        this.initNFC();
      });
     }) 
     .catch (error=>
        this.showAlert("Please enable NFC on your device")
     )
    
  }

  private initNFC() {

    this.showAlert("Keep your phone closer to NFC tag");
    this.nfc.addNdefListener()
      .subscribe(data => {
        this.showAlert(this.nfc.bytesToString(data.tag.ndefMessage[0].payload).substring(3));
        this.showAlert(this.nfc.bytesToHexString(data.tag.id));
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
