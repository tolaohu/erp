import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressPicturesComponent } from './progress-pictures.component';

describe('ProgressPicturesComponent', () => {
  let component: ProgressPicturesComponent;
  let fixture: ComponentFixture<ProgressPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
