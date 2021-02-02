import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionActivitiesComponent } from './construction-activities.component';

describe('ConstructionActivitiesComponent', () => {
  let component: ConstructionActivitiesComponent;
  let fixture: ComponentFixture<ConstructionActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
