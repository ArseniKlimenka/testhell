'use strict';

const { getLegalEntityData, getLegalEntityNotificationOutput } = require('@config-rgsl/legal-entity/lib/legalEntityNotificationHelper');

module.exports = function mapping(messageContext, sinkExchange) {

    // for translation
    this.applicationContext.locale = "ru-RU";

    const continueNotificationData = getLegalEntityData(messageContext, sinkExchange, this);

    if (!continueNotificationData.recipientsArray) {
        return;
    }

    return getLegalEntityNotificationOutput(messageContext, sinkExchange, this, continueNotificationData);
};
