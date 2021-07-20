import { Component, OnDestroy, OnInit } from '@angular/core';
import { SymbolService } from '../services/Symbol/symbol.service';
import { map, take } from 'rxjs/operators';
import { Iv2Service } from '../services/Iv2/iv2.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-can-station',
  templateUrl: './can-station.component.html',
  styleUrls: ['./can-station.component.css']
})
export class CanStationComponent implements OnInit, OnDestroy {

  constructor(private symbolService : SymbolService, private inspection : Iv2Service) { }
  model = null;
  inspectionSummary = null;
  inspectionImage = null;

  canBrake = new Image();

  ngOnInit(): void {
    
    this.model = this.symbolService.createSubscription(['PLC1::MAIN::Machine::Can_Source::Crowder::_State', 
                                                        'PLC1::MAIN::Machine::Can_Source::Brake::_State',
                                                        'PLC1::MAIN::Machine::Can_Source::Brake::Inputs::Position']).pipe(map(x=>({crowderState:x[0], brakeState:x[1], brakePosition:x[2]})));
    this.inspectionSummary = this.inspection.getSummary();
    this.inspectionImage = this.inspection.getImage();

  }

  ngOnDestroy():void{
    //this.camera.unsubscribe();
  }

  onCrowderRequest(state : number):void{    
    this.symbolService.writeSymbol([{symbol: 'PLC1::MAIN::Machine::Can_Source::Manual::Crowder::StateReq', value:state}]).pipe(take(1)).subscribe(x=>console.log(x));
  }

  onBrakeRequest(state : number):void{
    this.symbolService.writeSymbol([{symbol: 'PLC1::MAIN::Machine::Can_Source::Manual::Brake::StateReq', value:state}]).pipe(take(1)).subscribe(x=>console.log(x));
  }

}
