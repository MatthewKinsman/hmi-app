import { AfterViewInit, Component, ElementRef, Input, OnInit,OnChanges, ViewChild, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit, AfterViewInit, OnChanges {

  constructor() { }

  @ViewChild('Canvas') canvas : ElementRef;
  @Input('value') value : Number = 0;
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit():void{
    //console.log(this.canvas);
    //this.canvas.nativeElement.width = this.canvas.nativeElement.height;

    let context = this.canvas.nativeElement.getContext('2d');
    
    let path = new Path2D();
    path.moveTo(0,250);
    path.lineTo(20,250);
    path.lineTo(20,0);
    path.lineTo(0,10);
    path.closePath();
    
    let bar = new Path2D();
    bar.moveTo(24,250);
    bar.lineTo(264,250);
    bar.lineTo(264,45);
    bar.lineTo(24,0);
    bar.closePath();
    context.fill(path, 'evenodd');
    context.fill(bar, 'evenodd');
    
  }
  ngOnChanges(changes : SimpleChanges) : void{
    console.log(changes.value.currentValue);
  }

  drawGraph():void{
    let context = this.canvas.nativeElement.getContext('2d');
    let bar = new Path2D();
    //bar.moveTo()    
  }
}
