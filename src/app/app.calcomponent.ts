import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, ViewChild, TemplateRef, HostBinding, HostListener } from '@angular/core';
import { startOfDay,  endOfDay,  subDays,  addDays,  endOfMonth,  isSameDay, isSameMonth,  addHours, addMinutes, endOfWeek } from 'date-fns';
import { Subject, fromEvent } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent,  CalendarEventAction,  CalendarEventTimesChangedEvent,  CalendarView } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { DayViewHourSegment } from 'calendar-utils';

import * as _ from 'underscore';

import { DataService } from "./data.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { CalendarService } from './service/calendar.service';
import { ModalViewEventComponent } from './modal-view-event/modal-view-event.component';

import {Apollo, gql} from 'apollo-angular';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  //styleUrls: ['styles.css'],
  templateUrl: 'app.calcomponent.html',
  styleUrls: ['app.apptcomponent.less']
})


export class DemoComponent implements OnInit {

  public param: any = { id: '' };
  viewDate: Date = new Date();
  
  
  cities: Array<any> = [];
  assignments: Array<any> = [];
  releases: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: any = {};

  constructor(private modal: NgbModal, private http: HttpClient, private router: Router, private activeroute: ActivatedRoute, private cdr: ChangeDetectorRef, private servicedata: DataService,
     private spinner: NgxSpinnerService, public clndrSrvc: CalendarService) {
   
  }
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  message: any;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  dragToCreateActive = false;


  public events: CalendarEvent[];
  public apptrooms;
  public apptroom = 0;


  ngOnInit() {


    this.cities = [
      { item_id: 1, item_text: 'New Delhi' },
      { item_id: 2, item_text: 'Mumbai' },
      { item_id: 3, item_text: 'Bangalore' },
      { item_id: 4, item_text: 'Pune' },
      { item_id: 5, item_text: 'Chennai' },
      { item_id: 6, item_text: 'Navsari' }
  ];
  this.assignments =  [
    { item_id: 1, item_text: 'None' },
  { item_id: 2, item_text: 'Ancillary Seats/Upsell' },
  { item_id: 3, item_text: 'Ancillary Bags' },
  { item_id: 4, item_text: 'Retail' },
  { item_id: 5, item_text: 'Flight Services' },
    { item_id: 6, item_text: 'Shopping' },
    { item_id: 7, item_text: 'Brand' }
];
this.releases =  [
  { item_id: 1, item_text: 'None' },
  { item_id: 2, item_text: 'Major' },
  { item_id: 3, item_text: 'Minor' },
  { item_id: 4, item_text: 'Patch' },
  { item_id: 5, item_text: 'Certificate' },
  { item_id: 6, item_text: 'Open Schedule window' }
];
  this.selectedItems = [{ item_id: 4, item_text: 'Retail' }];
  this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false
  };


    //this.viewDate = new Date('2017/10/14');
    console.log('on calendar')
    console.log(this.clndrSrvc.calendarData)


    //get preselected data

    this.roomSelection();

    if(this.clndrSrvc.calendarData && this.clndrSrvc.calendarData.length){
      // calls getAppointment to modify as data is already exits in service
      this.getAppointments(this.clndrSrvc.calendarData)
    } else {
      // calls room selection as data not exists in service
      this.roomSelection();
    }
    
   
    this.activeroute.params.subscribe(
      params => {        
        this.param.id = params['id'];
        //console.log(this.param.id);
      }
    );

  
  }

  getAppointments(data: any[]) {
    var context = { act: this.actions, param: this.param, viewDate: '' };
    var appts = [];
    
    console.log(data);
    
    _.each(data, function (num, index) {
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
     
    }, context);
    this.events = appts;
    
    this.refresh.next();
    

  }

  roomSelection() {  
        var data = [
          {
            "apptID": 1,
            "Clientname": "CHG093736",
            "Starttime": "2021-09-26T08:30:00",
            "Endtime": "2021-09-29T17:00:00",           
            "PrimaryColor": "#e28753",
            "SecondaryColor": "#e28753",
            "Deleted": false, 
            "environment":"1",
            "environmentdomain": "1",
            "rmdomain": "1"     
          },
          {
            "apptID": 2,
            "Clientname": "CHG726726",
            "Starttime": "2021-09-27T09:00:00",
            "Endtime": "2021-09-28T10:00:00",           
            "PrimaryColor": "#7ab6eb",
            "SecondaryColor": "#7ab6eb",
            "Deleted": false,
            "environment":"1",
            "environmentdomain": "1",
            "rmdomain": "1"
          },
          {
            "apptID": 3,
            "Clientname": "CHG735283",
            "Starttime": "2021-09-28T09:00:00",
            "Endtime": "2021-09-29T10:00:00",            
            "PrimaryColor": "#44d839",
            "SecondaryColor": "#44d839",
            "Deleted": false,   
            "environment":"1",
            "environmentdomain": "1",
            "rmdomain": "1"         
          },
          {
            "apptID": 4,
            "Clientname": "CHG273637",
            "Starttime": "2021-09-29T10:00:00",
            "Endtime": "2021-09-30T11:00:00",           
            "PrimaryColor": "#44d839",
            "SecondaryColor": "#44d839",
            "Deleted": false,  
            "environment":"1",
            "environmentdomain": "1",
            "rmdomain": "1"            
          }];
        this.getAppointments(data);
        this.clndrSrvc.calendarData = data;
        
  }

  activeDayIsOpen: boolean = true;  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('Here');
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<span class="fa fa-fw fa-times del"></span>',
     
      onClick: ({ event }: { event: CalendarEvent }): void => {
        
        this.handleEvent('Deleted', event);
      }
    }
  ];

  handleEvent(action?: string, event?: CalendarEvent): void {
   
    if(event && event.id){
     const findObj =  this.clndrSrvc.calendarData.find(element=> element.apptID ==event.id);
     console.log(findObj);
      this.clndrSrvc.calendarSelectedData = findObj;
      // this.router.navigate(['/addAppointment/' + event.id]);
     const modelRef =  this.modal.open(ModalViewEventComponent);
     modelRef.componentInstance.id = event.id;
    } else {
      // this.router.navigate(['/addAppointment']);
      this.router.navigate(['/add-events-types']);
    }
  }




  onItemSelect() {
    console.log('onItemSelect', this.selectedItems);
  }
  onDeSelect() {
    console.log('onDeSelect', this.selectedItems);
  }
}
