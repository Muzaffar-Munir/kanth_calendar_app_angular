import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  InsertedData: any= [];
  calendarData: any = [];
  calendarSelectedData: any= [];
  constructor( private apollo: Apollo) { }

  QueryGraphQL(query: any){
    return  this.apollo
      .watchQuery({
        query: gql `{${query}

        }`}).valueChanges;
  }
}
