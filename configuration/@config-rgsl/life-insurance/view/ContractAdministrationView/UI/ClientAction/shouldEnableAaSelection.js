'use strict';

module.exports = function shouldEnableAaSelection(input, ambientProperties) {

    return !!input.rootContext.Body.commissionContract?.number;
};
