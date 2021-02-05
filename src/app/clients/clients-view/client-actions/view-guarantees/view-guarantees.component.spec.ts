import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuaranteesComponent } from './view-guarantees.component';

describe('ViewGuarantorsComponent', () => {
  let component: ViewGuaranteesComponent;
  let fixture: ComponentFixture<ViewGuaranteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGuaranteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGuaranteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
