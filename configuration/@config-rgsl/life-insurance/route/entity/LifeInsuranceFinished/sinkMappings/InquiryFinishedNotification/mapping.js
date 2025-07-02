'use strict';

const { userGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getContinueInquiryNotificationData, getFinishedInquiryNotificationOutput } = require('@config-rgsl/life-insurance/lib/activityNotificationHelper');

module.exports = function mapping(messageContext, sinkExchange) {

    // for translation
    this.applicationContext.locale = "ru-RU";

    const continueNotificationData = getContinueInquiryNotificationData(messageContext, sinkExchange, this);

    return getFinishedInquiryNotificationOutput(messageContext, sinkExchange, this, continueNotificationData);

};
