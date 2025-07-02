'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {
    const rsd = sinkExchange.resolveContext('rsd');
    const manualItems = sinkExchange.resolveContext('manualItems');
    const ppRsdItems = sinkExchange.resolveContext('ppRsdItems');

    const contractNumbersManual = manualItems.map(_ => _.contractNumber);
    const contractNumbersRsd = [...new Set(ppRsdItems.map(_ => _.contractNumber))];
    const contractNumbers = contractNumbersManual.filter(x => {
        return contractNumbersRsd.indexOf(x) === -1;
    });

    if (contractNumbers.length === 0) { return; }

    return {
        input: {
            data: {
                criteria: {
                    contractNumbers: contractNumbers,
                    onDate: sinkInput.onDate ?? rsd.createdDate,
                }
            }
        }
    };
};
