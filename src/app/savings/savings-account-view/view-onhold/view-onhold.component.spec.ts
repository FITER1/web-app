import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOnholdComponent } from './view-onhold.component';

describe('ViewOnholdComponent', () => {
  let component: ViewOnholdComponent;
  let fixture: ComponentFixture<ViewOnholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOnholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOnholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
