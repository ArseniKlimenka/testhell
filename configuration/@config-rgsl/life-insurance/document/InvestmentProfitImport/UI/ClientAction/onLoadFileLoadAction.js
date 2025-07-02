'use strict';

const { sourceFileFormatInvestmentProfitDataConstants } = require('@config-rgsl/life-insurance/lib/investmentProfitHelper');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    input.context.Body.sourceFileFormatData = sourceFileFormatInvestmentProfitDataConstants;

    input.context.Body.sourceFileFormat = 1;

    this.view.rebind();

};
