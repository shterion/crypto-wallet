import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  private coin: string;
  private url: string;

  constructor(private http: Http) { }

  getCoin(coin) {
    this.url = `https://api.coinmarketcap.com/v1/ticker/${coin}/`;
    return this.http.get(this.url)
     .map((res) => res.json());
    }

}
