'use strict';

const { LocalDate } = require('@js-joda/core');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(sinkInput, sinkExchange) {

    const isCancellationInquiry = sinkInput.inquiryType == 'CancellationInquiry';

    if (!isCancellationInquiry) {
        return;
    }

    const inquiryData = sinkExchange.inquiryData;
    const body = sinkInput.requestBody;

    let shouldUpdateCancellationInquiry = false;

    const currentDate = LocalDate.now().toString(); // Текущая дата
    const requestCreatedOn = sinkInput.requestCreatedOn; // Дата создания Запроса

    const isAccumulatedLifeInsuranceCancellation = inquiryData.requestBody.configurationCodeName == 'AccumulatedLifeInsuranceCancellation';

    if (sinkExchange.workingDaysBeforeCurrentDate > 4) {
        if ((sinkExchange.isCoolOffPeriod) || (sinkExchange.isAfterCoolOffPeriod && !isAccumulatedLifeInsuranceCancellation)) {
            shouldUpdateCancellationInquiry = true;
        }
    }

    if (sinkExchange.isAfterCoolOffPeriod && isAccumulatedLifeInsuranceCancellation) {
        if (DateTimeUtils.getDayDifference(requestCreatedOn, currentDate) > 20) {
            shouldUpdateCancellationInquiry = true;
        }
    }

    if (shouldUpdateCancellationInquiry) {

        sinkExchange.shouldUpdateCancellationInquiry = true;
        body.includedInRussianPostRegister = true;
        body.inclusionDateRussianPostRegister = currentDate;

        return {
            body,
            number: sinkInput.requestNumber
        };

    }

    return;

};
