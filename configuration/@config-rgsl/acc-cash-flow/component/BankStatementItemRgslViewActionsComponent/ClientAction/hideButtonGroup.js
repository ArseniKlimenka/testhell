'use strict';

module.exports = function hideButtonGroup(input, ambientProperties) {

    const currentActor = input?.context?.WorkUnitActor?.CurrentActor;
    return currentActor == 'PaymentsViewer';

};
