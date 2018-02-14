import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  confirmPassword: String;

  constructor(private _authService: AuthService,
    private _validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    // Required fields
    if (!this._validateService.validateRegister(user)) {
      this._flashMessagesService.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this._validateService.validateEmail(user.email)) {
      this._flashMessagesService.show('Please ener a valid email!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate password
    if (user.password != user.confirmPassword) {
      this._flashMessagesService.show('Passwords don`t match!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (user.password.length < 5) {
      this._flashMessagesService.show('Password must be at least 5 characters!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this._authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this._flashMessagesService.show('You are now registered and can log in!', { cssClass: 'alert-success', timeout: 3000 });
        this._router.navigate(['/login']);
      } else {
        this._flashMessagesService.show('User already exists!', { cssClass: 'alert-danger', timeout: 3000 });
        this._router.navigate(['/register']);
      }
    });
  }
}
