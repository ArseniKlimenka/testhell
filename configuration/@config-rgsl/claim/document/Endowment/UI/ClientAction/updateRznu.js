'use strict';

const { setRznu } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function updateRznu(input) {

    const body = input.rootContext.Body;

    if (!body.endowmentAmounts.manualRznu) {

        setRznu(body);
    }
};
