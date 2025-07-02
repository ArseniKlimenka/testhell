'use strict';

module.exports = function mapping(input, sinkExchange) {
    const { number } = input;
    return {
        input: {
            data: {
                criteria: {
                    contractNumber: number,
                    risksGroup: 'Endowment',
                }
            }
        }
    };
};
