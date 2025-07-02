'use strict';

const { disableEditing } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = async function onLoadProductConfigurationCorrection(input, ambientProperties) {

    disableEditing(input, ambientProperties, this);
};
