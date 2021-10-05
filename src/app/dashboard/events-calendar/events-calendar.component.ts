import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';
import { ModalViewEventComponent } from '../modal-view-event/modal-view-event.component';


@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrls: ['./events-calendar.component.css']
})
export class EventsCalendarComponent implements OnInit {

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: any = {
    action: '',
    event: null
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  public param: any = { id: '' };

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: this.colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: this.colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: this.colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: this.colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private apollo: Apollo, private router: Router, 
    private clndrSrvc: CalendarService) {}

  
  ngOnInit() {
    

    if(this.clndrSrvc.calendarData && this.clndrSrvc.calendarData.length){
      // calls getAppointment to modify as data is already exits in service
      this.getAppointments(this.clndrSrvc.calendarData)
    } else {
      // calls room selection as data not exists in service
      // this.roomSelection();
    }
  }

  getAppointments(data: any[]) {
    var context = { act: this.actions, param: this.param, viewDate: '' };
    const appts: any = [];
    
    console.log(data);
    data.forEach(num => {
      appts.push({
        "id": num.apptID,
        "start": new Date(num.Starttime),
        "end": new Date(num.Endtime),
        
        "title": num.Clientname,
        "color": {
          "primary": num.PrimaryColor,
          "secondary": num.SecondaryColor
        },
        "resizable": {
          beforeStart: true,
          afterEnd: true
        },
        "draggable": true
        
      });    
    });
    
    // _.each(data, function (num, index) {
    //   appts.push({
    //     "id": num.apptID,
    //     "start": new Date(num.Starttime),
    //     "end": new Date(num.Endtime),
        
    //     "title": num.Clientname,
    //     "color": {
    //       "primary": num.PrimaryColor,
    //       "secondary": num.SecondaryColor
    //     },
    //     "resizable": {
    //       beforeStart: true,
    //       afterEnd: true
    //     },
    //     "draggable": true
        
    //   });     
     
    // }, context);
    this.events = appts;
    
    this.refresh.next();
    

  }


  graphQLcall(){
    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //       {
    //         configUI(filterBy: {releaseCategory:"Major",assignmentGrp:"RetailAPI",env:"PROD"}) 
    //         { 
    //           UISchema_id
    //           releaseCategory
    //           assignmentGrp
    //           env
    //           assignmentGrp
    //           colorCode
    //           function
    //           createdAt
    //           updatedAt
    //       }
    //       }
    //     `,
    //   })
    //   .valueChanges.subscribe((result: any) => {
    //     console.log(result);
    //     // this.rates = result?.data?.rates;
    //     // this.loading = result.loading;
    //     // this.error = result.error;
    //   });

  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action?: string, event?: CalendarEvent): void {
    this.modalData = { event, action };
    console.log(action,  event);
    if(event && action){
      // this.modal.open(this.modalContent, { size: 'lg' });
      const findObj =  this.clndrSrvc.InsertedData.find((element: any)=> element.apptID ==event.id);
      console.log(findObj);
       this.clndrSrvc.calendarSelectedData = findObj;
       const modelRef =  this.modal.open(ModalViewEventComponent, { size: 'xl' });
       modelRef.componentInstance.id = event.id;
    } else {
      this.router.navigate(['/dashboard/add-event']);
    }
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
