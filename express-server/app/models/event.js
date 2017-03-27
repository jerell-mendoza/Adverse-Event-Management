var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    receiveDate: String,
    receiptDate: String,
    patient: {
        drugs: [{
            autorizationNumber: String,
            DosageText: String,
            medicinalProduct: String,
            drugIndication: String
        }],
        reaction: [{
            meddraPrimaryTerm: String
        }],
        age: String,
        sex: String,
    },
    safetyReportId: String,
    companyNumber: String
});

module.exports = mongoose.model('Event', eventSchema);
