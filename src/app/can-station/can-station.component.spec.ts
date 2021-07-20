import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanStationComponent } from './can-station.component';

describe('CanStationComponent', () => {
  let component: CanStationComponent;
  let fixture: ComponentFixture<CanStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
