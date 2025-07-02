'use strict';

module.exports = function showSearchContractButton(input, ambientProperties) {

    const configurationName = input.componentContext.configurationName;

    if (configurationName) {
        return false;
    }

    return true;
};
