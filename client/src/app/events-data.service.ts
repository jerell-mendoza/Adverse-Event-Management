import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Event } from './model/event/event';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsDataService {
  events: Event[] = [];
  constructor(private http: Http) {
    console.log('Events data service initialized...');
    console.log(environment.serviceBaseUrl);
  }

  getEvents(pageNumber: number, pageSize: number){
    if(!pageNumber && !pageSize) {
      return this.http.get(`${environment.serviceBaseUrl}/api/Events`);
    } else {
      return this.http.get(`${environment.serviceBaseUrl}/api/Events?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
  }

  deleteEvent(id: String){
    return this.http.delete(`${environment.serviceBaseUrl}/api/Events/` + id);
  }

  addEvent(event: Event) {
      return this.http.post(`${environment.serviceBaseUrl}/api/Events`, event);
  }

  updateEvent(event: Event) {
      return this.http.put(`${environment.serviceBaseUrl}/api/Events/` + event._id, event);
  }
}
