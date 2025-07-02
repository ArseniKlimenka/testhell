'use strict';

const { disableAddButton } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = function economicParametersCheckIfAddButtonVisible(input, ambientProperties) {

    return disableAddButton(input, ambientProperties, this);
};
