'use strict';

const { apiSender } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function applyData(body) {

    const originatingUsername = this.applicationContext.originatingUser.username;

    if (originatingUsername == apiSender.API_EFR) {
        body.attachmentErrorArray = [];
        body.attachmentErrorComment = undefined;
    }

};
