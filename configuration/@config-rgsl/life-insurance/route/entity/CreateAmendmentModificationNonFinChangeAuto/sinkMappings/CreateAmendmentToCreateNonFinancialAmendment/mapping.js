'use strict';

const { requestCreateAmendmentToCreateNonFinancialAmendmentMapping } = require('@config-rgsl/life-insurance/lib/sinkLifeInsuranceHelper');

module.exports = function mapping(input, sinkExchange) {

    return requestCreateAmendmentToCreateNonFinancialAmendmentMapping(input, sinkExchange);

};
