import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  private coin: string;
  private url: string;

  constructor(private http: Http) { }

  getCoin() {
    this.url = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/';
    return this.http.get(this.url)
    .map((res:Response) => res.json());  }
}