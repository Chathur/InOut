import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, MenuController  } from 'ionic-angular';
import { authUserDataModel } from '../nfc/user.auth.data';
import { NFC, Ndef } from '@ionic-native/nfc';
import { AttendanceServiceProvider } from '../../providers/attendance-service/attendance-service';
import { NfcPage } from '../nfc/nfc';

/**
 * Generated class for the NfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private user: authUserDataModel = new authUserDataModel();
  private nfcPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public attendanceProvider: AttendanceServiceProvider,
    public nfc: NFC,
    public ndef: Ndef,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public platform: Platform) 
    {
      this.user = navParams.data.user;
      this.nfcPage = NfcPage;
      this.menuCtrl.enable(true);

  }

  public goToNfcPage(){
    this.navCtrl.setRoot(this.nfcPage, { user: this.user });
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
