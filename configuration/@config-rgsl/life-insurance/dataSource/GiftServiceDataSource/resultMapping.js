'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.giftServiceId = input.ID;
    output.giftServiceName = input.NAME;
    output.giftServiceCode = input.CODE;
    output.giftServiceDescription = input.DESCRIPTION;

    return output;

};
