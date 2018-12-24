import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../models/user.model';
import { AppState } from './../app.state';
import * as UserActions from './../actions/user.actions';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  tutorials: Observable<User[]>;
  temp: any;


  constructor(private store: Store<AppState>, private http: HttpClient) {
   
  }

  delTutorial(index) {
    this.store.dispatch(new UserActions.RemoveTutorial(index))
  }

 
  ngOnInit() {
    
    //this.tutorials = this.store.select('user');
    this.store.dispatch(new UserActions.GetPost());

    this.store.select<any>('user').subscribe(state => {     
      this.tutorials = state.data;
      console.log("XXXXXXXXXX", this.tutorials);
    });

  }

}
