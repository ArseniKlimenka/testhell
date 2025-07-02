const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {

    const policyNumber = input.body.contract.number;
    const policyIssueDate = dateHelper.formatDate(input.body.contract.issueDate, dateHelper.DateFormats.CALENDAR);
    let applicant = printoutsHelper.getPerson(input.body.applicant.partyData);
    applicant = printoutsHelper.getPersonData(applicant, input.body.applicant.partyData);
    applicant = printoutsHelper.getCoolDownData(applicant, input.body.applicant.partyData);
    const bank = input.body.bankAccount;
    const applicantGenderMale = input.body.applicant.partyData.partyBody.partyPersonData?.personGender == 'Male';
    const issueDate = dateHelper.formatDate(input.body.issueDate, dateHelper.DateFormats.CALENDAR);

    return {
        policyNumber,
        policyIssueDate,
        bank,
        applicant,
        applicantGenderMale,
        issueDate
    };
};
