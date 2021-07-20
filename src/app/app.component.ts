import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { SymbolService } from './services/Symbol/symbol.service';
import { map } from 'rxjs/operators';
import { MessageService } from './services/Message/message.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('collapse', [
      state('*',style({maxHeight : '{{height}}px'}),{params:{height:0}}),
      state('0', style({maxHeight : 0})),
      transition('*<=>*', animate('250ms linear')),
    ])
  ]
})

export class AppComponent implements OnInit{
  

  constructor(private symbolService : SymbolService, private messageService : MessageService, private webSocket : WebsocketService){

  }

  headerCollapsed = true;
  model = null;
  activeMessage = null;
  mydata = 1;
  ngOnInit():void{
    this.model = this.symbolService.createSubscription(['PLC1::MAIN::Machine::_State']).pipe(map(x=>({state : x[0]})));
    this.activeMessage = this.messageService.getActiveMessages().pipe(map(x=>x[0]));//.subscribe(x=>console.log(x));
    //this.messageService.getActiveMessages().subscribe(x=>console.log(x));
    this.messageService.getMessagesTest().subscribe(x=>console.log(x), err=>console.log(err));
    
    //this.webSocket.readwrite()
  }
  messageHeaderClick(){
    this.headerCollapsed = !this.headerCollapsed;
  }
  
}

