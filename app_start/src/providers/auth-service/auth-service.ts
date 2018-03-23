import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GATEWAY_URL } from '../../configurations/constants';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) {
  }

  public login(userName: string, password: string) {

    let data = "grant_type=password&username=" + userName + "&password=" + encodeURIComponent(password);
    var options = {
      headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
    };


    
    return this.http.post(GATEWAY_URL + 'oauth/token', data, options)
                    .map(response => JSON.parse(JSON.stringify(response)));

  }

  public getToken(): string{
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return this.jwtHelper.isTokenExpired(this.getToken());
  }



}
