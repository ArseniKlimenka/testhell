'use strict';

const { setCaclResult } = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');

module.exports = function mapping(input, sinkExchange) {

    const aaAmendmentNumber = sinkExchange.resolveContext('aaAmendmentNumber');
    const budgetRule = sinkExchange.resolveContext('budgetRule');
    const budgetRuleAlgorithm = sinkExchange.resolveContext('budgetRuleAlgorithm');
    const commItems = sinkExchange.resolveContext('commItems');
    const docsToUpdate = sinkExchange.resolveContext('docsToUpdate');
    const aaData = sinkExchange.resolveContext('aaData');

    if (!docsToUpdate || docsToUpdate.lengnth === 0) {

        throw 'no versions to update!';
    }

    const result = [];
    const configurationsToUpdate = [
        "AccumulatedLifeInsuranceQuote",
        "AccumulatedLifeInsurancePolicy",
        "AccumulatedLifeInsuranceFinChange",
        "AccumulatedLifeInsuranceNonFinChange",
        "AccumulatedLifeInsuranceTechnicalAmendment",
        "CreditLifeInsuranceQuote",
        "CreditLifeInsurancePolicy",
        "CreditLifeInsuranceFinChange",
        "CreditLifeInsuranceNonFinChange",
        "CreditLifeInsuranceTechnicalAmendment",
        "EquityLifeInsuranceQuote",
        "EquityLifeInsurancePolicy",
        "EquityLifeInsuranceFinChange",
        "EquityLifeInsuranceNonFinChange",
        "EquityLifeInsuranceTechnicalAmendment",
        "InvestmentLifeInsuranceQuote",
        "InvestmentLifeInsurancePolicy",
        "InvestmentLifeInsuranceFinChange",
        "InvestmentLifeInsuranceNonFinChange",
        "InvestmentLifeInsuranceTechnicalAmendment",
        "MedLifeInsuranceQuote",
        "MedLifeInsurancePolicy",
        "MedLifeInsuranceFinChange",
        "MedLifeInsuranceNonFinChange",
        "MedLifeInsuranceTechnicalAmendment",
        "RiskLifeInsuranceQuote",
        "RiskLifeInsurancePolicy",
        "RiskLifeInsuranceFinChange",
        "RiskLifeInsuranceNonFinChange",
        "RiskLifeInsuranceTechnicalAmendment",
        'AccidentLifeInsurancePolicy',
        'AccidentLifeInsuranceQuote'];

    docsToUpdate.forEach(doc => {

        if (configurationsToUpdate.includes(doc.conf)) {

            if (!doc.body.commission) {

                doc.body.commission = {};
            }

            if (aaData) {

                doc.body.commission.agentAgreement = aaData;
            }

            const originalData = {
                commission: JSON.parse(JSON.stringify(doc.body.commission))
            };

            setCaclResult(doc.body.commission.policyCommissionItems, commItems, aaAmendmentNumber, doc.body, budgetRule, budgetRuleAlgorithm);

            const modifiedData = {
                commission: doc.body.commission
            };

            doc.originalData = originalData;
            doc.modifiedData = modifiedData;
        }

        result.push({
            configurationName: doc.conf,
            configurationVersion: "1",
            number: doc.number,
            body: doc.body,
            allowOnValidationErrors: {
                all: true
            },
            allowUpdatingInStates: [doc.documentState],
            useSinkConfOverride: true,
            allowActiveDocumentsUpdate: true
        });
    });

    return result;
};

