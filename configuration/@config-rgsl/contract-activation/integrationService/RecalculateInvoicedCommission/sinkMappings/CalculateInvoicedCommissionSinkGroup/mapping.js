'use strict';

module.exports = function mapping(input) {

    const contracts = input.contracts;
    const chunkSize = 1000;
    const result = [];

    for (let i = 0; i < contracts.length; i += chunkSize) {
        const chunk = contracts.slice(i, i + chunkSize);

        result.push({
            contracts: chunk,
        });
    }

    return result;
};
