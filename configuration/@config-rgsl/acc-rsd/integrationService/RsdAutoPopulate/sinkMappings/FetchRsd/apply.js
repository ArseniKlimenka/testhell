'use strict';

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const rsdDocuments = sinkResult.data.map(r => r.resultData);

    if (rsdDocuments.length === 0) { throw 'RSD document in state `Draft` was not found!'; }
    if (rsdDocuments.length > 1) { throw 'Many documents found in state `Draft` or `Completing`!'; }

    const rsdDocument = rsdDocuments[0];
    if (rsdDocument.stateCode != 'Draft') { throw 'The RSD document must be in state `Draft`!'; }

    const rsdNumber = sinkExchange.resolveContext('rsdNumber');
    if (rsdDocument.rsdNumber != rsdNumber) { throw 'Wrong document number found!'; }

    sinkExchange.mapContext('rsd', rsdDocument);
};
