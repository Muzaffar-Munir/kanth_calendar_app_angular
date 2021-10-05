import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-modal-view-event',
  templateUrl: './modal-view-event.component.html',
  styleUrls: ['./modal-view-event.component.css']
})
export class ModalViewEventComponent implements OnInit {

  @Input() id: any;
  public selectedEvent: any;
  constructor(private clndrSrvc: CalendarService,
    public activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit(): any {
    console.log(this.clndrSrvc.calendarSelectedData);
    this.selectedEvent = this.clndrSrvc.calendarSelectedData;
  }

  onEdit(){
    this.router.navigate(['/dashboard/add-event/' + this.id]);
    this.activeModal.close();
  }
}