'use strict';

module.exports = function onCreateViewParamsContractAdditionalParameters(input, ambientProperties) {

    const contractEntityCode = input.context?.ClientViewModel?.contractEntityCode;

    return contractEntityCode ? {
        'master-entity-code': contractEntityCode
    } : undefined;
};
