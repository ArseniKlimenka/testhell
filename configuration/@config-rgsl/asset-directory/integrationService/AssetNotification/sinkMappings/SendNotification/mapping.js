'use strict';

const { userGroup, quoteState, entityTypes } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getAssetNotificationData, getAssetNotificationOutput } = require('@config-rgsl/life-insurance/lib/activityNotificationHelper');

module.exports = function mapping(messageContext, sinkExchange) {

    // for translation
    this.applicationContext.locale = "ru-RU";

    const continueNotificationData = getAssetNotificationData(messageContext, sinkExchange, this);

    if (!continueNotificationData.recipientsArray) {
        return;
    }

    const outputNotifaction = getAssetNotificationOutput(messageContext, sinkExchange, this, continueNotificationData);
    return outputNotifaction;

};
