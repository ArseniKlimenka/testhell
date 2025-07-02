'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function showChangeAttributes(input, ambientProperties) {

    const typeOfRequest = getValue(input, 'context.Body.typeOfRequest') == "Modification";

    return typeOfRequest;

};
