import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { UserModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   *
   */
  constructor(private service:AdminService) {


  }

  loginForm = new FormGroup({
    username: new FormControl('', [ Validators.minLength(5),Validators.maxLength(35)]),
    password: new FormControl('', [Validators.minLength(5), Validators.maxLength(35)]),

  });


  login() {

    let user:UserModel= { username: this.userName?.value || '', password: this.Password?.value || '' };
    this.service.userAutheticate(user);


  }



  get userName() {
    return this.loginForm.get('username');
 }

 get Password() {
  return this.loginForm.get('password');
 }

}
