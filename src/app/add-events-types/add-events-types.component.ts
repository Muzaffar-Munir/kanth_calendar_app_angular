import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-events-types',
  templateUrl: './add-events-types.component.html',
  styleUrls: ['./add-events-types.component.less']
})
export class AddEventsTypesComponent implements OnInit {

  constructor( private spinner: NgxSpinnerService,) { }

  ngOnInit() {
  }

}
