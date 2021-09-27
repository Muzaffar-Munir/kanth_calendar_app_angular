import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  InsertedData: any= [];
  calendarData: any = [];
  calendarSelectedData: any= [];

  constructor() { }
}
