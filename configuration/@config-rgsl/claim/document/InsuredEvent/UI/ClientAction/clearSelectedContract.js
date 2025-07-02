'use strict';

module.exports = function clearSelectedContract(input) {

    if (input.data.Body.contract.number) {

        delete input.data.Body.contract.number;
        delete input.data.Body.contract.configurationName;
        delete input.data.Body.contract.configurationVersion;
    }
};
