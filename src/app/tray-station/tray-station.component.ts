import { Component, OnInit } from '@angular/core';
import { SymbolService } from '../services/Symbol/symbol.service';
import {take, map} from 'rxjs/operators';

@Component({
  selector: 'app-tray-station',
  templateUrl: './tray-station.component.html',
  styleUrls: ['./tray-station.component.css']
})
export class TrayStationComponent implements OnInit {

  constructor(private symbolService : SymbolService) { }

  model = null;

  ngOnInit(): void {
    this.model = this.symbolService.createSubscription(['PLC1::MAIN::Machine::Can_Sink::Step', 
                                                        'PLC1::MAIN::Machine::Can_Sink::Crowder::_State', 
                                                        'PLC1::MAIN::Machine::Can_Sink::Manual::Crowder::Enable',
                                                        'PLC1::MAIN::MAchine::Can_Sink::Manual::Stopper::Enable'                                                        
                                                      ]).pipe(map(x=>({step:x[0], 
                                                                       crowderState:x[1], 
                                                                       manual:{
                                                                         crowderEnable:x[2],
                                                                         stopperEnable:x[3]
                                                                        }})));
  }

  onCrowderRequest(state : number) : void{
    this.symbolService.writeSymbol([{symbol:'PLC1::MAIN::Machine::Can_Sink::Manual::Crowder::StateReq', value:state}]).pipe(take(1)).subscribe(x=>console.log(x));
  }

  onStopperRequest(state : number) : void{
    this.symbolService.writeSymbol([{symbol:'PLC1::MAIN::Machine::Can_Sink::Manual::Stoppers::StateReq', value:state}]).pipe(take(1)).subscribe(x=>console.log(x));
  }
}
