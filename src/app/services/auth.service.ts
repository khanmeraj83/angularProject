import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule
} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';

//import Pusher from 'pusher-js';
//declare const Pusher: any;

// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = "https://express-todoapi.herokuapp.com/api/v1/register";
  domainLogin = "https://express-todoapi.herokuapp.com";

  authToken;
  email;
  pusher: any;
  messagesChannel: any;


  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    //this.pusher = new Pusher(environment.pusher.key);

    // this.pusher = new Pusher(environment.pusher.key, {
    //   authEndpoint: '',
    // });

    // //this.channel = this.pusher.subscribe('events-channel');
    // this.messagesChannel = this.pusher.subscribe('private-messages');
  }

  like(num_likes) {
    this.http.post('http://localhost:3120/update', { 'likes': num_likes })
      .subscribe(data => { });
  }
  
  registerUser(user) {
    return this.getregisterUserResponse(user).pipe(
      map((result: any) => {
        //this.token = result.response.data;

        return result;
      })
    );
  }

  FillData(): Observable<User[]> {

    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/todos')
  }
  createAuthenticationHeader() {
    this.loadToken();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': this.authToken

      })
    };

  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.email = null;
    localStorage.clear();
  }

  loggedIn(){
    return this.jwtHelper.isTokenExpired();
  }
  private getregisterUserResponse(user) {

    return this.http.post(
      this.domain,
      user,
      httpOptions
    );
  }

  login(user) {
    return this.getLoginResponse(user).pipe(
      map((result: any) => {
        //this.token = result.response.data;

        return result;
      })
    );
  }

  private getLoginResponse(user) {

    return this.http.post(
      this.domainLogin + "/api/v1/login",
      user,
      httpOptions
    );
  }



  storeUserData(token, email) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    this.authToken = token;
    this.email = email;
  }
}
