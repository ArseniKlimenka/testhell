'use strict';

const { LocalDate } = require('@js-joda/core');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkInput, sinkExchange) {

    const isEndowmentInquiry = sinkInput.inquiryType == 'EndowmentInquiry';

    if (!isEndowmentInquiry) {

        return;
    }

    const body = sinkInput.requestBody;
    const currentDate = LocalDate.now().toString();
    const shouldUpdateEndowmentInquiry = false;

    if (sinkExchange.workingDaysBeforeCurrentDate > 4) {

        sinkExchange.shouldUpdateEndowmentInquiry = true;
        body.includedInRussianPostRegister = true;
        body.inclusionDateRussianPostRegister = currentDate;

        return {
            body,
            number: sinkInput.requestNumber
        };
    }

    return;
};
