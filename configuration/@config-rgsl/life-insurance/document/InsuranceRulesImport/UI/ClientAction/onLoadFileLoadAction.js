'use strict';

const { sourceFileFormatInsuranceRulesDataConstants } = require('@config-rgsl/life-insurance/lib/insuranceRulesHelper');

module.exports = function onLoadFileLoadAction(input) {

    input.context.Body.sourceFileFormatData = sourceFileFormatInsuranceRulesDataConstants;
    input.context.Body.sourceFileFormat = sourceFileFormatInsuranceRulesDataConstants[0].fileFormat;

    this.view.rebind();

};
