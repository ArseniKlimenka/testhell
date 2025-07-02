'use strict';

const { setRequest } = require('@config-rgsl/life-insurance/lib/assetEntityHelper');

module.exports = function basicAssetPropertiesRequestMapping(input) {

    const productCode = input.additionalContext?.productCode;
    const request = setRequest(input);

    if (productCode) {
        return request;
    }

};
