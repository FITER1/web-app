import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduledScheduleComponent } from './rescheduled-schedule.component';

describe('RescheduledScheduleComponent', () => {
  let component: RescheduledScheduleComponent;
  let fixture: ComponentFixture<RescheduledScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduledScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescheduledScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
