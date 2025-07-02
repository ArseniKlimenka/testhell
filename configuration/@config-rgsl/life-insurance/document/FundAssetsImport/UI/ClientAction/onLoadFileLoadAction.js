'use strict';

const { sourceFileFormatFundAssetsDataConstants } = require('@config-rgsl/life-insurance/lib/fundAssetsHelper');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    input.context.Body.sourceFileFormatData = sourceFileFormatFundAssetsDataConstants;

    input.context.Body.sourceFileFormat = 1;

    this.view.rebind();

};
