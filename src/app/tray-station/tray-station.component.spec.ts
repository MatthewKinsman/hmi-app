import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrayStationComponent } from './tray-station.component';

describe('TrayStationComponent', () => {
  let component: TrayStationComponent;
  let fixture: ComponentFixture<TrayStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrayStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrayStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
