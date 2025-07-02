module.exports = function mapping(input, sinkExchange) {

    const result = {
        documentId: input.id,
        configurationName: input.configurationCodeName,
        documentNo: input.number,
        accountingYear: input?.body?.accountingYear?.year,
        correctionNumber: parseInt(input?.body?.correctionNumber),
        contractNumber: input.body?.contract?.number
    };

    return result;
};
