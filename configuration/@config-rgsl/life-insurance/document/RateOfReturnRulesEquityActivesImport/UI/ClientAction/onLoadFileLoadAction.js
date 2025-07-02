'use strict';

const { sourceFileFormatRateOfReturnRulesEquityActivesDataConstants } = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesEquityActivesHelper');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    input.context.Body.sourceFileFormatData = sourceFileFormatRateOfReturnRulesEquityActivesDataConstants;

    input.context.Body.sourceFileFormat = 1;

    this.view.rebind();

};
