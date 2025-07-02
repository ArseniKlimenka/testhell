'use strict';
const { executionStatuses, errorCodes, getCommissionItems } = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    let message = undefined;

    if (!sinkResult || sinkResult.status === undefined) {

        throw 'Не получен ответ от сервиса!';
    }

    if (sinkResult.status !== executionStatuses.Completed) {

        if (sinkResult.errorCode === errorCodes.NotSingleResult) {

            message = 'Расчет вернул несколько результатов!';
        }
        else if (sinkResult.errorCode === errorCodes.NotFound) {

            message = 'Расчет не вернул результатов!';
        }
        else {

            message = 'Неизвестная ошибка сервиса!';
        }
    }

    const docsToUpdate = sinkExchange.resolveContext('docsToUpdate');
    const baseDocument = docsToUpdate.find(d => d.seq === 0);

    const commItems = getCommissionItems(sinkResult, baseDocument.body);

    sinkExchange.mapContext('aaAmendmentNumber', sinkResult.amendmentNumber);
    sinkExchange.mapContext('budgetRule', sinkResult.budgetRule);
    sinkExchange.mapContext('budgetRuleAlgorithm', sinkResult.budgetRuleAlgorithm);
    sinkExchange.mapContext('commItems', commItems);
    sinkExchange.mapContext('message', message);
};
