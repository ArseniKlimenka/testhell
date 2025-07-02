module.exports = function investmentStrategyResponseMapping(input) {
    let output = [];

    const currentInvestmentStrategy = input.componentContext.investmentStrategy;

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data.map(elem => elem.resultData);
    }
    else {
        output.push(currentInvestmentStrategy);
    }

    return output;
};
