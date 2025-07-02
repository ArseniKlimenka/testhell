'use strict';

const riskConditionsHelper = require('@config-rgsl/life-insurance/lib/riskConditions');
const { changeAmendmentTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function riskResponseMapping(input, ambientProperties) {

    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;

    let result = [];

    if ((input?.response?.data?.length ?? 0) > 0) {

        result = input.response.data.map(elem => elem.resultData);

        const amendmentType = input.rootContext.Dimensions.amendmentType;

        if (amendmentType !== changeAmendmentTypes.financialChange) {

            result = result.filter(elem => {

                let IsConditionsPassed = true;
                const riskConditions = input.rootContext.Body.riskConditions;
                const conditionFunctionName = elem.conditionsFunction;
                const conditionFunctionReference = riskConditionsHelper[conditionFunctionName];

                if (conditionFunctionReference) {

                    IsConditionsPassed = conditionFunctionReference(riskConditions, currentWorkUnitActor);
                }

                return IsConditionsPassed;
            });
        }
        else {

            const productCode = input.rootContext.Body.mainInsuranceConditions.insuranceProduct.productCode;
            const risksByProduct = result.filter(r => r.productCode === productCode);

            if (risksByProduct.length > 0) {

                result = risksByProduct;
            }
        }

        result = result.map(r => {

            const mappedRisk = {
                value: {
                    riskShortDescription: r.riskShortDescription,
                    riskFullDescription: r.riskFullDescription,
                    isLife: r.isLife,
                    withoutProduct: r.withoutProduct ?? false,
                    riskCode: r.riskCode,
                    conditionsFunction: r.conditionsFunction ?? '',
                    riskOrder: r.riskOrder,
                    riskProgram: r.riskProgram,
                    riskPerson: r.riskPerson,
                    risksGroup: r.risksGroup
                },
                displayName: `${r.riskShortDescription} (Код риска: ${r.riskCode} Код продукта: ${r.productCode ?? 'Не установлен'})`
            };

            const currentRisk = input.rootContext.Body.risks.find(r => r.risk.riskCode === mappedRisk.value.riskCode);

            if (mappedRisk.value.withoutProduct) {

                if (currentRisk) {

                    mappedRisk.value.riskProgram = currentRisk.manualRiskProgram;
                    mappedRisk.value.riskPerson = currentRisk.manualRiskPerson;
                }
            }

            return mappedRisk;
        }).sort((a, b) => (a.riskShortDescription > b.riskShortDescription) ? 1 : ((b.riskShortDescription > a.riskShortDescription) ? -1 : 0));
    }

    return result;
};
