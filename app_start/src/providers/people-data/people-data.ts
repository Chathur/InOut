import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeopleDataProvider {

  constructor(public http: Http) {
    console.log('Hello PeopleDataProvider Provider');
  }

  public getPeople() {
    // return this.http.get('https://randomuser.me/api/?results=10&nat=us&seed=d07ade5f51ff3011')
    // .map(res => res.json())
    // .map(res => res.results);
    let userName = 'eranga';
    let password = 'voshitha123%';
    let data = "grant_type=password&username=" + userName + "&password=" + encodeURIComponent(password);
    var options = new RequestOptions({
      headers: new Headers({ "Content-Type" : "application/x-www-form-urlencoded" })
    })
    return this.http.post('http://sphere.embla.asia/oauth/token', data, options);
    // .subscribe((data) => {
    //   debugger;
    //   console.log(data);
    // }, (error) => console.log(error));
    // .map(res => res.json())
    // .map(res => res.results);
  }

}
