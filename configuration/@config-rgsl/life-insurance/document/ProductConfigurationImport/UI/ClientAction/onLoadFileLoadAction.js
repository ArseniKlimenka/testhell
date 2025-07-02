'use strict';

const { sourceFileFormatProductConfigurationDataConstants } = require('@config-rgsl/life-insurance/lib/productConfigurationHelper');

module.exports = function onLoadFileLoadAction(input, ambientProperties) {

    input.context.Body.sourceFileFormatData = sourceFileFormatProductConfigurationDataConstants;

    input.context.Body.sourceFileFormat = 1;

    this.view.rebind();

};
