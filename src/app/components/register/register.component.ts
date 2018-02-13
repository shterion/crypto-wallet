import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private _validateService: ValidateService, private _flashMessagesService: FlashMessagesService) { }

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
  }
}
