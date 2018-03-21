import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NFC, Ndef } from '@ionic-native/nfc';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NfcPage } from '../pages/nfc/nfc';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { AttendanceServiceProvider } from '../providers/attendance-service/attendance-service';
import { TokenInterceptor } from '../providers/interceptor-service/token-Interceptor';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NfcPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NfcPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    NFC,
    Ndef,
    AttendanceServiceProvider,
    AuthServiceProvider,
  ]
})
export class AppModule {}
