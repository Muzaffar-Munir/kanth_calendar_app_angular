import { Component } from '@angular/core';


@Component({
  selector: 'ngbd-timepicker-basic',
  template: ''//'<div class="time"><ngb-timepicker minuteStep="15" size="small" [(ngModel)]="time"></ngb-timepicker></div>',
  //styles: ['.time{margin: -29px 38px;}']
})
export class NgbdTimepickerBasic {
  time = { hour: 7, minute: 0 };
  meridian = false;
}
