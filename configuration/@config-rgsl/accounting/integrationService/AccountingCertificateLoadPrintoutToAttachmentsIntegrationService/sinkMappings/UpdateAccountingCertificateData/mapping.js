'use strict';

module.exports = function accountingCertificateMapping(sinkInput, sinkExchange) {

    const result = {
        number: sinkInput.documentNo,
        state: sinkInput.state,
        body: sinkInput.body
    };

    return result;

};
