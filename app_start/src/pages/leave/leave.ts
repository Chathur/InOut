import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LeavePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html',
})
export class LeavePage {

  public date: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.date = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeavePage');
  }

}
