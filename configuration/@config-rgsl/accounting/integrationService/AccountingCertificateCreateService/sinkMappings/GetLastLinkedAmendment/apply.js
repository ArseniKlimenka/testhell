"use strict";

const { states } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

const { highlightErrorMessage } = require('@config-rgsl/infrastructure/lib/errorUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const certificateData = sinkResult.data.map(_ => _.resultData)[0];

    if (!certificateData) {
        const msg = `Е: Указанной справки с номером ${sinkInput?.input?.data?.criteria?.origDocNumber} не существует`;
        throw new Error(highlightErrorMessage(msg));
    }

    if (certificateData?.stateCode === states.Checked || certificateData?.stateCode === states.Draft) {

        const msg = `Е: К данной справке ${sinkInput?.input?.data?.criteria?.origDocNumber} имеются корректировки в нефинальном статусе ${certificateData.documentNumber}`;
        throw new Error(highlightErrorMessage(msg));
    }

    sinkExchange.lastCorrectionNumber = certificateData.correctionNumber;
};
