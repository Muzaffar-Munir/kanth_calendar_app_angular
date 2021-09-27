import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventsTypesComponent } from './add-events-types.component';

describe('AddEventsTypesComponent', () => {
  let component: AddEventsTypesComponent;
  let fixture: ComponentFixture<AddEventsTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventsTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
