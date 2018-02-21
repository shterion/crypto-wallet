import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _flashMessagesService: FlashMessagesService
  ) {}

  canActivate() {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      this._flashMessagesService.show('You have to be logged in to access this page!', {cssClass: 'alert-danger', timeout: 5000});
      this._router.navigate(['/login']);
      return false;
    }
  }

}
