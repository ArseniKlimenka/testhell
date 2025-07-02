'use strict';

const { assetDocumentConfigirations, assetStates } = require('@config-rgsl/asset-directory/lib/assetHelper');

module.exports = function disableIdIsin(input, ambientProperties) {

    return ambientProperties.configurationCodeName === assetDocumentConfigirations.AssetChangeAmendment
        || input.rootContext?.State?.Code != assetStates.draft;

};
