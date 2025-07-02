'use strict';

module.exports = function disableLookUpInputs(input, ambientProperties) {

    return input.data.taxPayerData.isTaxPayerPolicyHolder;
};
