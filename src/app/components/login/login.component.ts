import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    this._authService.authenticateUser(user).subscribe(data => {
      if(data.success) {
        this._authService.storeUserData(data.token, data.user);
        this._flashMessagesService.show('You are now loged in', { cssClass: 'alert-success', timeout: 5000});
        this._router.navigate(['/dashboard']);
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        this._router.navigate(['/login']);
      }
    });
  }

}
