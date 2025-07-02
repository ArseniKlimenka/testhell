'use strict';

/**
 * @errorCode {errorCode} AllFieldsAreRequired
 * @errorCode {errorCode} NotFoundCodes
 * */

module.exports = function rootLevelValidation(input) {
    const validationErrors = [];

    delete input.validations;

    const listName = input.listName;
    const listDate = input.listDate;
    const creationDate = input.creationDate;

    if (!listName || !listDate || !creationDate) {

        validationErrors.push({
            errorCode: 'AllFieldsAreRequired',
        });
    }

    const notFoundCodes = input.notFoundCodes;

    if (input.notFoundCodes?.length > 0) {
        validationErrors.push({
            errorCode: 'NotFoundCodes',
            errorMessage: "Контрагенты '${agents}' не найдены",
            reference: {
                agents: notFoundCodes
            }
        });
    }

    return validationErrors;
};
