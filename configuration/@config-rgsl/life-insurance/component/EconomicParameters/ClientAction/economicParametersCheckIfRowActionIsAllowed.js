'use strict';

const { economicParametersState } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = function economicParametersCheckIfRowActionIsAllowed(input, ambientProperties) {

    const isActivatedDocument = input.context?.State?.Code == economicParametersState.Activated;

    if (isActivatedDocument) {

        return {
            delete: false,
            edit: false
        };
    }

    return true;
};
