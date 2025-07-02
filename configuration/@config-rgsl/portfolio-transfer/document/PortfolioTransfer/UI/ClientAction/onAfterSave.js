'use strict';

module.exports = async function onAfterSave(input, ambientProperties) {

    this.view.reloadEntity();

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};

