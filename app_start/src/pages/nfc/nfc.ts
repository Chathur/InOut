import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Platform, Toast } from 'ionic-angular';
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
  private isOkButtonClicked: boolean = false;
  public date: string;
  public todaysAttendanceData: any = {};
  public inTime: any;
  public toast: Toast;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public attendanceProvider: AttendanceServiceProvider,
    public nfc: NFC,
    public ndef: Ndef,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public platform: Platform) {
      this.homePage = HomePage;
      this.user = navParams.data;
      this.date = new Date().toISOString();
      this.getCurrentDateInOut();
      
  }

  public readNFC() {
    
     this.nfc.enabled().then(() => {
      this.platform.ready().then(() => {
        this.initNFC();
      });
     }) 
     .catch (error=>
        this.showBasicAlert("Please enable NFC on your device")
     )
  }

  private initNFC() {
    this.showToast("Keep your phone closer to NFC tag");
      this.nfc.addNdefListener().subscribe(data => {
        this.toast.dismiss();
        let tagId = this.nfc.bytesToHexString(data.tag.id);
        this.addAttendancetoDB(tagId);
      },
        err => {
          this.showBasicAlert(err);
        });
  }

  private addAttendancetoDB(tagId: String)
  {
    let attendanceType;
    if(tagId == DOWNFLOOR_INTAG || tagId == UPPERFLOOR_INTAG){
      attendanceType = attendanceTypeEnum.In
    }
    else if(tagId == DOWNFLOOR_OUTTAG || tagId == UPPERFLOOR_OUTTAG){
      attendanceType = attendanceTypeEnum.Out;
    }
    this.attendanceProvider.addAttendanceToDB(+this.user.id, attendanceType).subscribe(response => {
      if(response.Data == true){
        this.showBasicAlert("Sucess");
        this.navCtrl.setRoot(this.homePage, { user: this.user });
      }
      else{
        this.showBasicAlert("Error: Please try again");
      }
    });
  }

  private getCurrentDateInOut(){
    this.attendanceProvider.getCurrentDateInOut(+this.user.id).subscribe(response => {
      this.todaysAttendanceData = response.Data[0];
      this.todaysAttendanceData.InTime = new Date(this.todaysAttendanceData.InTime).toISOString();
      this.todaysAttendanceData.OutTime = new Date(this.todaysAttendanceData.InTime).toISOString();
    })
  }

  private showToast(content: string){
    this.toast = this.toastCtrl.create({
      message: content,
      duration: 10000,
      position: 'middle'
    });
    this.toast.present();
  }

  private showBasicAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
