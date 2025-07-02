'use strict';

const { getDuplicatesInformation } = require('@config-rgsl/asset-directory/lib/assetHelper');
const { createEntity } = require('@config-rgsl/life-insurance/lib/assetEntityHelper');

module.exports = async function AssetBeforeSave(input, ambientProperties) {

    await getDuplicatesInformation(input, ambientProperties, this);
    this.view.validate();

    this.view.startBlockingUI();
    await createEntity(input, ambientProperties, this);
    this.view.stopBlockingUI();
};

