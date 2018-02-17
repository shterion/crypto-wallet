import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  username: String;
  user: Object;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  onUpdateSubmit() {
    const newUser = {
      username: this.username
    };
    console.log(newUser);
    this._authService.editUser(newUser);
  }

}
