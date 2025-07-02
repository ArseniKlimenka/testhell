'use strict';

const { getPolicyNonResidentData, getPolicyNonResidentOutput } = require('@config-rgsl/contract/lib/contractNotificationHelper');

module.exports = function mapping(messageContext, sinkExchange) {

    // for translation
    this.applicationContext.locale = "ru-RU";

    const continueNotificationData = getPolicyNonResidentData(messageContext, sinkExchange, this);

    if (!continueNotificationData.recipientsArray || !continueNotificationData.isNonResidentPolicyHolder) {
        return;
    }

    return getPolicyNonResidentOutput(messageContext, sinkExchange, this, continueNotificationData);

};
