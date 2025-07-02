'use strict';
const { groupBy, getPropertyName } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { executionStatuses, errorCodes } = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    sinkExchange.request = (sinkResult.data && sinkResult.data.length > 0 && sinkResult.data[0].resultData.registrator) || undefined;
    sinkExchange.result = getResult(sinkResult);
    sinkExchange.errorCode = getError(sinkResult, sinkExchange.result);
    sinkExchange.status = getStatus(sinkResult);
};

function getResult(sinkResult) {

    if (sinkResult.data && sinkResult.data.length > 0) {

        let data = sinkResult.data.map(data => data.resultData);
        data = setCommissionRulesByInsuranceYear(data);

        const groupedByYear = groupBy(data, getPropertyName(data[0], d => d.insuranceYear));

        const duplicates = groupedByYear.find(group => group.items.length > 1);

        if (duplicates) {

            return undefined;
        }

        const result = groupedByYear.map(group => {

            return group.items[0];
        });

        return result;
    }


    return undefined;

}

function getError(sinkResult, calcResult) {

    if (!sinkResult.data || sinkResult.data.length === 0) {

        return errorCodes.NotFound;
    }
    else if (sinkResult.data && sinkResult.data.length > 0 && !calcResult) {

        return errorCodes.NotSingleResult;
    }


    return undefined;

}

function getStatus(sinkResult) {

    if (sinkResult.data && sinkResult.data.length > 0) {

        return executionStatuses.Completed;
    }


    return executionStatuses.Failed;

}

function setCommissionRulesByInsuranceYear(data) {

    const result = [];

    let ruleNum = 1;

    for (const item of data) {

        const from = item.insuranceYearFrom;
        const to = item.insuranceYearTo;

        for (let i = from; i <= to; i++) {

            const rule = { ...item };
            rule.insuranceYear = i;
            rule.ruleNum = ruleNum;

            if (rule.insuranceYearFrom != undefined) {

                delete rule.insuranceYearFrom;
            }

            if (rule.insuranceYearTo != undefined) {

                delete rule.insuranceYearTo;
            }

            result.push(rule);
            ruleNum++;
        }
    }

    return result;
}
