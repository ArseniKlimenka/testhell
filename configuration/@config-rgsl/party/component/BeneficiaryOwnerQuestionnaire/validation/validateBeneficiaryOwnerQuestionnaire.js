'use strict';

const { getValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");

/**
* @errorCode {errorCode} relationTypeRequired
* @errorCode {errorCode} positionRequired
* @errorCode {errorCode} employerNameRequired
* @errorCode {errorCode} employerAddressRequired
*/

module.exports = function validateBeneficiaryOwnerQuestionnaire(input) {

    const answer1 = getValue(input, 'questionnaire1.answer', false);
    const relationType1 = getValue(input, 'questionnaire1.relationType');
    const position1 = getValue(input, 'questionnaire1.position');
    const employerName1 = getValue(input, 'questionnaire1.employerName');
    const employerAddress1 = getValue(input, 'questionnaire1.employerAddress');

    const answer2 = getValue(input, 'questionnaire2.answer', false);
    const relationType2 = getValue(input, 'questionnaire2.relationType');
    const position2 = getValue(input, 'questionnaire2.position');
    const employerName2 = getValue(input, 'questionnaire2.employerName');
    const employerAddress2 = getValue(input, 'questionnaire2.employerAddress');

    const answer3 = getValue(input, 'questionnaire3.answer', false);
    const relationType3 = getValue(input, 'questionnaire3.relationType');
    const position3 = getValue(input, 'questionnaire3.position');
    const employerName3 = getValue(input, 'questionnaire3.employerName');
    const employerAddress3 = getValue(input, 'questionnaire3.employerAddress');

    const validationErrors = [];

    if (answer1) {

        if (!relationType1 && !position1) {
            validationErrors.push({
                errorCode: 'relationTypeRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire1/relationType'
            });

            validationErrors.push({
                errorCode: 'positionRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire1/position'
            });
        }

        if (!employerName1) {
            validationErrors.push({
                errorCode: 'employerNameRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire1/employerName'
            });
        }

        if (!employerAddress1) {
            validationErrors.push({
                errorCode: 'employerAddressRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire1/employerAddress'
            });
        }
    }

    if (answer2) {

        if (!relationType2 && !position2) {
            validationErrors.push({
                errorCode: 'relationTypeRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire2/relationType'
            });

            validationErrors.push({
                errorCode: 'positionRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire2/position'
            });
        }

        if (!employerName2) {
            validationErrors.push({
                errorCode: 'employerNameRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire2/employerName'
            });
        }

        if (!employerAddress2) {
            validationErrors.push({
                errorCode: 'employerAddressRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire2/employerAddress'
            });
        }
    }

    if (answer3) {

        if (!relationType3 && !position3) {
            validationErrors.push({
                errorCode: 'relationTypeRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire3/relationType'
            });

            validationErrors.push({
                errorCode: 'positionRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire3/position'
            });
        }

        if (!employerName3) {
            validationErrors.push({
                errorCode: 'employerNameRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire3/employerName'
            });
        }

        if (!employerAddress3) {
            validationErrors.push({
                errorCode: 'employerAddressRequired',
                errorDataPath: '/beneficiaryOwnerQuestionnaire/questionnaire3/employerAddress'
            });
        }
    }

    return validationErrors;

};
