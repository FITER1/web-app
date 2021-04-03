import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBulkSmsComponent } from './send-bulk-sms.component';

describe('SendBulkSmsComponent', () => {
  let component: SendBulkSmsComponent;
  let fixture: ComponentFixture<SendBulkSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendBulkSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBulkSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
