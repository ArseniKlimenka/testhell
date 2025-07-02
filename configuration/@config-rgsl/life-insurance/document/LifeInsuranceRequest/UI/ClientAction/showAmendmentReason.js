'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showAmendmentReason(input, ambientProperties) {

    const typeOfRequest = getValue(input, 'context.Body.typeOfRequest') == "Cancellation";

    return typeOfRequest;

};
