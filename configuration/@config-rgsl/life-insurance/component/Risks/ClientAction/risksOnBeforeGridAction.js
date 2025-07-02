'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const riskEndDateHelper = require('@config-rgsl/life-insurance/lib/riskEndDateCalc');
const riskUtils = require('@config-rgsl/life-insurance/lib/riskUtils');
const { product } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = function risksOnBeforeGridAction(input, ambientProperties) {

    const { affectedRow, operationType, context } = input;
    const body = context.Body;
    let isActionAllowed = true;
    const dimensions = input.context.Dimensions;

    const isEmptyRisk = affectedRow.risk == undefined;
    const isDuplicatedRisk = !isEmptyRisk && input.gridData.some(row => row.risk.riskCode == affectedRow.risk.riskCode);

    const risks = ['DVV36404', 'DAVV36404'];
    const isVTB = [product.ECOFPVTB, product.ECOFVVTB, product.ECOF2ZENIT].includes(body.mainInsuranceConditions.insuranceProduct.productCode);


    if (operationType == 'Delete' && risks.includes(affectedRow.risk.riskCode) && !isVTB) {

        body.mainInsuranceConditions.isHardcoreDeletedRisk = true;
    }

    if (body.mainInsuranceConditions.insuranceProduct.productCode == product.TERMVVTB && operationType == 'Delete') {

        input.componentContext.forEach((item) => {

            if (item.risk.riskCode == affectedRow.risk.riskCode) {

                if (!body.mainInsuranceConditions.deletedRisks) {

                    body.mainInsuranceConditions.deletedRisks = [];
                }

                body.mainInsuranceConditions.deletedRisks.push(item.risk.riskCode);
            }
        });
    }

    // prevent from saving duplicates of empty risk-rows
    switch (operationType) {
        case 'Add':
            isActionAllowed =
                preventEmptyRisk({ isEmptyRisk, ambientProperties })
                && preventDuplicatedRisk({ isDuplicatedRisk, ambientProperties });
            break;
        case 'Edit':
            isActionAllowed = preventEmptyRisk({ isEmptyRisk, ambientProperties });
            break;
        default:
            break;
    }

    setRiskEndDate({ body, affectedRow, dimensions });

    if ((operationType === 'Edit' || operationType === 'Add') && affectedRow.risk.withoutProduct) {

        setDataForNotProductRelatedRisks(input, affectedRow, dimensions);
    }

    return isActionAllowed;
};

function preventEmptyRisk({ isEmptyRisk, ambientProperties }) {

    if (isEmptyRisk) {

        ambientProperties.services.confirmationDialog.showWarning("Нельзя сохранить данные с незаполненным риском.");
        return false;
    }

    return true;
}

function preventDuplicatedRisk({ isDuplicatedRisk, ambientProperties }) {

    if (isDuplicatedRisk) {

        ambientProperties.services.confirmationDialog.showWarning("Выбранный риск уже добавлен в таблицу.");
        return false;
    }

    return true;
}

function setRiskEndDate({ body, affectedRow, dimensions }) {

    const amendmentType = dimensions.amendmentType;

    if (amendmentType === changeAmendmentTypes.financialChange) {

        return;
    }

    const riskConditions = riskUtils.getBodyContext(body, dimensions.amendmentType);
    const conditionFunctionName = getValue(affectedRow, 'risk.conditionsFunction');
    const riskEndDateFunctionReference = conditionFunctionName && getValue(riskEndDateHelper, conditionFunctionName);
    const riskEndDate = riskEndDateFunctionReference ? riskEndDateFunctionReference(riskConditions) : riskConditions.contractEndDate;
    const productCode = body?.productConfiguration?.productCode;
    const productsWithInterchangeableRisks = ["ECATFPVTB", "ECATFVVTB"];
    if (productCode && !productsWithInterchangeableRisks.includes(productCode)) { affectedRow.startDate = riskConditions.contractSartDate; }
    affectedRow.endDate = riskEndDate;
}

function setDataForNotProductRelatedRisks(input, affectedRow, dimensions) {

    const amendmentType = dimensions.amendmentType;
    const stateCode = input.rootContext?.State?.Code;
    const isDraftFinChange = amendmentType === changeAmendmentTypes.financialChange && (stateCode === 'Draft' || stateCode === 'OperationsApproval');

    if (!isDraftFinChange) {

        return;
    }

    affectedRow.risk.riskProgram = affectedRow.manualRiskProgram;
    affectedRow.risk.riskPerson = affectedRow.manualRiskPerson;
}
