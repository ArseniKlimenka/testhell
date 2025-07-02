'use strict';
const { userGroup } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getContinueNotificationData, getActivityCreatedNotificationOutput } = require('@config-rgsl/life-insurance/lib/activityNotificationHelper');

module.exports = function mapping(messageContext, sinkExchange) {

    // for translation
    this.applicationContext.locale = "ru-RU";

    const continueNotificationData = getContinueNotificationData(messageContext, sinkExchange, this);

    if (continueNotificationData.userGroupCode !== userGroup.underwriting2) {
        return;
    }

    return getActivityCreatedNotificationOutput(messageContext, sinkExchange, this, continueNotificationData);

};
