'use strict';

const { prepareInputForGetEFRProductsFiltred } = require('@config-rgsl/life-insurance/lib/efrHelper');

module.exports = function mapping(input, sinkExchange) {

    return prepareInputForGetEFRProductsFiltred(input, sinkExchange);

};
