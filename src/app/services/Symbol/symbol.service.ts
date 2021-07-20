import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import {ReplaySubject, Observable, BehaviorSubject, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  constructor(private webSocket: WebsocketService) { }

  private symbols : Map<string, ReplaySubject<any>> = new Map<string, ReplaySubject<any>>();
  
  writeSymbol(symbols : SymbolWrite[]):Observable<any>{
    return this.webSocket.readwrite(symbols.map(x=>({symbol:x.symbol, commandOptions:['SendErrorMessage'], writeValue:x.value})));
  }

  //readSymbol(symbols)
  createSubscription(symbols : string[]):Observable<any>{
    return new Observable((observer)=>{
      let observables = symbols.map(x=>this.getSymbol(x));
      let subscription = this.webSocket.subscription(symbols.map(x=>({symbol:x}))).subscribe(x=>x.forEach(y=>this.getSymbol(y.symbol).next(y.readValue)));
      observer.next(observables);
      return ()=>subscription.unsubscribe();
    });
  }

  private getSymbol(symbol : string) : ReplaySubject<any>{
    if(!this.symbols.has(symbol)){
      this.symbols.set(symbol, new ReplaySubject(1));
    }
    return this.symbols.get(symbol);
  }
  
}

export class SymbolWrite{
  symbol  : string;
  value   : any;
}