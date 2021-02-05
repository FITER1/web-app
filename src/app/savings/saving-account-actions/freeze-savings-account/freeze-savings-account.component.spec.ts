import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeSavingsAccountComponent } from './freeze-savings-account.component';

describe('FreezeSavingsAccountComponent', () => {
  let component: FreezeSavingsAccountComponent;
  let fixture: ComponentFixture<FreezeSavingsAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreezeSavingsAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezeSavingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
