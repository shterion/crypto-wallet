import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

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

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}
