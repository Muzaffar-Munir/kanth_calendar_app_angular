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
  templateUrl: './app.ServieNow.html'
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

    if(this.itemId  && this.clndrSrvc.calendarSelectedData && this.clndrSrvc.calendarSelectedData!=null){
      this.event.releasecn = this.clndrSrvc.calendarSelectedData.Clientname;
      this.event.startdate = moment(this.clndrSrvc.calendarSelectedData.Starttime).format().slice(0, 16);
      this.event.enddate =  moment(this.clndrSrvc.calendarSelectedData.Endtime).format().slice(0, 16);
      this.event.environment = this.clndrSrvc.calendarSelectedData.environment;
      this.event.rmdomain = this.clndrSrvc.calendarSelectedData.rmdomain;
      this.event.environmentdomain = this.clndrSrvc.calendarSelectedData.environmentdomain;
      // "environment": this.event.environment,
      // "environmentdomain": this.event.environmentdomain,
      // "rmdomain": this.event.rmdomain
      console.log(this.event);
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
      "apptID": _.random(20, 500),
      "Clientname": this.event.releasecn,
      "Starttime": this.event.startdate,
      "Endtime":  this.event.enddate,           
      "Firstname": null,
      "Surname": null,               
      "Comments": null,
      "PrimaryColor": "#e28753",
      "SecondaryColor": "#e28753",
      "Deleted": false,    
      "environment": this.event.environment,
      "environmentdomain": this.event.environmentdomain,
      "rmdomain": this.event.rmdomain
    };
    if(this.event.rmdomain=='1'){
      addedObj.PrimaryColor ='#e28753';
      addedObj.SecondaryColor ='#e28753';
    } else if(this.event.rmdomain=='2'){
      addedObj.PrimaryColor ='#7ab6eb';
      addedObj.SecondaryColor ='#7ab6eb';
    } else if(this.event.rmdomain=='3'){
      addedObj.PrimaryColor ='#0ff5e9';
      addedObj.SecondaryColor ='#0ff5e9';
    } else if(this.event.rmdomain=='4'){
      addedObj.PrimaryColor ='#e678fa';
      addedObj.SecondaryColor ='#e678fa';
    } else if(this.event.rmdomain=='5'){
      addedObj.PrimaryColor ='#fcfc00';
      addedObj.SecondaryColor ='#fcfc00';
    } else if(this.event.rmdomain=='6'){
      addedObj.PrimaryColor ='#ff3030';
      addedObj.SecondaryColor ='#ff3030';
    }
    this.clndrSrvc.calendarData.push(addedObj);
    this.router.navigate(['/dashboard']);
    
  }
  
}
