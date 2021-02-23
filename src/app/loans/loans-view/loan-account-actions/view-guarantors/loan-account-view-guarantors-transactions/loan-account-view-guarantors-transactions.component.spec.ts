import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccountViewGuarantorsTransactionsComponent } from './loan-account-view-guarantors-transactions.component';

describe('LoanAccountViewGuarantorsTransactionsComponent', () => {
  let component: LoanAccountViewGuarantorsTransactionsComponent;
  let fixture: ComponentFixture<LoanAccountViewGuarantorsTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAccountViewGuarantorsTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAccountViewGuarantorsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
