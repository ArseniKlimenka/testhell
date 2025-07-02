'use strict';

module.exports = function mapping(input) {

    const number = this.businessContext.documentNumber;

    if (!number) {

        return;
    }

    return {
        data: {
            criteria: {
                insuredEventNumber:  number
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
