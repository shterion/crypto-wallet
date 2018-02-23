import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private coins;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.apiService.getCoin()
    // .subscribe(data => this.coin = data);

    this.authService.getUserCoins()
    .subscribe(data => this.coins = data);
  }
}
