import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { authUserDataModel, attendanceTypeEnum } from './user.auth.data';
import { NFC, Ndef } from '@ionic-native/nfc';
import { AttendanceServiceProvider } from '../../providers/attendance-service/attendance-service';
import { DOWNFLOOR_INTAG,DOWNFLOOR_OUTTAG,UPPERFLOOR_INTAG,UPPERFLOOR_OUTTAG} from '../../configurations/constants';
import { HomePage } from '../home/home';

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
  private homePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public attendanceProvider: AttendanceServiceProvider,
    public nfc: NFC,
    public ndef: Ndef,
    public alertCtrl: AlertController,
    public platform: Platform) {
      this.homePage = HomePage;
      this.user = navParams.data.user;
      this.readNFC();
  }



  private readNFC() {
   this.attendanceProvider.addAttendanceToDB(+this.user.id, attendanceTypeEnum.In);
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
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        this.addAttendancetoDB(tagId);
        this.navCtrl.setRoot(this.homePage, { user: this.user });
      },
        err => {
          this.showAlert(err);
          this.navCtrl.setRoot(this.homePage, { user: this.user });
        })
  }

  private addAttendancetoDB(tagId: string)
  {
    let attendanceType;
    if(tagId == DOWNFLOOR_INTAG || UPPERFLOOR_INTAG){
      attendanceType = attendanceTypeEnum.In
    }
    else if(tagId == DOWNFLOOR_OUTTAG || UPPERFLOOR_OUTTAG){
      attendanceType = attendanceTypeEnum.Out;
    }
    
    this.attendanceProvider.addAttendanceToDB(+this.user.id, attendanceType).subscribe(response => {
      if(response.Data == true){
        this.showAlert("Sucess");
      }
      else{
        this.showAlert("Error: Please try again");
      }
    });
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
