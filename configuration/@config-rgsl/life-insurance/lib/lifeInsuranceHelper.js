const { isSaveOperationAvailable } = require('@config-rgsl/infrastructure/lib/UIUtils');
const { availableInsuranceTermsDays, currency, product, mainRiskCodeConstants, productGroupArray } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { sportTypes, sportTypes2 } = require('@config-rgsl/infrastructure/lib/sportConstants');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { businessRules } = require('@adinsure/runtime');

const noteProducts = [
    'NOTEV2BFKO',
    'NOTE2BFKO',
    'NOTE3BFKO',
    'NOTE1BFKO',
    'NOTE1BFKO3',
    'NOTE1BFKO4',
    'NOTEV1BFKO'
];

const vtbProducts = [
    'TERMVVTB'
];

function isNoteProduct(productCode) {
    if (!productCode) {
        return false;
    }

    return noteProducts.includes(productCode);
}

function isVtbProduct(productCode) {
    if (!productCode) {
        return false;
    }

    return vtbProducts.includes(productCode);
}

function canGenerateNotePolicyNumberUI(input, self) {

    const number = input.context?.Number;
    const body = input.context.Body;
    const validations = input.context?.ValidationResult?.schemaValidations ?? [];
    const futureContractNumber = body.technicalInformation?.futureContractNumber;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const uwTriggers = body.uwTriggers ?? [];
    const hasUWTriggers = uwTriggers.filter(x => x.departament == 'underwriting').length > 0;
    const hasComplianceTriggers = uwTriggers.filter(x => x.departament == 'compliance').length > 0;
    const risks = body.risks;
    const riskDLP = risks.filter(r => r.risk.riskCode == 'DLP42204');
    const sumInsured = riskDLP[0]?.riskInsuredSum;
    const ageInsuredPerson = body.riskConditions.insredAgeOnStartDate;
    const isAgeBetween18And65 = ageInsuredPerson >= 18 && ageInsuredPerson <= 65;
    const isAgeAfter65 = ageInsuredPerson > 65;

    const actor = input.context.WorkUnitActor.CurrentActor;
    const stateCode = input.context.State.Code;

    if (actor == 'Agent' && stateCode == 'Draft') {

        if (productCode == product.TERMVVTB && (sumInsured >= 15000001 && isAgeBetween18And65)) {

            return !futureContractNumber
                && isVtbProduct(productCode)
                && number
                && isSaveOperationAvailable(self);

        } else if (productCode == product.TERMVVTB && (sumInsured >= 5000001 && isAgeAfter65)) {

            return !futureContractNumber
                && isVtbProduct(productCode)
                && number
                && isSaveOperationAvailable(self);
        }

        return !futureContractNumber
            && isNoteProduct(productCode)
            && validations.filter(x => x.severity != 'Note').length == 0
            && number
            && isSaveOperationAvailable(self)
            && !hasUWTriggers
            && !hasComplianceTriggers;
    }

    if (actor != 'Agent' && stateCode == 'OnReview' && !isVtbProduct(productCode)) {

        return !futureContractNumber
            && isNoteProduct(productCode)
            && isSaveOperationAvailable(self);
    }

    return false;
}

