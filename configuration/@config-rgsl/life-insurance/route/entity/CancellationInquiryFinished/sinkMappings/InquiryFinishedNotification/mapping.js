'use strict';

const { userGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getContinueInquiryNotificationData, getInquiryNotificationOutput } = require('@config-rgsl/life-insurance/lib/activityNotificationHelper');

module.exports = function mapping(messageContext, sinkExchange) {

    // for translation
    this.applicationContext.locale = "ru-RU";

    const continueNotificationData = getContinueInquiryNotificationData(messageContext, sinkExchange, this);

    if (!continueNotificationData.recipientsArray || continueNotificationData.isOperationsGroup || continueNotificationData.isUKSPGroup || continueNotificationData.userGroupCode === userGroup.underwriting2) {
        return;
    }

    return getInquiryNotificationOutput(messageContext, sinkExchange, this, continueNotificationData);

};
