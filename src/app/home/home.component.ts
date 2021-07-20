import { Component, OnInit } from '@angular/core';
import { ScratchPadService } from '../services/scratch-pad.service';
import {SymbolService} from'../services/Symbol/symbol.service';
import {map} from 'rxjs/operators';
import { WebsocketService } from '../services/websocket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private symbol : SymbolService, private scratchPad : ScratchPadService, private webSocket : WebsocketService) { }

  data = null;
  
  ngOnInit(): void {
    //this.webSocket.readwrite([{symbol:'GetDefinitions'}]).subscribe(x=>console.log(x));
    /*this.symbol.writeSymbol([{symbol:'ADS.AdsSyncReadWriteReq', value:{IndexGroup:0xF003, IndexOffset:0, ReadLen:4, WriteData:btoa('Slow_Main.pCurrent_Project^'), Runtime:'PLC1'}}]).subscribe(x=>{
      let a = atob(x[0].readValue);
      let b = 0;
      console.log(a.charCodeAt(3));
      console.log(a.charCodeAt(2));
      console.log(a.charCodeAt(1));
      console.log(a.charCodeAt(0));
      b = b| a.charCodeAt(3);
      b = b<<8;
      b = b| a.charCodeAt(2);
      b = b<<8;
      b |= a.charCodeAt(1);
      b = b<<8;
      b |= a.charCodeAt(0);
      console.log(b);
      this.symbol.writeSymbol([{symbol:'ADS.AdsSyncReadReq',value:{IndexGroup:0xF005, IndexOffset:b,ReadLen:43391, Runtime:'PLC1'}}]).pipe(map(x=>JSON.parse(atob(x[0].readValue)))).subscribe(x=>console.log(x));
    })
    this.data = this.scratchPad.createSubscription(['PLC1::Slow_Main::pCurrent_Project']).pipe(map(x=>({value:x[0]})));*/
  }

  
}
