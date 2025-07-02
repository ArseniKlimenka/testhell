module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.configurationName = 'AccountingCertificateImport';
    sinkExchange.createdCertificateId = sinkResult.id;
    sinkExchange.createdCertificateNumber = sinkResult.documentNumber;
};
