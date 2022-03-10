import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusDistributionComponent } from './surplus-distribution.component';

describe('SurplusDistributionComponent', () => {
  let component: SurplusDistributionComponent;
  let fixture: ComponentFixture<SurplusDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurplusDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurplusDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
