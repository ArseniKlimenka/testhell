'use strict';

const { claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');

module.exports = function rule(input) {

    const currentActor = this.applicationContext.originatingActorCode;
    const currentState = this.businessContext.documentState;

    /* Dont forget to add new actors and/or states into configuration.json even if this printout should not be avalable for them.
    States where this printout is not available for all actors can be ignored.
    Or face consequences...
    Printout relations translations are not loading properly if actors are not listed inside configuration.json.*/
    const isAvailable = currentState === claimStates.requestToClient && currentActor === 'ClaimManager';

    if (isAvailable) {

        return {};
    }
};
