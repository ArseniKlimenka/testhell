'use strict';

/**
 * @errorCode {errorCode} copyQuoteRestrictions
 */

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function rule({ body, commonBody }) {

    const currentActor = this.applicationContext.actor;
    const currentUsername = this.applicationContext.originatingUser.username;
    const sellerUsername = getValue(commonBody, 'transitionResult.attributes.sellerUsername');

    if (currentActor == 'Operations' || currentUsername == sellerUsername) {
        return true;
    }

    return {
        errorCode: 'copyQuoteRestrictions'
    };


};
