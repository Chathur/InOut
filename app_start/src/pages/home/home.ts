import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, MenuController  } from 'ionic-angular';
import { authUserDataModel } from '../nfc/user.auth.data';
import { NfcPage } from '../nfc/nfc';
import { LeavePage } from '../leave/leave';
import { SettingsPage } from '../settings/settings';

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
  private leavePage;
  private settingsPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public platform: Platform) 
    {
      this.user = navParams.data.user;
      this.nfcPage = NfcPage;
      this.leavePage = LeavePage;
      this.settingsPage = SettingsPage;
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
