'use strict';

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const number = body.contract.number;

    return {
        data: {
            criteria: {
                contractType: 'Policy',
                number
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
