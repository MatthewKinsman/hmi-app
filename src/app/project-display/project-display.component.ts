import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectData } from '../services/ProjectData/project-data';
import { ProjectDataService } from '../services/ProjectData/project-data.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { SymbolService } from '../services/Symbol/symbol.service';
import { EMPTY, Observable, of } from 'rxjs';


@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.css']
})
export class ProjectDisplayComponent implements OnInit {

  constructor(private router : Router, private projectService : ProjectDataService, private symbolService : SymbolService) { 
    this.project = this.router.getCurrentNavigation().extras.state.project as ProjectData;
  }
  project : ProjectData;
  data = null;
  loadStatus = null;
  ngOnInit(): void {
    this.data = this.projectService.getProject(this.project?.name).pipe(
      map(x=>({layers : x.traySink.pattern.layers.length, cases: x.traySink.pattern.layers.reduce((sum,x)=>sum+x.targets.length,0)})));
  }
  onLoad():void{ 

    this.loadStatus = this.symbolService.writeSymbol([{symbol : 'PLC1::Slow_Main::File_Manager::Load_Project', value:{Path:this.project.path}}]).pipe(switchMap(
      x=>x[0].readValue?this.symbolService.createSubscription(['PLC1::Slow_Main::File_Manager::Load']).pipe(mergeMap(x=>x[0]), map((x:any)=>x.Execute?'Loading...':x.Error==0?'Loaded':'Error')): of('Loading Failed')));
    //this.symbolService.writeSymbol([{symbol : 'PLC1::Slow_Main::File_Manager::Load_Project', value:{Path:this.project.path}}]).pipe(map(x=>x[0].readValue)).subscribe(x=>{
    //  if(x){
    //    this.symbolService.createSubscription(['PLC1::Slow_Main::File_Manager::Load']).pipe(mergeMap(x=>x[0])).subscribe(x=>console.log(x));
    //  }
    //});
  }
}
