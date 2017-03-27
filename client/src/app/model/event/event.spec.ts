import {Event} from './event';

describe('Event', () => {
  it('should create an instance', () => {
    expect(new Event()).toBeTruthy();
  });

  it('should create set values in constructor', () => {
    let event = new Event({
      receiveDate: '20170324',
      safetyReportId: '123456789'
    });
    expect(event.receiveDate).toEqual('20170324');
    expect(event.safetyReportId).toEqual('123456789');
  });
});
