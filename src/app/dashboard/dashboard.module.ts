import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEventComponent } from './add-event/add-event.component';
import { AddEventTypesComponent } from './add-event-types/add-event-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes= [
  {
    path: '',
    component: EventsCalendarComponent
  },
  {
    path: 'add-event',
    component: AddEventComponent
  },
  {
    path: 'add-event-types',
    component: AddEventTypesComponent
  },
  {
    path: '*',
    component: EventsCalendarComponent
  }
];

@NgModule({
  declarations: [
    EventsCalendarComponent,
    AddEventComponent,
    AddEventTypesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class DashboardModule { }
