import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { from, Observable, Observer, Subscriber} from 'rxjs';
import {shareReplay, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService { 
  
  constructor(private http: HttpClient) { 
    const socket = new Observable<WebSocket>((observer)=>{
      //const formData : FormData = new FormData();
      //formData.append(`Username`, `__SystemAdministrator`);
      //formData.append(`Password`, `1`);
      //formData.append(`Persistent`,`true`);
      //this.http.post(`/backend/Login`, formData, {responseType: 'text'}).subscribe(response=>{
      const ws = new WebSocket(`ws://192.168.1.1:1020/`); //${window.location.hostname}
      ws.onmessage = (event)=>{
        var result = JSON.parse(event.data);
        //this.observerMap[result.id]?.next(result.commands);
        this.observerMap.get(result.id)?.next(result.commands);
      };
      ws.onopen=()=>{
        observer.next(ws);
      };
      //})
    });
    this.socket = socket.pipe(shareReplay(1));  
  }

  private observerMap = new Map<number, Observer<unknown>>();
  
  private id : number = 0;

  private socket : Observable<WebSocket>;
  
  registerObserver(observer : Observer<any>) : number{
    let id = this.id;
    while(this.observerMap.has(id)){
      id = this.id++;
    }
    this.observerMap.set(id, observer);
    return id;
  }

  removeObserver(id : number):void{
    this.observerMap.delete(id);
  }

  readwrite(commands: any[]) : Observable<any>{
    var observable = new  Observable((observer)=>{
      const id = this.registerObserver({
        next: x=>observer.next(x),
        error: e=>observer.error(e),
        complete: ()=>observer.complete()
        });
      this.socket.subscribe((socket:WebSocket)=>{
        socket.send(JSON.stringify({requestType:'ReadWrite', commands: commands, id:id}));
      });
      return ()=>{
        this.removeObserver(id);
      }
    });
    return observable;
  }
  
  subscription(commands: any[]):Observable<any>{
    const observable = new Observable((observer)=>{
      const id = this.registerObserver({
        next: x=>observer.next(x),
        error: e=>observer.error(e),
        complete: ()=> observer.complete()
      });
      this.socket.subscribe((socket:WebSocket)=>{
        socket.send(JSON.stringify({requestType:'Subscription', commands: commands, id:id, intervalTime:500}));
      });
      return ()=>{
        this.removeObserver(id);
        this.readwrite([{commandOptions:['SendWriteValue'], symbol:'Unsubscribe', writeValue:id}]).subscribe(completion=>{
        });
      }                 
    });
    return observable;
  }  
}
