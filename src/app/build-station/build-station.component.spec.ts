import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildStationComponent } from './build-station.component';

describe('BuildStationComponent', () => {
  let component: BuildStationComponent;
  let fixture: ComponentFixture<BuildStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
