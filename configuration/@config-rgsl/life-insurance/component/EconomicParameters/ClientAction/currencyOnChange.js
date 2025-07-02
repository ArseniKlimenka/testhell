'use strict';

module.exports = async function currencyOnChange(input, ambientProperties) {

    input.data.basicInvestmentParameters = {};
    input.data.ratesOfReturn = {};
    input.data.strategyConfiguration = {};

    this.rebindComponent();
};
