import { Component } from '@angular/core';
import { EventsComponent } from './events/events.component';
import { EventsDataService } from './events-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EventsDataService]
})
export class AppComponent {
  title = 'Adverse Event Management App!';
}
