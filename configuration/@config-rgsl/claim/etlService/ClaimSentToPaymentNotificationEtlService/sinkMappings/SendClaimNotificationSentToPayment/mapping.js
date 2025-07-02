'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const uriBuilder = require("@config-rgsl/infrastructure/lib/UriBuilder");
const { LocalDate } = require('@js-joda/core');

module.exports = function mapping(messageContext, sinkExchange, additionalDataSourcesResults) {

    // for translation
    this.applicationContext.locale = "ru-RU";

    const recipientsString = this.environmentVariables["rgsl.groupEmails.claimSentToPayment"];
    const recipientsArray = recipientsString && recipientsString.split(';');
    const claimData = additionalDataSourcesResults.ClaimSentToPaymentDataSource.data;
    const hasClaimData = claimData?.length > 0;
    if (!recipientsArray || !hasClaimData) {
        return;
    }

    const currentDate = DateTimeUtils.formatDate(LocalDate.now(), 'dd.MM.yyyy');
    const clientBaseUrl = this.environmentVariables.clientBaseUrl;

    const notificationData = claimData.map((cl, index) => {
        const insuranceActSignatureDateTime = DateTimeUtils.formatDate(cl.resultData.insuranceActSignatureDateTime, DateTimeUtils.DateFormats.CALENDAR_TIME_FULL_DATE);
        const paymentOrderCreatedDateTime = DateTimeUtils.formatDate(cl.resultData.paymentOrderCreatedDateTime, DateTimeUtils.DateFormats.CALENDAR_TIME_FULL_DATE);
        const paymentOrderToPayDateTime = DateTimeUtils.formatDate(cl.resultData.paymentOrderToPayDateTime, DateTimeUtils.DateFormats.CALENDAR_TIME_FULL_DATE);
        const claimLoadDateTime = DateTimeUtils.formatDate(cl.resultData.claimLoadDateTime, DateTimeUtils.DateFormats.CALENDAR_TIME_FULL_DATE);
        return {
            num: index + 1,
            ieLink: clientBaseUrl + '/' + uriBuilder.getUniverslaDocumentUri(cl.resultData.ieNumber, 'InsuredEvent'),
            claimLink: clientBaseUrl + '/' + uriBuilder.getClaimUri(cl.resultData.claimNumber),
            paymentOrderLink: clientBaseUrl + '/' + uriBuilder.getPaymentOrderUri(cl.resultData.paymentOrderNumber),
            ...cl.resultData,
            insuranceActSignatureDateTime,
            paymentOrderCreatedDateTime,
            paymentOrderToPayDateTime,
            claimLoadDateTime
        };
    });

    return {
        entityType: 'Claim',
        dataContext: {
            content: {
                notificationData: notificationData,
                currentDate: currentDate
            }
        },
        recipients: {
            ContactInformation: recipientsArray
        }
    };
};
