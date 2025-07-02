'use strict';

module.exports = function clearContractRelatedData(input) {

    if (input.context.Body.contract) {

        delete input.context.Body.contract.number;
        delete input.context.Body.contract.configurationName;
        delete input.context.Body.contract.configurationVersion;
        delete input.context.Body.contract.externalNumber;
    }
};
