
'use strict';

const { productGroup, product, policyState } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { checkPersonBirthday } = require('@config-rgsl/party/lib/partyValidationHelper');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

/**
* @errorCode {errorCode} shareSum100
* @errorCode {errorCode} shareSumMore100
* @errorCode {errorCode} insuredIsBeneficiary
* @errorCode {errorCode} beneficiariesDuplicates
* @errorCode {errorCode} beneficiariesIsHeritors
* @errorCode {errorCode} beneficiariesIsNotHeritors
* @errorCode {errorCode} beneficiaryBirthDateMustBeGreaterThan1901YearAndLesserThanToday
* @errorCode {errorCode} notExistsNonAdult
* @errorCode {errorCode} allBbeneficiariesSumsMore100
*/
module.exports = function validateBeneficiaries(input, ambientProperties) {

    const validationErrors = [];

    const body = this.businessContext.rootData;
    const beneficiaries = getValue(input, 'beneficiaries', []);
    const insuredPersonPartyFullName = getValue(body, 'insuredPerson.partyData.partyFullName');
    const insuredPersonPartyDateOfBirth = getValue(body, 'insuredPerson.partyData.dateOfBirth');
    const insuredIsBeneficiary = beneficiaries.some(item => item.partyFullName == insuredPersonPartyFullName && item.dateOfBirth == insuredPersonPartyDateOfBirth);
    const beneficiariesDuplicates = beneficiaries.some((item, itemIdx) =>
        beneficiaries.some((subItem, subItemIdx) =>
            item.partyFullName == subItem.partyFullName && item.beneficiaryCategory == subItem.beneficiaryCategory && itemIdx != subItemIdx));
    const isHeritors = getValue(input, 'isHeritors', false);
    const isNotHeritors = getValue(input, 'isNotHeritors', false);
    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
    const currentProductGroup = getValue(body, 'mainInsuranceConditions.insuranceProduct.productGroup');
    const isMedProductGroup = productGroup.DMS.descriptionRU.includes(currentProductGroup);
    const isWCENOAS = [product.WCENOAS, product.WCEN3OAS].includes(productCode);
    const dataPath = this.businessContext.dataPath;
    const shareSums = {
        'Standard': beneficiaries.reduce((sum, item) => { return sum + (item.beneficiaryCategory == 'Standard' ? item.share : 0) || 0; }, 0),
        'NonAdult': beneficiaries.reduce((sum, item) => { return sum + (item.beneficiaryCategory == 'NonAdult' ? item.share : 0) || 0; }, 0)
    };
    const shareSum = Math.max(shareSums['Standard'], shareSums['NonAdult']);
    const currentActor = this.applicationContext?.actor;
    const isOperationsActor =
        currentActor === lifeInsuranceConstants.actor.Operations ||
        currentActor === lifeInsuranceConstants.actor.OperationsDirector;
    const typeOperationApproval = [policyState.OperationsApproval].includes(this.businessContext.documentState);
    const typeActivated = [policyState.Activated].includes(this.businessContext.documentState) && (currentActor === lifeInsuranceConstants.actor.Agent || isOperationsActor);
    const operuAdultEnable = isOperationsActor && typeOperationApproval;
    const sumsAllBeneficiaries = shareSums['Standard'] + shareSums['NonAdult'] || 0;

    for (let i = 0; i < beneficiaries.length; i++) {

        const beneficiary = beneficiaries[i];

        const isdateOfBirthIncorrect = checkPersonBirthday(beneficiary.dateOfBirth);

        if (isdateOfBirthIncorrect) {

            validationErrors.push({
                errorCode: 'beneficiaryBirthDateMustBeGreaterThan1901YearAndLesserThanToday',
                errorDataPath: `${dataPath}/${i}/dateOfBirth`
            });
        }
    }

    if (isMedProductGroup) {
        return validationErrors;
    }

    if (isWCENOAS && shareSum != 1) {
        validationErrors.push({
            errorCode: "shareSum100",
            errorDataPath: '/beneficiaries/beneficiaries'
        });
    }

    if (!isWCENOAS && shareSum > 1) {
        validationErrors.push({
            errorCode: "shareSumMore100",
            errorDataPath: '/beneficiaries/beneficiaries'
        });
    }

    if (insuredIsBeneficiary) {
        validationErrors.push({
            errorCode: "insuredIsBeneficiary",
            errorDataPath: '/beneficiaries/beneficiaries'
        });
    }

    if (beneficiariesDuplicates) {
        validationErrors.push({
            errorCode: "beneficiariesDuplicates",
            errorDataPath: '/beneficiaries/beneficiaries'
        });
    }

    if (!isHeritors && !isNotHeritors) {
        validationErrors.push({
            errorCode: "beneficiariesIsHeritors",
            errorDataPath: '/beneficiaries/isHeritors'
        });
    }

    if (isNotHeritors && beneficiaries.length == 0) {
        validationErrors.push({
            errorCode: "beneficiariesIsNotHeritors",
            errorDataPath: '/beneficiaries/beneficiaries',
            reference: {
                entity: {
                    additionalText: isWCENOAS ? '' : ' либо указать, что это наследники застрахованного лица по закону'
                }
            }
        });
    }

    if (lifeInsuranceConstants.productGroupArray.ECATF.includes(productCode) && !operuAdultEnable && !typeActivated) {
        const existsNonAdult = beneficiaries.some(item => item.beneficiaryCategory == 'NonAdult');
        if (!existsNonAdult) {
            validationErrors.push({
                errorCode: "notExistsNonAdult",
                errorDataPath: '/beneficiaries/beneficiaries'
            });
        }
    }

    if (lifeInsuranceConstants.productGroupArray.ECATF.includes(productCode) && operuAdultEnable && sumsAllBeneficiaries > 1) {
        validationErrors.push({
            errorCode: "allBbeneficiariesSumsMore100",
            errorDataPath: '/beneficiaries/beneficiaries'
        });
    }

    return validationErrors;

};
