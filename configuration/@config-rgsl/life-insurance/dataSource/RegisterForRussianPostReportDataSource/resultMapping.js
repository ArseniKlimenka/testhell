'use strict';

const emptyText = '';

module.exports = function resultMapping(input) {

    const applicantFirstName = input.FIRST_NAME ? input.FIRST_NAME : emptyText;
    const applicantMiddleName = input.MIDDLE_NAME ? ` ${input.MIDDLE_NAME}` : emptyText;

    return {
        requestCreatedOn: input.REQUEST_CREATED_ON,
        requestNumber: input.REQUEST_NUMBER,
        applicantFullName: input.FULL_NAME,
        applicantShortName: getShortName(input.FULL_NAME),
        applicantFullAddress: input.FULL_ADDRESS,
        applicantNameMiddleName: `${applicantFirstName}${applicantMiddleName}`,
        policyNumber: input.CONTRACT_NUMBER,
        policyIssueDate: input.ISSUE_DATE,
        applicationReceiveDate: input.RECEIVE_DATE,
        inquiryErrors: input.INQUIRY_ERRORS
    };

};

function getShortName(fullName) {
    const nameParts = fullName.split(' ');
    let shortName = nameParts[0];

    for (let i = 1; i < nameParts.length; i++) {
        shortName += ' ' + nameParts[i].charAt(0) + '.';
    }

    return shortName;
}
