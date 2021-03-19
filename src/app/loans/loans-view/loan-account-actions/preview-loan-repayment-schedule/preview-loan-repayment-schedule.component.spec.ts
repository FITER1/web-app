import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewLoanRepaymentScheduleComponent } from './preview-loan-repayment-schedule.component';

describe('PreviewLoanRepaymentScheduleComponent', () => {
  let component: PreviewLoanRepaymentScheduleComponent;
  let fixture: ComponentFixture<PreviewLoanRepaymentScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewLoanRepaymentScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewLoanRepaymentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
