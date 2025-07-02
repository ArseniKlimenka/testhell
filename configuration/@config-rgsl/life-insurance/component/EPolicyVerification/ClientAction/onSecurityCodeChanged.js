'use strict';

module.exports = function onSecurityCodeChanged(input) {

    this.view.setClean();
    this.view.rebind();
    this.view.validate();
};
