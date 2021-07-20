import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStationComponent } from './case-station.component';

describe('CaseStationComponent', () => {
  let component: CaseStationComponent;
  let fixture: ComponentFixture<CaseStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
