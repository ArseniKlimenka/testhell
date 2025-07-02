'use strict';

// const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const constants = require('@config-rgsl/life-insurance/lib/sendEventConstant');

module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: sinkInput.body.number
                }
            }
        }
    };

};
