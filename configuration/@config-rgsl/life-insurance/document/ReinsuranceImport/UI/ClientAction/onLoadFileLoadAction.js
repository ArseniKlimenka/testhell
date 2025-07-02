'use strict';

const { sourceFileFormatReinsuranceDataConstants } = require('@config-rgsl/life-insurance/lib/reinsuranceHelper');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    input.context.Body.sourceFileFormatData = sourceFileFormatReinsuranceDataConstants;

    input.context.Body.sourceFileFormat = 1;

    this.view.rebind();

};
