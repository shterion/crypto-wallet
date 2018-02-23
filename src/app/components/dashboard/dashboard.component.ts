import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private coin;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this._apiService.getCoin()
    .subscribe(data => this.coin = data);
  }
}
