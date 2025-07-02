'use strict';

module.exports = function resultMapping(input) {

    const output = {};

    output.request = JSON.parse(input?.REQUEST ?? "{}");
    output.response = JSON.parse(input?.RESPONSE ?? "{}");
    output.createdDate = input?.CREATED_DATE;

    return output;
};
