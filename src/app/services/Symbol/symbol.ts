import {Observable, BehaviorSubject, Subject} from 'rxjs';
import { SymbolService } from './symbol.service';

export class Symbol {
    constructor(private symbolService : SymbolService) { }
    private subject : BehaviorSubject<any> = new BehaviorSubject<any>(null);
    get value():Observable<any>{
        return this.subject;
    }
    write(value : any){

    }
}
