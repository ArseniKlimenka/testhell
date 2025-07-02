'use strict';

const { copyAttachmentsMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function mapping(input, sinkExchange) {

    return copyAttachmentsMapping(input, sinkExchange);

};
