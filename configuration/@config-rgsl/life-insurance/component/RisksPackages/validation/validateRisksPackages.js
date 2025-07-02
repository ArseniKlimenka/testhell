'use strict';

const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { riskPackagesConfiguration } = require('@config-rgsl/life-insurance/lib/riskPackagesConfiguration');

/**
* @errorCode {errorCode} packageInsuredAge
* @errorCode {errorCode} packageInsuredAgeEnd
* @errorCode {errorCode} packageInsuredAgePH
* @errorCode {errorCode} packageInsuredAgeEndPH
* @errorCode {errorCode} packageIsPolicyHolder
* @errorCode {errorCode} packagePaymentFrequencyOneTime
* @errorCode {errorCode} doubleCDCAPCLRELOAS
* @errorCode {errorCode} packageCantBeTogether
*/
module.exports = function validateRisksPackages(input, ambientProperties) {

    const validationErrors = [];
    const dataPath = this.businessContext.dataPath;
    const body = this.businessContext.rootData;

    const contractIssueDate = body?.basicConditions?.issueDate;
    const contractEndDate = body?.policyTerms?.endDate;
    const insuredBirthDate = body?.insuredPerson?.partyData?.partyBody?.partyPersonData?.dateOfBirth;
    const insredAgeOnIssueDate = dateUtils.getYearDifference(insuredBirthDate, contractIssueDate);
    const insredAgeOnEndDate = dateUtils.getYearDifference(insuredBirthDate, contractEndDate);
    const phBirthDate = body?.policyHolder?.partyData?.partyBody?.partyPersonData?.dateOfBirth;
    const phAgeOnIssueDate = dateUtils.getYearDifference(phBirthDate, contractIssueDate);
    const phAgeOnEndDate = dateUtils.getYearDifference(phBirthDate, contractEndDate);
    const selectedPackages = body?.risksPackages?.selectedPackages ?? [];
    const isInsuredPolicyHolder = body?.insuredPerson?.isPolicyHolder;
    const paymentFrequencyCode = body?.basicConditions?.paymentFrequency?.paymentFrequencyCode;
    const paymentFrequencyDescription = body?.basicConditions?.paymentFrequency?.paymentFrequencyDescription;
    const currentProductCode = body?.mainInsuranceConditions?.insuranceProduct?.productCode;
    const isSecondPackage = selectedPackages.some(r => r.packageCode == 'TERMVVTB2');
    const isThirdPackage = selectedPackages.some(r => r.packageCode == 'TERMVVTB3');

    selectedPackages.forEach(item => {
        const packageConf = riskPackagesConfiguration({ packageCode: item.packageCode });
        if (insredAgeOnIssueDate > packageConf.insuredAgeOnIssueDateMax) {
            validationErrors.push({
                errorCode: "packageInsuredAge",
                errorDataPath: dataPath + '/selectedPackages',
                reference: {
                    entity: {
                        packageName: packageConf.packageName,
                        insuredAgeOnIssueDateMax: packageConf.insuredAgeOnIssueDateMax,
                        insredAgeOnIssueDate
                    }
                }
            });
        }
        if (insredAgeOnEndDate > packageConf.insuredAgeOnEndDateMax) {
            validationErrors.push({
                errorCode: "packageInsuredAgeEnd",
                errorDataPath: dataPath + '/selectedPackages',
                reference: {
                    entity: {
                        packageName: packageConf.packageName,
                        insuredAgeOnEndDateMax: packageConf.insuredAgeOnEndDateMax,
                        insredAgeOnEndDate
                    }
                }
            });
        }
        if (phAgeOnIssueDate > packageConf.phAgeOnIssueDateMax) {
            validationErrors.push({
                errorCode: "packageInsuredAgePH",
                errorDataPath: dataPath + '/selectedPackages',
                reference: {
                    entity: {
                        packageName: packageConf.packageName,
                        phAgeOnIssueDateMax: packageConf.phAgeOnIssueDateMax,
                        phAgeOnIssueDate
                    }
                }
            });
        }
        if (phAgeOnEndDate > packageConf.phAgeOnEndDateMax) {
            validationErrors.push({
                errorCode: "packageInsuredAgeEndPH",
                errorDataPath: dataPath + '/selectedPackages',
                reference: {
                    entity: {
                        packageName: packageConf.packageName,
                        phAgeOnEndDateMax: packageConf.phAgeOnEndDateMax,
                        phAgeOnEndDate
                    }
                }
            });
        }
        if (packageConf.isPolicyHolder && (packageConf.isPolicyHolder != isInsuredPolicyHolder)) {
            validationErrors.push({
                errorCode: "packageIsPolicyHolder",
                errorDataPath: dataPath + '/selectedPackages',
                reference: {
                    entity: {
                        packageCode: item.packageCode,
                        packageName: packageConf.packageName
                    }
                }
            });
        }
        if (item.packageCode == "I46204" && paymentFrequencyCode == lifeInsuranceConstants.paymentFrequency.oneTime.code) {
            validationErrors.push({
                errorCode: "packagePaymentFrequencyOneTime",
                errorDataPath: dataPath + '/selectedPackages',
                reference: {
                    entity: {
                        packageName: packageConf.packageName,
                        paymentFrequencyDescription: paymentFrequencyDescription
                    }
                }
            });
        }
    });

    const excludeForProducts = ['CAPCLCHILDOAS', 'CAPCLCHILDBOXOAS'];
    if (excludeForProducts.includes(currentProductCode)) {
        const packageIsPolicyHolderErrIndex = validationErrors.findIndex(item =>
            item.errorCode == 'packageIsPolicyHolder' &&
            item.reference.entity.packageCode == 'CD636404');
        if (packageIsPolicyHolderErrIndex != -1) {
            validationErrors.splice(packageIsPolicyHolderErrIndex, 1);
        }

    }

    if (currentProductCode == 'CAPCLRELOAS') {
        const existsCD36404 = selectedPackages.some(item => item.packageCode == 'CD36404');
        const existsCD636404 = selectedPackages.some(item => item.packageCode == 'CD636404');
        if (existsCD36404 && existsCD636404) {
            validationErrors.push({
                errorCode: "doubleCDCAPCLRELOAS",
                errorDataPath: dataPath + '/selectedPackages'
            });
        }
    }

    if (isSecondPackage && isThirdPackage) {
        validationErrors.push({
            errorCode: "packageCantBeTogether",
            errorDataPath: dataPath + '/selectedPackages',
        });
    }

    return validationErrors;
};
