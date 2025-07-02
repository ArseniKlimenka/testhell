'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    sinkExchange.mapContext('rsdNumber', sinkInput.rsdNumber);

    return {
        input: {
            data: {
                criteria: {
                    rsdNumber: sinkInput.skipDraftValidation ? sinkInput.rsdNumber : undefined,
                    stateCodes: ['Draft', 'Completing'],
                }
            }
        }
    };
};
