'use strict';

const { searchContractButtonClick } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');

module.exports = async function searchContractButton(input, ambientProperties) {

    await searchContractButtonClick(input, ambientProperties, this);

};
