'use strict';

module.exports = function resultMapping(input) {

    const output = {
        number: input.COMMISSION_ACT_NUMBER,
        stateCode: input.STATE_CODE,
        body: JSON.parse(input.BODY),
    };

    return output;
};
