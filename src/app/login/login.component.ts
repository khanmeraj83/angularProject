import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../app/guards/auth.guard';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from './../actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message;
  messageClass;
  processing = false;
  previousUrl;
  rexxxx;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard,
    private store: Store<any>
  ) {

    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  form = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.messageClass = 'alert alert-danger';
      this.message = 'you must be logged in to view this page';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

  // onLoginSubmit() {
  //   this.processing = true;
  //   this.disableForm();
  //   const user = {
  //     email: this.form.get('email').value,
  //     password: this.form.get('password').value      
  //   }

  //   this.authService.login(user).subscribe(data => {
  //     console.log("response", data);

  //     if (!data.success) {
  //       this.processing = false;
  //       this.enableForm();
  //       //if (data.error) {
  //         this.messageClass = 'alert alert-danger';
  //         this.message = data.error.errmsg;
  //       //}

  //     } else {
  //       this.messageClass = 'alert alert-success';
  //       this.message = "User Login Successfuly";
  //       this.authService.storeUserData(data.data.token, data.data.email)
  //       setTimeout(() => {
  //         if (this.previousUrl){
  //           this.router.navigate([this.previousUrl]);
  //         }else{
  //           this.router.navigate(['/dashboard']);
  //         }
  //       }, 2000)
  //     }
  //   });
  //   console.log(this.form.get('email').value);
  //   console.log(this.form.get('password').value);
  // }

  onLoginSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }

    this.store.dispatch(new AuthActions.LoginUser(user));

    this.store.select<any>('auth').subscribe(state => {
      this.rexxxx = state;
      console.log("LOGINXX", this.rexxxx);

      if (this.rexxxx.user != null){
        if (!this.rexxxx.user.success) {
          this.processing = false;
          this.enableForm();
    
          this.messageClass = 'alert alert-danger';
          this.message = this.rexxxx.user.error.errmsg;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = "User Login Successfuly";
          this.authService.storeUserData(this.rexxxx.user.data.token, this.rexxxx.user.data.email)
          setTimeout(() => {
            if (this.previousUrl){
              this.router.navigate([this.previousUrl]);
            }else{
              this.router.navigate(['/dashboard']);
            }
          }, 2000)
        }  
      }
       
    });
    
    

    // this.authService.login(user).subscribe(data => {
    //   console.log("response", data);

    //   if (!data.success) {
    //     this.processing = false;
    //     this.enableForm();
    //     //if (data.error) {
    //       this.messageClass = 'alert alert-danger';
    //       this.message = data.error.errmsg;
    //     //}

    //   } else {
    //     this.messageClass = 'alert alert-success';
    //     this.message = "User Login Successfuly";
    //     this.authService.storeUserData(data.data.token, data.data.email)
    //     setTimeout(() => {
    //       if (this.previousUrl){
    //         this.router.navigate([this.previousUrl]);
    //       }else{
    //         this.router.navigate(['/dashboard']);
    //       }
    //     }, 2000)
    //   }
    // });

  }

  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }

}
