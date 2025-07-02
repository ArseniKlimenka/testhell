'use strict';

module.exports = function resultMapping(input) {

    return {
        requestNumber: input.REQUEST_NUMBER,
        requestBody: JSON.parse(input.REQUEST_BODY),
        requestCodeName: input.CODE_NAME,
        requestCreatedOn: input.REQUEST_CREATED_ON,
        requestIncludedInRussianPostRegister: input.INCLUDED_IN_RUSSIAN_POST_REGISTER,
        inquiryType: input.INQUIRY_TYPE,
        receivedDate: input.RECEIVED_DATE,
        policyProductCode: input.POLICY_PRODUCT_CODE,
        policyIssueDate: input.POLICY_ISSUE_DATE
    };

};
