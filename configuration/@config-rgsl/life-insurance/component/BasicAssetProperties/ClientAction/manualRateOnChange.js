'use strict';

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = async function manualRateOnChange(input, ambientProperties) {

    try {
        this.view.startBlockingUI();
        await this.view.evaluate(['/basicAssetProperties'], false, true);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        this.view.stopBlockingUI();
    }

    this.view.rebind();
    this.view.setDirty();
};
