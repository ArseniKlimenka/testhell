'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const implConstants = require('@config-rgsl/infrastructure/lib/ImplConstants');

module.exports = function mapping(sinkInput, sinkExchange) {

    const inquiryData = sinkExchange.inquiryData;
    const isCancellationInquiry = inquiryData.inquiryType == 'CancellationInquiry';
    const isAccumulatedLifeInsuranceCancellation = inquiryData.requestBody.configurationCodeName == 'AccumulatedLifeInsuranceCancellation';
    const requestCreatedOn = inquiryData.requestCreatedOn; // Дата создания Запроса
    const currentDate = sinkExchange.currentDate; // Текущая дата

    if ((isCancellationInquiry && (sinkExchange.isCoolOffPeriod || (sinkExchange.isAfterCoolOffPeriod && !isAccumulatedLifeInsuranceCancellation))) || !isCancellationInquiry) {
        return {
            calendarCode: implConstants.workCalendar.companyCalendar,
            from: requestCreatedOn,
            to: DateTimeUtils.addMonths(currentDate, 1)
        };
    }
    return;


};
