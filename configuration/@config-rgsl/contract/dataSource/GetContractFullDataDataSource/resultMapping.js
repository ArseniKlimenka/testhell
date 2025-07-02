'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.number = input.AMENDMENT_NUMBER;
    output.id = input.CONTRACT_ID;
    output.confName = input.CONF_NAME;
    output.body = JSON.parse(input.BODY);
    output.commonBody = JSON.parse(input.COMMON_BODY);

    return output;
};
