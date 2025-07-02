"use strict";

module.exports = function mapping(input) {

    const body = input.body;
    body.technicalInformation.policyReviewNumber += 1;

    const result = {};
    result.body = body;
    result.number = input.number;

    return result;
};

