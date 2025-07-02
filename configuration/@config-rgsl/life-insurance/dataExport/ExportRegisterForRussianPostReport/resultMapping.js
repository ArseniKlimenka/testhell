'use strict';

const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');
const emptyText = '';

module.exports = function resultMapping(input) {

    const result = input.data.map(item => {
        return {
            requestCreatedOn: item.resultData.requestCreatedOn ? formatHelper.formatDateTimeToString(item.resultData.requestCreatedOn) : emptyText,
            requestNumber: item.resultData.requestNumber || emptyText,
            applicantFullName: item.resultData.applicantFullName || emptyText,
            applicantShortName: item.resultData.applicantShortName || emptyText,
            applicantFullAddress: item.resultData.applicantFullAddress || emptyText,
            applicantNameMiddleName: item.resultData.applicantNameMiddleName || emptyText,
            policyNumber: item.resultData.policyNumber || emptyText,
            policyIssueDate: item.resultData.policyIssueDate ? formatHelper.formatDateTimeToString(item.resultData.policyIssueDate) : emptyText,
            applicationReceiveDate: item.resultData.applicationReceiveDate ? formatHelper.formatDateTimeToString(item.resultData.applicationReceiveDate) : emptyText,
            inquiryErrors: item.resultData.inquiryErrors ? item.resultData.inquiryErrors : emptyText
        };
    });

    return result;

};
