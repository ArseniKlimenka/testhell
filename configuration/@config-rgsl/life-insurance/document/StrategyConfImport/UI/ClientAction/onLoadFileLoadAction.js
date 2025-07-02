'use strict';

const { sourceFileFormatStrategyConfDataConstants } = require('@config-rgsl/life-insurance/lib/strategyConfHelper');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    input.context.Body.sourceFileFormatData = sourceFileFormatStrategyConfDataConstants;

    input.context.Body.sourceFileFormat = 1;

    this.view.rebind();

};
