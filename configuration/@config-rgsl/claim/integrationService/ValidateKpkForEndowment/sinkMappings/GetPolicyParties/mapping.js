'use strict';

module.exports = function (input, sinkExchange) {

    const contractNumber = sinkExchange.endowment.body.mainAttributes?.contract?.number;

    if (!contractNumber) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    number: contractNumber,
                    isStrictNumber: true,
                }
            },
            paging: {
                page: 0,
                pageSize: 15,
            }
        }
    };
};
