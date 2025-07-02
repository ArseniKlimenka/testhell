'use strict';

/**
 * @errorCode {errorCode} copyQuoteRestrictions
 */

module.exports = function rule({ body, commonBody }) {

    const currentActor = this.applicationContext.actor;
    const currentUsername = this.applicationContext.originatingUser.username;
    const sellerUsername = commonBody?.transitionResult?.attributes?.sellerUsername;

    if (currentActor == 'Operations' || currentUsername == sellerUsername) {
        return true;
    }

    return {
        errorCode: 'copyQuoteRestrictions'
    };


};
