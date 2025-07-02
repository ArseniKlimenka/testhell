'use strict';

module.exports = async function onChangeIsManualCorrectionSum(input, ambientProperties) {

    this.view.setDirty();
    this.view.rebind();
};
