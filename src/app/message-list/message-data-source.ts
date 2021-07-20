import{CollectionViewer, DataSource} from '@angular/cdk/collections';
import{Subscription, BehaviorSubject, Observable} from 'rxjs';
import{WebsocketService} from'../services/websocket.service';

export class MessageDataSource extends DataSource<number> {
    private subscription = new Subscription();
    private dataStream = new BehaviorSubject<any[]>([]);

    private currentRequest : Subscription;
    constructor(private webSocket: WebsocketService){
        super();
    }
    
    connect(collectionViewer : CollectionViewer): Observable<any[]>{
        this.loadMessages(0);
        
        this.subscription.add(collectionViewer.viewChange.subscribe(range=>{
            this.currentRequest?.unsubscribe();
            this.loadMessages(range.start);
        }));
        return this.dataStream;
    }
    
    private loadMessages(index: number){
        this.currentRequest = this.webSocket.subscription([{symbol:'ListEvents', offset: index, limit: 70, filter:[{path:'domain',comparator:'==',value:'TcHmiEventLogger'}]}]).subscribe(response=>{
            // Parse Message Data
            const messages = Array.from({length: response[0].maxEntries});
            messages.splice(index, response[0].readValue.length, ...response[0].readValue.map((message, i)=>({value: message.localizedString, index: index+i, in : message.payload.timeRaised, out: message.payload.timeCleared})));
            this.dataStream.next(messages);
        });
    }

    disconnect():void{
        this.currentRequest?.unsubscribe();
        this.subscription.unsubscribe();
    }
    
}
