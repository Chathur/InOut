import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { authUserDataModel } from './user.auth.data'
import { NFC } from '@ionic-native/nfc';

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

  loggedUser: authUserDataModel = new authUserDataModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, private nfc: NFC) {
    debugger;
    this.loggedUser = navParams.data.user;
    this.readNFC();
  }

  private readNFC(){
    debugger;
    this.nfc.addTagDiscoveredListener(nfcEvent =>
    this.sesReadNFC(nfcEvent.tag)).subscribe(data =>{
      debugger;
      if(data && data.tag && data.tag.id)
      {
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        console.log(tagId);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NfcPage');
  }

  sesReadNFC(data): void {
    console.log('NFC_WORKING');
}

failNFC(err) {
    console.log('NFC Failed :' + JSON.stringify(err));
}

}
