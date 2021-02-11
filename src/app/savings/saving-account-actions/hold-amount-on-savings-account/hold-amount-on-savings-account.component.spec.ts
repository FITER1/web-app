import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldAmountOnSavingsAccountComponent } from './hold-amount-on-savings-account.component';

describe('HoldAmountOnSavingsAccountComponent', () => {
  let component: HoldAmountOnSavingsAccountComponent;
  let fixture: ComponentFixture<HoldAmountOnSavingsAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldAmountOnSavingsAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldAmountOnSavingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
