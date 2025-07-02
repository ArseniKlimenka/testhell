'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    number: input.contractNumber,
                    isStrictNumber: true
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
