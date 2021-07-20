import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { ProjectData } from './project-data';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private http : HttpClient) {

   }

   getProjects() : Observable<ProjectData[]>{
      return this.http.get<any>('/projects/.prj').pipe(map(x=>x.projects));
      //return new Observable<ProjectData[]>((observer)=>{
      //  observer.next([{path:'C:\Recipes\Standard 355.prj', name:'Standard 355', modified: new Date()},{path:'C:\Recipes\Standard 473.prj', name:'Standard 473', modified:new Date()}]);
      //});
   }

   getProject(name : string):Observable<any>{
     return this.http.get<any>(`/projects/${name}.prj`);
   }
}
