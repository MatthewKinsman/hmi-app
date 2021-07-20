import { Component, ElementRef, Input, OnInit } from '@angular/core';
import{
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css'],
  animations:[
    trigger('collapse',
    [
      state('false',style({height: AUTO_STYLE})),
      state('true', style({height : 0})),
      transition('false=>true', animate('{{time}}ms linear')),
      transition('true=>false', animate('{{time}}ms linear'))  
    ])
  ]
})
export class CollapseComponent implements OnInit {
  @Input() collapsed : boolean;
  constructor(private element: ElementRef) { }

  ngOnInit(): void {
  }
  get height():number{
    return this.element.nativeElement.offsetHeight;
  }
}
