'use strict';

const { disableEditing, rebindOnStatusChanged } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = async function onLoadProductConfigurationCorrection(input, ambientProperties) {

    disableEditing(input, ambientProperties, this);
    rebindOnStatusChanged(input, ambientProperties, this);
};
