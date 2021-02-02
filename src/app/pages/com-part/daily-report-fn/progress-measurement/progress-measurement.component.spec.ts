import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressMeasurementComponent } from './progress-measurement.component';

describe('ProgressMeasurementComponent', () => {
  let component: ProgressMeasurementComponent;
  let fixture: ComponentFixture<ProgressMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
