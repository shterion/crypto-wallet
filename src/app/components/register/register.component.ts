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

  constructor(private _validateService: ValidateService, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    // Required fields
    if(!this._validateService.validateRegister(user)) {
      this._flashMessagesService.show('Please fill in all fields!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if(!this._validateService.validateEmail(user.email)) {
      this._flashMessagesService.show('Please ener a valid email!', { cssClass: 'alert-danger', timeout: 1000 });
      return false;
    }
  }
}
