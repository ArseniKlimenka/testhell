'use strict';

module.exports = function hideInquiries(input, ambientProperties) {

    const currentActor = input?.rootContext?.WorkUnitActor?.CurrentActor;
    return currentActor !== 'Operations';
};