function canGenerateNotePolicyNumberService(input, self) {

    const body = input.context.Body;
    const validations = input.context?.ValidationResult?.schemaValidations ?? [];
    const futureContractNumber = body.technicalInformation?.futureContractNumber;
    const productCode = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const uwTriggers = body.uwTriggers ?? [];
    const hasUWTriggers = uwTriggers.filter(x => x.departament == 'underwriting').length > 0;
    const hasComplianceTriggers = uwTriggers.filter(x => x.departament == 'compliance').length > 0;

    const documentState = self.businessContext.documentState;
    const actor = self.applicationContext.actor;
    const riskSum = body.basicConditions?.riskInsuredSum;
    const ageInsuredPerson = body.riskConditions?.insredAgeOnStartDate;
    const isAgeBetween18And65 = ageInsuredPerson >= 18 && ageInsuredPerson <= 65;
    const isAgeAfter65 = ageInsuredPerson > 65;

    if (documentState == 'Draft') {

        if (actor == 'Operations' && productCode == 'NOTEV1BFKO') {

            return false;
        }

        if (productCode == product.TERMVVTB) {
            if ((riskSum >= 15000001 && isAgeBetween18And65) || (riskSum >= 5000001 && isAgeAfter65)) {
                return !futureContractNumber
                    && isVtbProduct(productCode);
            }
        } else {
            return !futureContractNumber
                && isNoteProduct(productCode)
                && validations.filter(x => x.severity != 'Note').length == 0
                && !hasUWTriggers
                && !hasComplianceTriggers;
        }
    }

    if (documentState == 'OnReview') {

        return !futureContractNumber
            && (isNoteProduct(productCode) || isVtbProduct(productCode));
    }

    return false;

}

function getDayByCurrency(productConf, isReinvest, currencyCode, daysBetweenIssueAndStartDynamic = undefined) {

    let result = 0;

    if (daysBetweenIssueAndStartDynamic) {
        return daysBetweenIssueAndStartDynamic ?? 0;
    }

    if (Object.prototype.hasOwnProperty.call(currency, currencyCode)) {
        result = isReinvest ? productConf?.daysBetweenIssueAndStartReinvest[currencyCode] : productConf?.daysBetweenIssueAndStart[currencyCode];
    }

    return result ? result : 0;
}

function cleanDeletedRisks(input) {

    if (input.context.Body.mainInsuranceConditions.restoreAllRisks) {
        input.context.Body.mainInsuranceConditions.restoreAllRisks = false;
        input.context.Body.mainInsuranceConditions.deletedRisks = [];
    }
}

function getMainRiskCode(productCode) {

    let mainRiskCode;

    if (productCode) {
        const tariffConstants = businessRules.getRuleByVersion('TariffConstantsRule', 1).rule;
        mainRiskCode = tariffConstants({ productCode }).result.mainRiskCode ?? mainRiskCodeConstants.NO_MAIN_RISK;
    }

    return mainRiskCode;
}

function checkDRPKCommissionIncrease(productCode, policyCommissionItems) {

    const isSkipDRPKInCaseOfIncrease = productGroupArray.SKIP_DRPK_IN_CASE_OF_INCREASE.includes(productCode);
    return isSkipDRPKInCaseOfIncrease && policyCommissionItems && policyCommissionItems.length > 0 && policyCommissionItems[0]?.calculatedRate && policyCommissionItems[0]?.manualRate && (policyCommissionItems[0]?.calculatedRate < policyCommissionItems[0]?.manualRate);

}

function mapAvailableInsuranceTermsDays(insuranceTermsDaysValues) {

    return availableInsuranceTermsDays.filter(termDay => insuranceTermsDaysValues?.includes(termDay.value));
}

function getAvailableInsuranceTermDay(insuranceTermDayValues) {

    return availableInsuranceTermsDays.find(termDay => insuranceTermDayValues == termDay.value);
}

function mapSportTypes(rawSportTypes, productCode) {

    return productCode === product.ACCIDPC2 ? sportTypes2.filter(x => rawSportTypes?.map(x => x.code)?.includes(x.code)) : sportTypes.filter(x => rawSportTypes?.map(x => x.code)?.includes(x.code));
}

function cleanTextSMS(productDescription) {

    return productDescription.replace(/\s*\(.*?\)/, '');
}

module.exports = {
    noteProducts,
    isNoteProduct,
    isVtbProduct,
    canGenerateNotePolicyNumberUI,
    canGenerateNotePolicyNumberService,
    getDayByCurrency,
    cleanDeletedRisks,
    getMainRiskCode,
    checkDRPKCommissionIncrease,
    mapAvailableInsuranceTermsDays,
    getAvailableInsuranceTermDay,
    mapSportTypes,
    cleanTextSMS
};
