'use strict';

const { userGroup, quoteState, entityTypes } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getContinueNotificationData, getActivityCreatedNotificationOutput } = require('@config-rgsl/life-insurance/lib/activityNotificationHelper');

module.exports = function mapping(messageContext, sinkExchange) {

    // for translation
    this.applicationContext.locale = "ru-RU";

    const continueNotificationData = getContinueNotificationData(messageContext, sinkExchange, this);

    if (!continueNotificationData.recipientsArray || continueNotificationData.isOperationsGroup || continueNotificationData.isUKSPGroup || continueNotificationData.userGroupCode === userGroup.underwriting2) {
        return;
    }

    if (messageContext.entityType === entityTypes.Contract && messageContext.documentStateCode === quoteState.OnReview) {
        return;
    }

    return getActivityCreatedNotificationOutput(messageContext, sinkExchange, this, continueNotificationData);

};
