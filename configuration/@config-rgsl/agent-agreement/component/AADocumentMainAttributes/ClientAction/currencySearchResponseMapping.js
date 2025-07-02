'use strict';

module.exports = function currencySearchResponseMapping(input) {

    if (input && input.response && input.response.data && input.response.data.length > 0) {

        return input.response.data.map(elem => elem.resultData["currencyCode"]);
    }

    return [];
};
