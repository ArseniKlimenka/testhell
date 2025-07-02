'use strict';

module.exports = async function ratesOfReturnOnChange(input, ambientProperties) {

    if (input.data.ratesOfReturn) {

        input.data.strategyConfiguration = {};
    }

    this.rebindComponent();
};
