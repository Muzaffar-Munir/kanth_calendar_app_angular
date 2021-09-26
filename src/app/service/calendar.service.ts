import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  calendarData: any= [];
  calendarSelectedData: any= [];

  constructor() { }
}
