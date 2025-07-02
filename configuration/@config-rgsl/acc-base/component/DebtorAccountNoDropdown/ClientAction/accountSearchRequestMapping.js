'use strict';

module.exports = function accountSearchRequestMapping(input) {

    const searchText = input.searchText ? '%' + input.searchText + '%' : undefined;
    return {
        data: {
            criteria: {
                accountNoLike: searchText,
            }
        }
    };
};
