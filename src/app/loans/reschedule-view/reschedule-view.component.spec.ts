import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleViewComponent } from './reschedule-view.component';

describe('RescheduleViewComponent', () => {
  let component: RescheduleViewComponent;
  let fixture: ComponentFixture<RescheduleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
