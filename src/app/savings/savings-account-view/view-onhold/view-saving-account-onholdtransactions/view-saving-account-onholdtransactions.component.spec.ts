import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSavingAccountOnholdtransactionsComponent } from './view-saving-account-onholdtransactions.component';

describe('ViewSavingAccountOnholdtransactionsComponent', () => {
  let component: ViewSavingAccountOnholdtransactionsComponent;
  let fixture: ComponentFixture<ViewSavingAccountOnholdtransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSavingAccountOnholdtransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSavingAccountOnholdtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
