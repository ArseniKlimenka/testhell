'use strict';

module.exports = async function AssetAfterSave(input, ambientProperties) {

    this.view.reloadEntity();
};

