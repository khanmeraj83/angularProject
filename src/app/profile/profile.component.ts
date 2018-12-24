import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../models/user.model';
import { AppState } from './../app.state';
import * as UserActions from './../actions/user.actions';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tutorials: Observable<User[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select<any>('user').subscribe(state => {     
      this.tutorials = state.data;
      console.log("XXXXXXXXXX", this.tutorials);
    });
  }

  delTutorial(index) {
    this.store.dispatch(new UserActions.RemoveTutorial(index))
  }

}
