import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherSiteComponent } from './other-site.component';

describe('OtherSiteComponent', () => {
  let component: OtherSiteComponent;
  let fixture: ComponentFixture<OtherSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
