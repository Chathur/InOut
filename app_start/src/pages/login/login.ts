import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NfcPage } from '../nfc/nfc';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthServiceProvider]
})


export class LoginPage {
  private loader = this.loadingCtrl.create({ content: 'Loading..' });
  public loginForm: FormGroup;;
  private nfcPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthServiceProvider, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    let loader = this.loadingCtrl.create({ content: 'Loading..' });
    this.initializeLoginForm();
    this.nfcPage = NfcPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public onLoginClicked() {
    this.loader.present();
    this.authProvider.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(result => {
      this.navCtrl.push(this.nfcPage, {user: result});
      this.loader.dismiss();
    },
      error => {
        if (error._body) {
          this.showToastWithCloseButton(JSON.parse(error._body).error_description);
        }
        console.log(error);
        this.loader.dismiss();
      }
    );
  }

  private initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  private showToastWithCloseButton(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}

