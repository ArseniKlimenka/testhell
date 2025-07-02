'use strict';

const { commissionActStatusCode } = require('@config-rgsl/acc-base/lib/actConsts');

module.exports = function (sinkResult, sinkInput, sinkExchange) {

    const documents = sinkResult.data.map(r => r.resultData);

    if (documents.length === 0) { throw 'Act document was not found!'; }
    if (documents.length > 1) { throw 'Many documents was found!'; }

    const document = documents[0];

    if (document.stateCode !== commissionActStatusCode.DRAFT) { throw 'Document must be in Draft state!'; }

    sinkExchange.mapContext('act', document);
};
