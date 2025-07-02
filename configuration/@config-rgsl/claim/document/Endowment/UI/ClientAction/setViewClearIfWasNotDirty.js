'use strict';

module.exports = function setViewClearIfWasNotDirty(input) {

    const isViewInitiallyDirty = input.rootContext.ClientViewModel.isViewInitiallyDirty;

    if (!isViewInitiallyDirty) {

        this.view.setClean();
    }
};
