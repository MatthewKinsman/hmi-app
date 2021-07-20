import { Injectable } from '@angular/core';
import {Observable, Subject, BehaviorSubject, EMPTY, ReplaySubject} from 'rxjs';
import {switchMap, map} from 'rxjs/operators';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ScratchPadService {

  constructor(private webSocket : WebsocketService) { }

  private symbols : Map<string, ReplaySubject<any>> = new Map<string, ReplaySubject<any>>();

  createSubscription(symbols : string[]):Observable<any>{
    return new Observable((observer)=>{
      let observables = symbols.map(x=>this.getSymbol(x));
      let subscription = this.webSocket.subscription(symbols.map(x=>({symbol:x}))).subscribe(x=>x.forEach(y=>this.getSymbol(y.symbol).next(y.readValue)));
      observer.next(observables);
      return ()=>subscription.unsubscribe();
    });
  }

  updateSymbol(symbol:string, value:any){
    let subj : Subject<any> = this.getSymbol(symbol);
    subj.next(value);
  }

  private getSymbol(symbol : string) : ReplaySubject<any>{
    if(!this.symbols.has(symbol)){
      this.symbols.set(symbol, new ReplaySubject(1));
    }
    return this.symbols.get(symbol);
  }
  
}

export class Subscriptions{
  symbol  : string;
  name    : string;
}