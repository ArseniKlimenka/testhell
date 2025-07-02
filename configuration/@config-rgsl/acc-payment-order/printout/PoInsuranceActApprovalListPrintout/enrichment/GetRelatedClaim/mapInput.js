'use strict';

module.exports = function mapping(input) {

    const output = {
        data: {
            criteria: {
                documentCode: input.claimNumber
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };

    return output;
};
