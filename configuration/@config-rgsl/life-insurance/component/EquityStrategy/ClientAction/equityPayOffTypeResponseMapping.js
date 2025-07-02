module.exports = function equityPayOffTypeResponseMapping(input) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData)
            .filter(elem => {
                return elem.payOffType.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }

    return output
        .sort((a, b) => (a.payOffType > b.payOffType) ? 1 : ((b.payOffType > a.payOffType) ? -1 : 0))
        .map(item => item.payOffType);

};
