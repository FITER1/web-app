import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMakerCheckerTaskComponent } from './view-maker-checker-task.component';

describe('ViewMakerCheckerTaskComponent', () => {
  let component: ViewMakerCheckerTaskComponent;
  let fixture: ComponentFixture<ViewMakerCheckerTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMakerCheckerTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMakerCheckerTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
