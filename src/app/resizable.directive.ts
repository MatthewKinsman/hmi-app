import { AfterViewInit, Directive, ElementRef, Input, OnInit,  Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable, Subject} from 'rxjs'

@Directive({
  exportAs: 'resizable',
  selector: 'resizable, [resizable]',
})
export class ResizableDirective implements OnInit, AfterViewInit {
  private startX: number;
  private startWidth : number;
  private listener;
  
  constructor(private element: ElementRef ,private renderer : Renderer2) { 

  }
 
  width = new BehaviorSubject<number>(0);

  ngOnInit(): void{
    const drag = this.renderer.createElement("span");
    this.renderer.addClass(drag, "resize-holder");
    this.renderer.listen(drag, "mousedown", this.onMouseDown);
    this.renderer.listen(drag, "touchstart", ()=>{
      alert('touch start');
    });
    this.renderer.appendChild(this.element.nativeElement, drag);
  }
  
  ngAfterViewInit():void{
    console.log('Width is'+this.element.nativeElement.offsetWidth);
    this.width.next(this.element.nativeElement.offsetWidth);
  }

  onMouseDown=(event:MouseEvent)=>{
    this.startWidth = this.element.nativeElement.offsetWidth;
    this.startX = event.pageX;
    this.listener = this.renderer.listen(document, "mouseup", this.onMouseUp);
    this.listener = this.renderer.listen(document, "mousemove", this.onMouseMove);
  }
  onMouseMove=(event:MouseEvent)=>{
    if (event.buttons){
      //console.log(`${this.startWidth+(event.pageX-this.startX)}px`);
      this.renderer.setStyle(this.element.nativeElement, "width", `${this.startWidth+(event.pageX-this.startX)}px`);
      this.width.next(this.startWidth+(event.pageX-this.startX));
    }
  }

  onMouseUp=(event:MouseEvent)=>{
    if(this.listener){
      this.listener();
    }
  }
}
