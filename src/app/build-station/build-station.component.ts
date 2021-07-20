import { Component, OnInit } from '@angular/core';
import { SymbolService } from '../services/Symbol/symbol.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-build-station',
  templateUrl: './build-station.component.html',
  styleUrls: ['./build-station.component.css']
})
export class BuildStationComponent implements OnInit {

  constructor(private symbolService : SymbolService) { }
  model = null;

  ngOnInit(): void {
    this.model = this.symbolService.createSubscription(['PLC1::MAIN::Machine::Tray_Sink::__TRAY_SINK_TYPE__EXECUTE__INDEX', 'PLC1::MAIN::Machine::Tray_Sink::Interlock::Target::_position']).pipe(
      map(x=>({index:x[0], target:x[1]}))
    );
  }

}
