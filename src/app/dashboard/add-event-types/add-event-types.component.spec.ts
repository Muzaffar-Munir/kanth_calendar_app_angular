import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventTypesComponent } from './add-event-types.component';

describe('AddEventTypesComponent', () => {
  let component: AddEventTypesComponent;
  let fixture: ComponentFixture<AddEventTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
