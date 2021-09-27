import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'underscore';
import * as moment from 'moment';
import { DataService } from "./data.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { CalendarService } from './service/calendar.service';
import { any } from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.addappointment.html',
  styleUrls: ['app.addappointment.css']
})


export class AddAppointment implements OnInit {
  public title = 'Calender';  
 
  public event: any = { 
    apptid: 0,
     editAppointment: false, 
     recurrentShow: true, 
     recurrentDates:[],
     startdate: null,
     enddate: null,
     rmdomain: null,
     environmentdomain: null,
     environment: null,
     releasecn: null,
    };

    public appointment: any = {
      apptID: _.random(20, 500),
      releaceCategory : null,
      type: 'Normal',
      environmentDomain: null,
      state: 'New',
      releaseNumber: null,
      conflictStatus: 'Not Run',
      category: null,
      assGroup: 'RevMgmt-ShoppingandBradningAPI',
      configItem: null,
      assignedTo: null,
      ciVersion: null,
      changeCoordinate: 'Jhonston,Gina',
      environment: 'Production',
      impact: '3-Low',
      priority: null,
      risk: '--None--',
      shortDescription: null,
      description: null,
      justification: null,
      isModified: null,
      requestedDate: null,
      startDate: null,
      endDate: null
    };
  public message: any;
  public sub: any;
  public validate: any = {};
  public login: any = {};

  itemId: any
  constructor(private http: HttpClient, private router: Router, private activeroute: ActivatedRoute, private servicedata: DataService, 
    private spinner: NgxSpinnerService, private clndrSrvc: CalendarService) {   
		
    this.event.editAppointment = false;    
	}

  ngOnInit() {
    this.activeroute.params.subscribe(params => {
      this.itemId = params.id;
    })

    // if(this.itemId  && this.clndrSrvc.calendarSelectedData && this.clndrSrvc.calendarSelectedData!=null){
    //   this.event.releasecn = this.clndrSrvc.calendarSelectedData.Clientname;
    //   this.event.startdate = moment(this.clndrSrvc.calendarSelectedData.Starttime).format().slice(0, 16);
    //   this.event.enddate =  moment(this.clndrSrvc.calendarSelectedData.Endtime).format().slice(0, 16);
    //   this.event.environment = this.clndrSrvc.calendarSelectedData.environment;
    //   this.event.rmdomain = this.clndrSrvc.calendarSelectedData.rmdomain;
    //   this.event.environmentdomain = this.clndrSrvc.calendarSelectedData.environmentdomain;
    //   // "environment": this.event.environment,
    //   // "environmentdomain": this.event.environmentdomain,
    //   // "rmdomain": this.event.rmdomain
    //   console.log(this.event);
    // }


     if(this.itemId  && this.clndrSrvc.calendarSelectedData && this.clndrSrvc.calendarSelectedData!=null){
       this.appointment = this.clndrSrvc.calendarSelectedData;
     }
  
  }

  getDisplayTime(chosenDate, chosenTime) {
    //console.log(JSON.stringify(chosenDate));
    if (chosenDate) {
      return moment(chosenDate.year + '-' + chosenDate.month + '-' + chosenDate.day + ' ' + chosenTime.hour + ':' + chosenTime.minute + ':' + chosenTime.second, "YYYY-MM-DD hh:mm:ss").add({ day: 1 });
    } else {
      return false;
    }
  }
  getrealTime(chosenDate, chosenTime) {
    //console.log(JSON.stringify(chosenTime));
    if (chosenDate) {
      return moment(chosenDate.year + '-' + chosenDate.month + '-' + chosenDate.day + ' ' + chosenTime.hour + ':' + chosenTime.minute + ':' + chosenTime.second, "YYYY-MM-DD hh:mm:ss");//.format();//.subtract({ hours: 13 }).add({ day: 1 });
    } 
  }

  backtoApptListing() {
    this.router.navigate(['/dashboard']);
  }

