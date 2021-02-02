import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyReportAltComponent } from './daily-report-alt.component';

describe('DailyReportAltComponent', () => {
  let component: DailyReportAltComponent;
  let fixture: ComponentFixture<DailyReportAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyReportAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyReportAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
