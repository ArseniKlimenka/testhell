'use strict';

const partyWebsiteLib = require('@config-rgsl/party/component/PartyWebsite/lib/partyWebsiteLib');

/**
* @errorCode {errorCode} websiteAddressIsRequired
*/

module.exports = function validatePartyWebsite(input) {

    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return []; }

    return partyWebsiteLib.websiteValidation(input, this);

};
