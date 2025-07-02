const flowRulesHelper = require('@config-rgsl/life-insurance/lib/flowRulesHelper');
const { quoteState, contractType, productCode, product, packageCode, riskCode, triggersInsuredSum } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');


/**
* @errorCode {errorCode} existsBlockTrigger
* @errorCode {errorCode} existsTrigger
* @errorCode {errorCode} medo
* @errorCode {errorCode} finDocuments
* @errorCode {errorCode} medCheck
*/

module.exports = function validateUWTriggers(input) {

    const validationErrors = [];
    const body = this.businessContext.rootData;
    const documentState = this.businessContext.documentState;
    const documentContractType = this.businessContext.configurationDimensions.contractType;
    const isCollectivePolicy = this.businessContext.configurationCodeName == productCode.CollectiveLifeInsurancePolicy;
    const riskSum = body.basicConditions?.riskInsuredSum;
    const productCodeBody = body.mainInsuranceConditions?.insuranceProduct?.productCode;
    const risks = body.risks;
    const riskConditions = body.riskConditions;
    const ageInsuredPerson = riskConditions?.insredAgeOnStartDate;
    const isAgeBetween18And65 = ageInsuredPerson >= 18 && ageInsuredPerson <= 65;
    const isAgeAfter65 = ageInsuredPerson > 65;

    const existsBlockTrigger = flowRulesHelper.existsTrigger(body, 'block');
    const existsTrigger = flowRulesHelper.existsTrigger(body);

    if (documentState == quoteState.Draft && (documentContractType == contractType.Quote || isCollectivePolicy)) {
        if (existsBlockTrigger) {
            validationErrors.push({
                severity: "Note",
                errorCode: "existsBlockTrigger"
            });
        }
        else if (existsTrigger) {
            validationErrors.push({
                severity: "Note",
                errorCode: "existsTrigger"
            });
        }
    }

    if (productCodeBody == 'TERMVVTB' && documentState == quoteState.Draft && documentContractType == contractType.Quote) {

        if ((riskSum >= 15000001 && isAgeBetween18And65) || (riskSum >= 5000001 && isAgeAfter65)) {
            validationErrors.push({
                severity: "Note",
                errorCode: "medo"
            });
        }
    }

    if (productCodeBody == product.TERMVVTB && documentState == quoteState.Draft && documentContractType == contractType.Quote) {
        const riskDLP42204 = risks.find(item => item.risk?.riskCode == riskCode.DLP42204);

        if (riskConditions?.risksPackages?.selectedPackages?.some(item => item.packageCode == packageCode.TERMVVTB1)) {
            const docTriggerInsuredSumDLP42204 = triggersInsuredSum.DLP42204.TERMVVTB.finDocuments.withPackage;

            if (riskDLP42204 && riskDLP42204.riskInsuredSum >= docTriggerInsuredSumDLP42204) {
                validationErrors.push({
                    severity: "Note",
                    errorCode: "finDocuments"
                });
            }
        } else {
            const docTriggerInsuredSumDLP42204 = triggersInsuredSum.DLP42204.TERMVVTB.finDocuments.withoutPackage;

            if (riskDLP42204 && riskDLP42204.riskInsuredSum >= docTriggerInsuredSumDLP42204) {
                validationErrors.push({
                    severity: "Note",
                    errorCode: "finDocuments"
                });
            }
        }
    }

    if ((productCodeBody == product.ECATFPVTB || productCodeBody == product.ECATFVVTB) && documentState == quoteState.Draft && documentContractType == contractType.Quote) {
        const isAgeBetween18And65 = ageInsuredPerson >= 18 && ageInsuredPerson <= 65;
        const riskDLPDPE36404 = risks.find(item => item.risk?.riskCode == riskCode.DLPDPE36404);
        const medTriggerInsuredSumDLPDPE36404 = triggersInsuredSum.DLPDPE36404.ECATFPVTB.medCheck.withoutPackage;
        const docTriggerInsuredSumDLPDPE36404 = triggersInsuredSum.DLPDPE36404.ECATFPVTB.finDocuments.withoutPackage;

        if (isAgeBetween18And65 && riskDLPDPE36404 && riskDLPDPE36404.riskInsuredSum >= medTriggerInsuredSumDLPDPE36404) {
            validationErrors.push({
                severity: "Note",
                errorCode: "medCheck"
            });
        }

        if (riskDLPDPE36404 && riskDLPDPE36404.riskInsuredSum >= docTriggerInsuredSumDLPDPE36404) {
            validationErrors.push({
                severity: "Note",
                errorCode: "finDocuments"
            });
        }
    }

    if (productCodeBody == product.ECATFUBRR && documentState == quoteState.Draft && documentContractType == contractType.Quote) {
        const isAgeBetween18And65 = ageInsuredPerson >= 18 && ageInsuredPerson <= 65;
        const riskDLPDPE36404 = risks.find(item => item.risk?.riskCode == riskCode.DLPDPE36404);
        const medTriggerInsuredSumDLPDPE36404 = triggersInsuredSum.DLPDPE36404.ECATFUBRR.medCheck.withoutPackage;
        const docTriggerInsuredSumDLPDPE36404 = triggersInsuredSum.DLPDPE36404.ECATFUBRR.finDocuments.withoutPackage;

        if (isAgeBetween18And65 && riskDLPDPE36404 && riskDLPDPE36404.riskInsuredSum >= medTriggerInsuredSumDLPDPE36404) {
            validationErrors.push({
                severity: "Note",
                errorCode: "medCheck"
            });
        }

        if (riskDLPDPE36404 && riskDLPDPE36404.riskInsuredSum >= docTriggerInsuredSumDLPDPE36404) {
            validationErrors.push({
                severity: "Note",
                errorCode: "finDocuments"
            });
        }
    }

    if ((productCodeBody == product.ECOFPVTB || productCodeBody == product.ECOFVVTB) && documentState == quoteState.Draft && documentContractType == contractType.Quote) {
        const isAgeBetween18And65 = ageInsuredPerson >= 18 && ageInsuredPerson <= 65;
        const riskDLPSS36404 = risks.find(item => item.risk?.riskCode == riskCode.DLPSS36404);
        const medTriggerInsuredSumDLPSS36404 = triggersInsuredSum.DLPSS36404.ECOFPVTB.medCheck.withoutPackage;

        if (isAgeBetween18And65 && riskDLPSS36404 && riskDLPSS36404.riskInsuredSum >= medTriggerInsuredSumDLPSS36404) {
            validationErrors.push({
                severity: "Note",
                errorCode: "medCheck"
            });
        }

        if (riskConditions?.risksPackages?.selectedPackages?.some(item => item.packageCode == packageCode.ECOFPVTB1 || item.packageCode == packageCode.ECOFVVTB1)) {
            const docTriggerInsuredSumDLPSS36404 = triggersInsuredSum.DLPSS36404.ECOFPVTB.finDocuments.withPackage;

            if (riskDLPSS36404 && riskDLPSS36404.riskInsuredSum >= docTriggerInsuredSumDLPSS36404) {
                validationErrors.push({
                    severity: "Note",
                    errorCode: "finDocuments"
                });
            }
        } else {
            const docTriggerInsuredSumDLPSS36404 = triggersInsuredSum.DLPSS36404.ECOFPVTB.finDocuments.withoutPackage;

            if (riskDLPSS36404 && riskDLPSS36404.riskInsuredSum >= docTriggerInsuredSumDLPSS36404) {
                validationErrors.push({
                    severity: "Note",
                    errorCode: "finDocuments"
                });
            }
        }
    }

    return validationErrors;

};
