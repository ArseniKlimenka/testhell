'use strict';

module.exports = function investmentStrategyResponseMapping(input, ambientProperties) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData)
            .filter(elem => {
                return elem.investmentStrategyDescription.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }
    else {
        output.push(input.context.strategy);
    }

    return output.sort((a, b) => (a.investmentStrategyDescription > b.investmentStrategyDescription) ? 1 : ((b.investmentStrategyDescription > a.investmentStrategyDescription) ? -1 : 0));

};
