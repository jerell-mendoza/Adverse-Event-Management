import { Component, OnInit } from '@angular/core';
import { EventsDataService } from '../events-data.service';
import { Event } from '../model/event/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [EventsDataService]
})
export class EventsComponent implements OnInit {
  events;
  newEvent = new Event({
      receiveDate: '',
      receiptDate: '',
      patient: {
          drugs: [{
              autorizationNumber: '',
              DosageText: '',
              medicinalProduct: '',
              drugIndication: '',
          }],
          reaction: [{
              meddraPrimaryTerm: '',
          }],
          age: '',
          sex: '',
      },
      safetyReportId: '',
      companyNumber: ''});

  loading: Boolean;
  status: String;
  creatingNewEventOrEdit: Boolean = false;
  isUpdate: Boolean = false;
  currentEditIndex: number;
  pageNumber: number = 1;

  constructor(private EventsDataService: EventsDataService) { }

  ngOnInit() {
      this.getEvents(1, 100);
  }

  addOrUpdateEvent(isUpdate, event: Event) {
      if(isUpdate) {
          this.updateEvent(event);
      } else {
          this.addEvent(event);
      }
      this.isUpdate = false;
      this.loading = false;
      this.creatingNewEventOrEdit = false;
      this.clearEvent();
  }

  addEvent(event: Event) {
      this.loading = true;
      this.EventsDataService.addEvent(event)
            .subscribe(res => {
              console.log(res);
              if(res.status === 200)
              {
                  this.events.push(event);
                  this.status = 'Added Event!';
              }
            });
  }

  getEvents(pageNumber: number, pageSize: number) {
      this.loading = true;
      this.EventsDataService.getEvents(pageNumber, pageSize).map(res => res.json() as Event[])
            .subscribe(event => {
              this.events = event;
              this.loading = false;
            });
  }

  updateEvent(event: Event) {
      this.loading = true;
      this.EventsDataService.updateEvent(event)
            .subscribe(res => {
              console.log(res);
              if(res.status === 200)
              {
                  this.events[this.currentEditIndex] = event;
                  this.status = 'Updated!';
              }
            });
  }

  deleteEvent(event: Event, index: String) {
      this.loading = true;
      this.EventsDataService.deleteEvent(event._id)
            .subscribe(res => {
              console.log(res);
              if(res.status === 200)
              {
                  this.events.splice(index, 1);
                  this.loading = false;
                  this.status = 'Deleted!';
              }
            });
  }

  editEvent(event: Event, index: number) {
      this.newEvent = event;
      this.isUpdate = true;
      this.currentEditIndex = index;
      this.creatingNewEventOrEdit = true;
  }

  addNewDrug() {
      this.newEvent.patient.drugs.push({
          autorizationNumber: '',
          DosageText: '',
          medicinalProduct: '',
          drugIndication: ''
      });
  }

  addReaction() {
      this.newEvent.patient.reaction.push({
          meddraPrimaryTerm: ''
      });
  }

  clearEvent() {
      this.newEvent = new Event({
          receiveDate: '',
          receiptDate: '',
          patient: {
              drugs: [{
                  autorizationNumber: '',
                  DosageText: '',
                  medicinalProduct: '',
                  drugIndication: '',
              }],
              reaction: [{
                  meddraPrimaryTerm: '',
              }],
              age: '',
              sex: '',
          },
          safetyReportId: '',
          companyNumber: ''});
  }

  changePage(nextOrPrevious: String) {
    if(nextOrPrevious==='next') {
      this.pageNumber++;
      this.getEvents(this.pageNumber, 100);
    } else if(nextOrPrevious==='previous') {
      this.pageNumber--;
      this.getEvents(this.pageNumber, 100);
    }
  }
}
