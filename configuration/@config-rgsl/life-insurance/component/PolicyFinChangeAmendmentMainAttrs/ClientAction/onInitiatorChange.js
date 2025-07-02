'use strict';

module.exports = function onInitiatorChange(input, ambientProperties) {

    const currentchangeReason = input.componentContext.changeReason;

    if (currentchangeReason) {

        input.componentContext.changeReason = undefined;
    }

    this.rebindComponent();
};
