import { Component, OnInit } from '@angular/core';
import { SymbolService } from '../services/Symbol/symbol.service';
import {map, take} from 'rxjs/operators';
@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css']
})
export class RobotComponent implements OnInit {

  model = null;

  constructor(private symbolService : SymbolService) { }

  ngOnInit(): void {
    this.model = this.symbolService.createSubscription(['PLC1::MAIN::Machine::Robot::Can_Gripper::Bank[0]::Inputs::Pressure', 'PLC1::MAIN::Machine::Robot::Can_Gripper::Bank[1]::Inputs::Pressure','PLC1::MAIN::Machine::Robot::Tray_Gripper::__TRAY_GRIPPER_TYPE__CLOSE_REQUEST__USE_SUPPORT']).pipe(
      map(x=>({canGripper:{bank:[{pressure:x[0]},{pressure:x[1]}]}, trayGripper:{canSupport:x[2].pipe(map(x=>x?'Enabled':'Disabled'))}}))
    )
  }
  
  onDisableSupport(): void{
    this.symbolService.writeSymbol([{symbol:'PLC1::MAIN::Machine::Robot::Tray_Gripper::__TRAY_GRIPPER_TYPE__CLOSE_REQUEST__USE_SUPPORT',value:false},{symbol:'PLC1::MAIN::Machine::Robot::Tray_Gripper::Can_Support::StateReq',value:1} ]).pipe(take(1)).subscribe(x=>console.log(x));
  }
  onEnableSupport():void{
    this.symbolService.writeSymbol([{symbol:'PLC1::MAIN::Machine::Robot::Tray_Gripper::__TRAY_GRIPPER_TYPE__CLOSE_REQUEST__USE_SUPPORT',value:true}]).pipe(take(1)).subscribe(x=>console.log(x));
  }
}
