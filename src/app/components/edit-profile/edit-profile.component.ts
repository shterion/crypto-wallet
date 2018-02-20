import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  username: String;
  user: Object;

  constructor(
    private _authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
  }

  success(): Observable<any> {
    return Observable.create(observer => {
      this._flashMessagesService.show('Username was edited...', { cssClass: 'alert-success', timeout: 3000 });
      observer.next(true);
    });
  }

  onUpdateSubmit() {
    const newUser = {
      username: this.username
    };
    this._authService.editUser(newUser).subscribe(data => {
      if (data.success) {
        this.success().delay(3000).subscribe(() => {
          this._router.navigate(['/profile']);
        });

      } else {
        this._flashMessagesService.show('Username was not changed, please type a new username if you want to change it!', { cssClass: 'alert-danger', timeout: 6000 });      }
    });

  }

}
