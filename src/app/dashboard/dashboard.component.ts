import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  //title = 'Pusher Liker';
  likes: any = 10;
  userName: any;
  messageText: any;

  messages: Array<Message>;

  constructor(private authService: AuthService) {
    //db.list('/clappy-comments')
    // the pusher service will be injected as part of the constructor later
    this.messages = [];
  }

  sendMessage() {
    //userName, messageText
     
  }

  liked() {
    this.likes = parseInt(this.likes, 10) + 1;
    this.authService.like( this.likes );
  }

  ngOnInit() {
    // this.authService.channel.bind('new-like', data => {
    //   this.likes = data.likes ;
    // });
     
  }

}
interface Message {
  text: string;
  user: string;
}