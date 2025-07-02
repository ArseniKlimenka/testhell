'use strict';

module.exports = function mapping(input) {

    const number = input.mainAttributes?.contract?.number;
    const configurationName = input.mainAttributes?.contract?.configurationName;

    if (!number || !configurationName) {

        return;
    }

    return {
        data: {
            criteria: {
                contractNumber: number,
                configurationName: configurationName
            }
        }
    };
};
