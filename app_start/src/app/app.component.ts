import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public toastCtrl: ToastController, private network: Network) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let type = this.network.type;

      if(type == "unknown" || type == "none" || type == undefined){
        this.showToastWithCloseButton("No internet connetion");
      }
      
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        this.showToastWithCloseButton('network was disconnected :-(');
      });
      
      // stop disconnect watch
     // disconnectSubscription.unsubscribe();
      
      // watch network for a connection
      let connectSubscription = this.network.onConnect().subscribe(() => {
        this.showToastWithCloseButton('network connected :-)');
      });
      
      // stop connect watch
      //connectSubscription.unsubscribe();
    
      
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

