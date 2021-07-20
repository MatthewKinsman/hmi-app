import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildStationComponent } from './build-station/build-station.component';
import { CanStationComponent } from './can-station/can-station.component';
import { CaseStationComponent } from './case-station/case-station.component';
import { HomeComponent } from './home/home.component';
import { MachineComponent } from './machine/machine.component';
import { ProjectDisplayComponent } from './project-display/project-display.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RobotComponent } from './robot/robot.component';
import { TrayStationComponent } from './tray-station/tray-station.component';


const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path: 'home' , component:HomeComponent},
  {path: 'operating/productchange/list' , component:ProjectListComponent},
  {path: 'operating/productchange/display' , component:ProjectDisplayComponent},
  {path: 'machine', component:MachineComponent},
  {path:'machine/traystation', component:TrayStationComponent},
  {path:'machine/canstation', component:CanStationComponent},
  {path:'machine/casestation', component:CaseStationComponent},
  {path:'machine/buildstation', component:BuildStationComponent},
  {path:'machine/robot', component:RobotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
