module.exports = function equityStrategyResponseMapping(input) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData)
            .filter(elem => {
                return elem.strategyName.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '') ||
                    elem.isin.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }

    return output.sort((a, b) => (a.strategyName > b.strategyName) ? 1 : ((b.strategyName > a.strategyName) ? -1 : 0));

};
