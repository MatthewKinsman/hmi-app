import { AfterViewInit, Component, ElementRef, OnInit, Input } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs'

@Component({
  selector: 'app-column-header',
  templateUrl: './column-header.component.html',
  styleUrls: ['./column-header.component.css']
})

export class ColumnHeaderComponent implements OnInit, AfterViewInit {
  public columnWidth = new BehaviorSubject<number>(0);
  constructor(private element: ElementRef) { }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.columnWidth.next(this.element.nativeElement.offsetWidth);
  }

}
