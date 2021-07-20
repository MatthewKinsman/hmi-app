import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessageListComponent } from './message-list/message-list.component';
import { CollapseComponent } from './collapse/collapse.component';
import { ColumnHeaderComponent } from './message-list/column-header/column-header.component';
import { ResizableDirective } from './resizable.directive';
import { BuildViewComponent } from './build-view/build-view.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ExpandDirective } from './expand.directive';
import { TrayStationComponent } from './tray-station/tray-station.component';
import { MachineComponent } from './machine/machine.component';
import { ActuatorStatePipe } from './actuator-state.pipe';
import { ModuleStatePipe } from './module-state.pipe';
import { CanStationComponent } from './can-station/can-station.component';
import { CaseStationComponent } from './case-station/case-station.component';
import { BuildStationComponent } from './build-station/build-station.component';
import { RobotComponent } from './robot/robot.component';
import { ProjectLoaderComponent } from './project-loader/project-loader.component';
import { ProjectDisplayComponent } from './project-display/project-display.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageListComponent,
    CollapseComponent,
    ColumnHeaderComponent,
    ResizableDirective,
    BuildViewComponent,
    ProjectListComponent,
    ExpandDirective,
    TrayStationComponent,
    MachineComponent,
    ActuatorStatePipe,
    ModuleStatePipe,
    CanStationComponent,
    CaseStationComponent,
    BuildStationComponent,
    RobotComponent,
    ProjectLoaderComponent,
    ProjectDisplayComponent,
    BarGraphComponent,
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
