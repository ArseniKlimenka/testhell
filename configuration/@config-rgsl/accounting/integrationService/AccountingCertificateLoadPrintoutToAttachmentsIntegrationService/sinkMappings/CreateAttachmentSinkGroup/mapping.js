module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        configurationName: sinkInput.configurationName,
        documentId: sinkInput.documentId,
        documentNo: sinkInput.documentNo,
        accountingYear: sinkInput.accountingYear,
        correctionNumber: sinkInput.correctionNumber,
        contractNumber: sinkInput.contractNumber,
    };

};
