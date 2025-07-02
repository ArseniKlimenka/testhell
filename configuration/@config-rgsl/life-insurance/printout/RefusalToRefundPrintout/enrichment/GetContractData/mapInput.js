'use strict';

module.exports = function mapping(input) {
    const output = {
        data: {
            criteria: {
                contractNumberStrict: input.contractNumber,
                versionStateWithNull: 'Applied',
                seqNumber: 0
            }
        }
    };

    return output;
};
