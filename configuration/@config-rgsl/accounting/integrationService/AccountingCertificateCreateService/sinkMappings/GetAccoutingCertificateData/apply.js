"use strict";

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const certificateData = sinkResult.data.map(_ => _.resultData)[0];
    sinkExchange.certificateBody = JSON.parse(certificateData?.body);
    sinkExchange.businessNumber = certificateData?.accountingCertificateNumber;
};
