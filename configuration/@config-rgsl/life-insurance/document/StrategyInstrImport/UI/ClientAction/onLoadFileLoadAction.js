'use strict';

const { sourceFileFormatStrategyInstrDataConstants } = require('@config-rgsl/life-insurance/lib/strategyInstrHelper');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    input.context.Body.sourceFileFormatData = sourceFileFormatStrategyInstrDataConstants;

    input.context.Body.sourceFileFormat = 1;

    this.view.rebind();

};
