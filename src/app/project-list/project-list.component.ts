import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProjectData } from '../services/ProjectData/project-data';
import { ProjectDataService } from '../services/ProjectData/project-data.service';
import { SymbolService } from '../services/Symbol/symbol.service';
import {Observable} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private projectService : ProjectDataService, private router : Router, private route : ActivatedRoute, private symbolService : SymbolService) { }

  projects : Observable<ProjectData[]>;
  selected? : ProjectData = null;
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects():void{
    this.projects = this.projectService.getProjects();
  }

  onSelect(project : ProjectData):void{
    this.selected = project;
    console.log(project);
  }

  onLoad():void{
    //this,this.symbolService.createSubscription([{symbol:"PLC1::Slow_Main::Load"}]).subscribe
    
    this.symbolService.writeSymbol([{symbol:"PLC1::Slow_Main::Load", value: {Error:0, Execute:true, Path:this.selected.path}}]).subscribe(x=>{
      alert(`Loaded ${this.selected.name}`);
    });
  }

  onNext():void{
    this.router.navigate(['../display'], {state:{project: this.selected}, relativeTo:this.route});
  }
}
