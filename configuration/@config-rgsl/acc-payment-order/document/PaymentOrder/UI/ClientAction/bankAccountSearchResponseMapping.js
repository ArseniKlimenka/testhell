'use strict';

module.exports = function bankAccountSearchResponseMapping(input) {

    let output = [];

    if (input.response && input.response.data && input.response.data.length > 0) {
        output = input.response.data
            .map(elem => elem.resultData.accountNo)
            .filter(elem => {
                return elem.toLowerCase().includes(input.searchText != null ? input.searchText.toLowerCase() : '');
            });
    }

    return output.sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));

};
