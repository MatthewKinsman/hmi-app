import { Directive, ElementRef, AfterViewInit} from '@angular/core';


@Directive({
  exportAs: 'expand',
  selector: 'expand, [expand]'
})
export class ExpandDirective implements AfterViewInit{

  constructor(private element : ElementRef)  {
    
   }
   
    ngAfterViewInit() : void{
      this.expandSize =this.element.nativeElement.scrollHeight; 
      console.log(this.expandSize);

    }

    toggleState  : boolean;
    
    expandSize : number;
    setExpand(expanded : boolean){
      this.toggleState = expanded;
    }
    
    get expand():number{
      //console.log(this.element.nativeElement);
      return this.toggleState?this.expandSize:0;
    }
    
}
