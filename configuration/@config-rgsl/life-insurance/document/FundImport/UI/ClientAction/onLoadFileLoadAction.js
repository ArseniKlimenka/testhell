'use strict';

const { sourceFileFormatFundDataConstants } = require('@config-rgsl/life-insurance/lib/fundHelper');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    input.context.Body.sourceFileFormatData = sourceFileFormatFundDataConstants;

    input.context.Body.sourceFileFormat = 1;

    this.view.rebind();

};
