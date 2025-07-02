'use strict';

module.exports = function (sinkInput, sinkExchange) {

    const pcs = sinkExchange.resolveContext('pcs');
    let contractNumbers = pcs.map(_ => _.documentNo);
    contractNumbers = [...new Set(contractNumbers)];

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: contractNumbers,
                }
            }
        }
    };
};
