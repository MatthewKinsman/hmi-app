import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MessageDataSource } from './message-data-source';
import {WebsocketService} from '../services/websocket.service';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  
  @ViewChild('viewport') viewport;
  @ViewChild('header') header : ElementRef;

  
  constructor(private webSocket :  WebsocketService) { }
  
  dataSource = new MessageDataSource(this.webSocket);

  ngOnInit(): void {
  }
  ngAfterViewInit():void{
      this.viewport.elementScrolled().subscribe(scrolled=>{
      this.header.nativeElement.scrollLeft = scrolled.target.scrollLeft;
      console.log(scrolled.target.scrollLeft);
    });
  }
}
