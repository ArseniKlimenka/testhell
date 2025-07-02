'use strict';

module.exports = function mapping(input) {

    const body = this.businessContext.rootData;
    const number = body.contract.number;

    return {
        data: {
            criteria: {
                contractNumber: number
            }
        }
    };
};
