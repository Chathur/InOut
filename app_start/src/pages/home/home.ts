import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { PeopleDataProvider } from '../../providers/people-data/people-data';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[PeopleDataProvider, AuthServiceProvider]
})
export class HomePage {

  // public people = new Array();
  // private detailPage;

  constructor(public navCtrl: NavController, public peopleData: PeopleDataProvider, public authProvider: AuthServiceProvider, public loadingCtrl:LoadingController) {
    // let loader = this.loadingCtrl.create({content:'Loading People'});
    // loader.present();

    // this.detailPage = DetailPage;
  }

  public onLoginClicked() {
    this.peopleData.getPeople().subscribe(people => {
      let x = people.json();
      console.log('people',people);
    });
  }

  // public loadDetail(person){
  //   console.log(person);
  //   this.navCtrl.push(this.detailPage, {person: person});
  // }

}
