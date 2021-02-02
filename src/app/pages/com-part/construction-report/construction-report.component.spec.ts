import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionReportComponent } from './construction-report.component';

describe('ConstructionReportComponent', () => {
  let component: ConstructionReportComponent;
  let fixture: ComponentFixture<ConstructionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
