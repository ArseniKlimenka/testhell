'use strict';

const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { equityLifeInsuranceAmendments } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { fundStatusConst } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {
    const currentRow = sinkExchange.currentRow;
    const fundStatus = currentRow?.fundStatus;

    if (fundStatus !== fundStatusConst.SOLD_OUT.DESCRIPTION) {
        return;
    }

    if (sinkResult.data.length == 0) {
        amendmentMissingError(currentRow);
    }

    if (sinkResult.data.length > 0) {
        const cancellationAmendments = sinkResult.data.filter(
            (amendment) =>
                amendment.resultData.publishedArtifactCode ===
                equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation
        );

        if (cancellationAmendments.length == 0) {
            amendmentMissingError(currentRow);
        }

        const awaitingDissolutionAmendments = cancellationAmendments.filter(
            (amendment) =>
                amendment.resultData.processStateCode ===
                amendmentConstants.cancellationAmendmentState.AwaitingDissolution
        );

        if (awaitingDissolutionAmendments.length == 0) {
            amendmentWrongStateError(currentRow);
        }

        sinkExchange.globalContext.amendmentNumber = awaitingDissolutionAmendments[0].resultData.contractNumber;
        sinkExchange.globalContext.amendmentConfigurationCodeName = equityLifeInsuranceAmendments.EquityLifeInsuranceCancellation;
    }
};

function amendmentMissingError(currentRow) {
    throw new Error(`E: ДС на расторжение не найдено в системе.
        Номер строки Excel: ${currentRow.excelRowNumber}. Номер договора ${currentRow.documentNumber}.`);
}

function amendmentWrongStateError(currentRow) {
    throw new Error(`E: Нельзя перевести ДС в статус "Активы распроданы". Проверьте статус ДС на расторжение.
        Номер строки Excel: ${currentRow.excelRowNumber}. Номер договора ${currentRow.documentNumber}.`);
}
