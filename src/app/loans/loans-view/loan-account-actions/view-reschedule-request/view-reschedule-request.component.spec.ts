import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRescheduleRequestComponent } from './view-reschedule-request.component';

describe('ViewRescheduleRequestComponent', () => {
  let component: ViewRescheduleRequestComponent;
  let fixture: ComponentFixture<ViewRescheduleRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRescheduleRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRescheduleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
