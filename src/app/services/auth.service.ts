import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private _http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('ContentType', 'application/json');
    return this._http.post('http://localhost:3000/users/register', user, {headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('ContentType', 'application/json');
    return this._http.post('http://localhost:3000/users/authenticate', user, {headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('ContentType', 'application/json');
    return this._http.get('http://localhost:3000/users/profile', {headers})
      .map(res => res.json());
  }

  editUser(user) {
    this._http.get('http://localhost:3000/users/edit');
    // let headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    // headers.append('ContentType', 'application/json');
    // return this._http.get('http://localhost:3000/users/edit', {headers})
    //   .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
