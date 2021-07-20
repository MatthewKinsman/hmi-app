import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of, interval, timer } from 'rxjs';
import { tap, map,  switchMap, mergeMap} from 'rxjs/operators';
import { WebsocketService } from '../websocket.service';
import { MessageListNode } from './message-list';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private webSocket : WebsocketService) {
  }
  
  msg : MessageListNode;

  currentMessage = new ReplaySubject(1);
  

  getActiveMessages() : Observable<any>{
    return this.webSocket.subscription([{symbol: 'ListEvents', filter:[{path:'alarmState', comparator:'==', value:0}, {logic:'AND'}, {path:'type', comparator:'==', value:1}]}]).pipe(map(x=>x[0].readValue));//.reduce((o, c)=>({...o, [c.payload.id]:c}), {}))
  }

  getMessagesTest() : Observable<any>{
    const id = this.webSocket.registerObserver(this.currentMessage);
    
    return this.webSocket.readwrite([{symbol: 'SubscribeEvents', writeValue:id}]).pipe(
      mergeMap(x=>this.webSocket.readwrite([{symbol: 'ListEvents'}]))
    );
  }
}

