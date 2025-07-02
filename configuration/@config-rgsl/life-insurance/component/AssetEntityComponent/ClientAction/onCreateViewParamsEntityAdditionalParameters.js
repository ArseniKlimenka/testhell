'use strict';

const { setEntityCode } = require('@config-rgsl/life-insurance/lib/assetEntityHelper');

module.exports = function onCreateViewParamsEntityAdditionalParameters(input, ambientProperties) {

    const entityCode = setEntityCode(input);

    if (!entityCode) {
        return;
    }

    return {'master-entity-code':  parseInt(entityCode)};
};
