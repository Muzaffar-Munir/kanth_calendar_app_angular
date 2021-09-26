import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { bootstrap } from 'bootstrap';
import { AppComponent } from './app.apptcomponent';

import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DemoComponent } from './app.calcomponent';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AddAppointment } from './app.addappointment';

import { FilterPipe } from './filter.pipe';
import { NgbdDatepickerPopup } from './datepicker-popup';
import { NgbdTimepickerBasic } from './timepicker-basic';
import { DataService } from "./data.service";

import { NgxSpinnerModule } from 'ngx-spinner';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


const routes: Routes = [
  { path: '', redirectTo: '/listing', pathMatch: 'full' },  
  { path: 'login', component: AppComponent },
  { path: 'dashboard', component: DemoComponent },
  { path: 'dashboard/:id', component: DemoComponent },

  { path: 'addAppointment', component: AddAppointment },
  { path: 'addAppointment/:id', component: AddAppointment }
];

@NgModule({
    declarations: [AppComponent, DemoComponent,  AddAppointment, FilterPipe, NgbdDatepickerPopup, NgbdTimepickerBasic ],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(routes, { enableTracing: false, useHash: true }), CommonModule, FormsModule, NgbModule, FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgxSpinnerModule,
    ColorPickerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [RouterModule], 
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
