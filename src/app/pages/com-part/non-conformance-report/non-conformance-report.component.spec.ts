import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonConformanceReportComponent } from './non-conformance-report.component';

describe('NonConformanceReportComponent', () => {
  let component: NonConformanceReportComponent;
  let fixture: ComponentFixture<NonConformanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonConformanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonConformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
