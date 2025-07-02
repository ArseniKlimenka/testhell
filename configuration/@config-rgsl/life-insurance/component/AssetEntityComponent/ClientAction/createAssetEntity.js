'use strict';

const { createEntity } = require('@config-rgsl/life-insurance/lib/assetEntityHelper');

module.exports = async function createAssetEntity(input, ambientProperties) {

    createEntity(input, ambientProperties, this);
};
