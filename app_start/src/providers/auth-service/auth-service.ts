import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GATEWAY_URL } from '../../configurations/constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(private http: Http) {
    console.log('Using AuthServiceProvider');
  }

  public login(userName: string, password: string) {

    let data = "grant_type=password&username=" + userName + "&password=" + encodeURIComponent(password);
    var options = new RequestOptions({
      headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" })
    });

    return this.http.post(GATEWAY_URL + 'oauth/token', data, options)
                    .map(this.authrizationMapper)
                    // .catch(this.handleError);
  }

  private authrizationMapper(res: Response) {
    return res.json();
  }

  private handleError(error: Response | any) {
    if (error) {
      console.info(error);
    }

    return Observable.throw(error);
  }

}
