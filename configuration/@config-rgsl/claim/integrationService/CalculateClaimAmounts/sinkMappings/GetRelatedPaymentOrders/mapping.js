'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { currency } = require("@config-rgsl/infrastructure/lib/ImplConstants");

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    referenceNumber: input.claimNumber,
                    isManual: false,
                    isCreatedFromNetting: false
                }
            }
        }
    };
};
