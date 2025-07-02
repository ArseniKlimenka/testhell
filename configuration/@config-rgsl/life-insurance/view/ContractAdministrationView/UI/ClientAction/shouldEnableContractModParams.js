'use strict';

module.exports = function shouldEnableContractModParams(input, ambientProperties) {

    return !!input.context.Body.contractNumber;
};
