'use strict';

const { sourceFileFormatRateOfReturnRulesDataConstants } = require('@config-rgsl/life-insurance/lib/rateOfReturnRulesHelper');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    input.context.Body.sourceFileFormatData = sourceFileFormatRateOfReturnRulesDataConstants;

    input.context.Body.sourceFileFormat = 1;

    this.view.rebind();

};
