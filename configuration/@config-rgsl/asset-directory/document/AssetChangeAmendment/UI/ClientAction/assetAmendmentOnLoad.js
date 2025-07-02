'use strict';

const { finalStates } = require('@config-rgsl/asset-directory/lib/assetHelper');

module.exports = async function assetAmendmentOnLoad(input, ambientProperties) {

    const documentStateCode = input.context.State?.Code;

    if (finalStates.includes(documentStateCode)) {
        this.view.disableAllElements();
    }
};
