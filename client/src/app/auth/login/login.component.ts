import { Component, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private service:AdminService, private router: Router,) {



  }

  loginForm = new FormGroup({
    username: new FormControl('', [ Validators.minLength(5),Validators.maxLength(35)]),
    password: new FormControl('', [Validators.minLength(5), Validators.maxLength(35)]),

  });


  login() {

    let user:UserModel= { username: this.userName?.value || '', password: this.Password?.value || '' };
    this.service.userAutheticate(user).subscribe((resp:UserModel)=>{
      this.service.currentUserSource.next(resp);
      this.router.navigateByUrl('admin/showcase');
    });
  }



  get userName() {
    return this.loginForm.get('username');
 }

 get Password() {
  return this.loginForm.get('password');
 }

}
