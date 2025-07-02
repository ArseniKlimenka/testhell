'use strict';

const { actor } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function hideInquiries(input, ambientProperties) {

    const currentActor = input?.rootContext?.WorkUnitActor?.CurrentActor;
    return currentActor !== actor.Operations;
};
