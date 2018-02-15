import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn: boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit() {
    this.isLoggedIn = false;
  }

  onLogoutClick() {
    this._authService.logout();
    this._flashMessagesService.show('You are logged out!', { cssClass: 'alert-success', timeout: 3000});
    this._router.navigate(['/login']);
    return false;
  }
}
