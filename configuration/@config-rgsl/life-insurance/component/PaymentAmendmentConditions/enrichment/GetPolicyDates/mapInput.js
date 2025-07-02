'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input) {

    const contractNumber = this.businessContext.originalDocumentNumber;

    return {
        data: {
            criteria: {
                number: contractNumber
            }
        },
        paging: {
            page: 0,
            pageSize: 15
        }
    };
};
