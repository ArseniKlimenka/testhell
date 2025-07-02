'use strict';

const partyLicenseLib = require('@config-rgsl/party/component/PartyLicense/lib/partyLicenseLib');

/**
* @errorCode {errorCode} licenseNumberIsRequired
* @errorCode {errorCode} licensingAuthorityIsRequired
* @errorCode {errorCode} dateOfIssueOfLicenseIsRequired
*/

module.exports = function validatePartyLicense(input) {

    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return []; }

    return partyLicenseLib.licenseValidation(input, this);

};
