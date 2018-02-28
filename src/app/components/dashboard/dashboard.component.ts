import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private coins = [];
  currentCoin: any;
  user: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.fetchCoins();
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  fetchCoins() {
    this.authService.getUserCoins()
      .subscribe(data =>
        data.forEach((coin) => {
          this.apiService.getCoin(coin.name)
            .subscribe(data => {
              this.coins.push(data);
            });
        })
      );
  }

  addCoin() {
    let newCoin = this.currentCoin;
    // let user = this.user.email;
    this.authService.addCoin(this.user, newCoin)
      .subscribe(data => {
        // console.log(data);
      })
  }

}
