'use strict';

const { checkProductConfDuplicates } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

module.exports = async function onChangeInsuranceProduct(input, ambientProperties) {

    await checkProductConfDuplicates(input, ambientProperties, this);
};
