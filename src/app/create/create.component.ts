import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './../app.state';
import { User } from './../models/user.model';
import * as UserActions from './../actions/user.actions';
import { Observable } from 'rxjs';
import { reducer } from './../reducers/user.reducer';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  tutorials: Observable<User[]>;
  temp: any;

  constructor(private store: Store<AppState>) { 
    // this.tutorials = store.select('user');
    // console.log(this.tutorials);
  }

  addTutorial(title) {

    //this.tutorials = this.store.select('user');

    //this.tutorials = this.store.select(state => state.user)

    this.store.select<any>('user').subscribe(state => {     
      this.tutorials = state.data;
      console.log("XXXXXXXXXXCreate", this.tutorials);
    });
    
    //console.log(this.tutorials);
    //this.temp = this.tutorials;

    //var objId = this.temp.length + 1;
    var object = {
      title: title,
      userId: 0,
      completed: false,
      id: 1
    }
    this.store.dispatch(new UserActions.AddTutorial(object))

    console.log(object);
    
  }

  ngOnInit() {
  }

}
