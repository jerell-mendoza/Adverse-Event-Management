export class Event {
    _id: String;
    receiveDate: String;
    receiptDate: String;
    patient: {
        drugs: [{
            autorizationNumber: String;
            DosageText: String;
            medicinalProduct: String;
            drugIndication: String
        }];
        reaction: [{
            meddraPrimaryTerm: String
        }];
        age: String;
        sex: String;
    };
    safetyReportId: String;
    companyNumber: String;

    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
};
