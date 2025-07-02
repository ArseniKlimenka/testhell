const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { skipForMigrated } = require('@config-rgsl/life-insurance/lib/migrationValidationHelper');

/**
* @errorCode {errorCode} needConfirmationInsuredPerson
* @errorCode {errorCode} needNotConfirmedItemInsuredPerson
*/
module.exports = function validatedeclarationSportConfirmation(input, ambientProperties) {

    const validationErrors = [];

    const body = this.businessContext.rootData;
    const declarationMain = body.declarationMain || [];
    const allItemsConfirmedPolicyHolder = declarationMain.every(item => item.agreementPolicyHolder == true);
    const allItemsConfirmedInsuredPerson = declarationMain.every(item => item.agreementInsuredPerson == true);
    const isConfirmedSportInsuredPerson = getValue(input, 'isConfirmedSportInsuredPerson', false);
    const isNotConfirmedSportInsuredPerson = getValue(input, 'isNotConfirmedSportInsuredPerson', false);
    const isPolicyHolder = getValue(body, 'insuredPerson.isPolicyHolder');
    const skipMigrated = skipForMigrated(this.businessContext.rootData);
    const contractType = getValue(this, 'businessContext.configurationDimensions.contractType');
    const productGroup = getValue(this, 'businessContext.configurationDimensions.productGroup');
    const sequenceNumber = getValue(this, 'businessContext.sequenceNumber');
    const isCreditAmendment = productGroup == 'credit' && (contractType == 'Amendment' || sequenceNumber > 0);
    const isSportOptionEnable = getValue(body, 'amateurSportCondition.amateurSportOption', false);

    // Временное решение от бизнеса

    // if (!skipMigrated && !isCreditAmendment) {
    //     if (isSportOptionEnable) {
    //         if (!isConfirmedSportInsuredPerson && !isNotConfirmedSportInsuredPerson) {
    //             validationErrors.push({
    //                 errorCode: "needConfirmationInsuredPerson",
    //                 errorDataPath: '/declarationSportConfirmation/isConfirmedSportInsuredPerson'
    //             });
    //         }

    //         if (isNotConfirmedSportInsuredPerson && allItemsConfirmedInsuredPerson) {
    //             validationErrors.push({
    //                 errorCode: "needNotConfirmedItemInsuredPerson",
    //                 errorDataPath: '/declarationSport'
    //             });
    //         }
    //     }
    // }

    return validationErrors;

};
