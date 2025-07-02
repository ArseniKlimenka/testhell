'use strict';

module.exports = function mapping(input, sinkExchange) {

    const bankStatementItemIds = input.body.bankStatementItemIds;

    const chunkSize = 1000;
    const result = [];

    for (let i = 0; i < bankStatementItemIds.length; i += chunkSize) {
        const chunk = bankStatementItemIds.slice(i, i + chunkSize);

        result.push({
            input: {
                data: {
                    criteria: {
                        bankStatementItemIds: chunk,
                    }
                }
            }
        });
    }

    return result;
};
