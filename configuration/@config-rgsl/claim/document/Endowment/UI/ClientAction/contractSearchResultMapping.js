'use strict';

module.exports = async function contractSearchResultMapping(input) {

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();
};
