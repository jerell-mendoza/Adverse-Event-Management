/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsDataService } from './events-data.service';

describe('EventsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsDataService]
    });
  });

  it('should ...', inject([EventsDataService], (service: EventsDataService) => {
    expect(service).toBeTruthy();
  }));
});