  createEvent(){
    console.log('we are here');
    console.log(this.event)
    const addedObj = {
      "apptID": this.appointment.apptID,
      "Clientname": this.appointment.releaseNumber,
      "Starttime": this.appointment.startDate,
      "Endtime":  this.appointment.endDate,           
      "Firstname": null,
      "Surname": null,               
      "Comments": null,
      "PrimaryColor": "#e28753",
      "SecondaryColor": "#e28753",
      "Deleted": false,    
      "environment": this.appointment.environment,
      "environmentdomain": this.appointment.environmentDomain,
      "rmdomain": this.appointment.assignedTo
    };
    if(this.appointment.assignedTo=='1'){
      addedObj.PrimaryColor ='#e28753';
      addedObj.SecondaryColor ='#e28753';
    } else if(this.appointment.assignedTo=='2'){
      addedObj.PrimaryColor ='#7ab6eb';
      addedObj.SecondaryColor ='#7ab6eb';
    } else if(this.appointment.assignedTo=='3'){
      addedObj.PrimaryColor ='#44d839';
      addedObj.SecondaryColor ='#44d839';
    } else if(this.appointment.assignedTo=='4'){
      addedObj.PrimaryColor ='#e28753';
      addedObj.SecondaryColor ='#e28753';
    } else if(this.appointment.assignedTo=='5'){
      addedObj.PrimaryColor ='#7ab6eb';
      addedObj.SecondaryColor ='#7ab6eb';
    } else if(this.appointment.assignedTo=='6'){
      addedObj.PrimaryColor ='#44d839';
      addedObj.SecondaryColor ='#44d839';
    }
    this.clndrSrvc.calendarData.push(addedObj);
    this.clndrSrvc.InsertedData.push(this.appointment);
    this.router.navigate(['/dashboard']);
    
  }

  id:any="Planning";
  tabChange(ids:any){
    this.id=ids;
  }

  SaveEntry(){

    const addedObj = {
      "apptID": this.appointment.apptID,
      "Clientname": this.appointment.releaseNumber,
      "Starttime": this.appointment.startDate,
      "Endtime":  this.appointment.endDate,           
      "Firstname": null,
      "Surname": null,               
      "Comments": null,
      "PrimaryColor": "#e28753",
      "SecondaryColor": "#e28753",
      "Deleted": false,    
      "environment": this.appointment.environment,
      "environmentdomain": this.appointment.environmentDomain,
      "rmdomain": this.appointment.assignedTo
    };
    if(this.appointment.assignedTo=='1'){
      addedObj.PrimaryColor ='#e28753';
      addedObj.SecondaryColor ='#e28753';
    } else if(this.appointment.assignedTo=='2'){
      addedObj.PrimaryColor ='#7ab6eb';
      addedObj.SecondaryColor ='#7ab6eb';
    } else if(this.appointment.assignedTo=='3'){
      addedObj.PrimaryColor ='#44d839';
      addedObj.SecondaryColor ='#44d839';
    } else if(this.appointment.assignedTo=='4'){
      addedObj.PrimaryColor ='#e28753';
      addedObj.SecondaryColor ='#e28753';
    } else if(this.appointment.assignedTo=='5'){
      addedObj.PrimaryColor ='#7ab6eb';
      addedObj.SecondaryColor ='#7ab6eb';
    } else if(this.appointment.assignedTo=='6'){
      addedObj.PrimaryColor ='#44d839';
      addedObj.SecondaryColor ='#44d839';
    }

   const calendarDataIndex = this.clndrSrvc.calendarData.findIndex(x => x.apptID == this.itemId);
   const insertedDataIndex = this.clndrSrvc.InsertedData.findIndex(x => x.apptID == this.itemId);
  
   console.log(calendarDataIndex)
   if(calendarDataIndex !='-1' && insertedDataIndex!='-1'){ 
    this.clndrSrvc.calendarData[calendarDataIndex] = addedObj;
    this.clndrSrvc.InsertedData[insertedDataIndex] = this.appointment;
    this.router.navigate(['/dashboard']);
   } else {
     alert('data not found. Please try again')
   }

  
   
   
  }

}
