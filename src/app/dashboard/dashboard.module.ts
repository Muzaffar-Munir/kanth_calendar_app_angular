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
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalViewEventComponent } from './modal-view-event/modal-view-event.component';


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
    path: 'add-event/:id',
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
    AddEventTypesComponent,
    ModalViewEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TabsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class DashboardModule { }
