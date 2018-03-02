import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('ContentType', 'application/json');

    return this.http.post('http://localhost:3000/users/register', user, {headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('ContentType', 'application/json');

    return this.http.post('http://localhost:3000/users/authenticate', user, {headers})
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('ContentType', 'application/json');

    return this.http.get('http://localhost:3000/users/profile', {headers})
      .map(res => res.json());
  }

  editUser(user) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('ContentType', 'application/json');

    return this.http.post('http://localhost:3000/users/edit', user, {headers})
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getUserCoins() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('ContentType', 'application/json');

    return this.http.get('http://localhost:3000/users/dashboard', {headers})
      .map(res => res.json());
  }

  addCoin(user, newCoin) {

    let data = {
      user,
      coin: newCoin
    };

    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('ContentType', 'application/json');

    return this.http.post('http://localhost:3000/users/add-coin', data, {headers})
      .map(res => res.json());
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
