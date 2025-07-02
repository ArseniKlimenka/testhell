'use strict';

// returned for example by data sources: GetDocumentData, GetMasterEntityData, GetEntityData
const ENTITY_NOT_FOUND = 'SYS-0243';

function getEntityNotFoundError(errorInput) {

    if (errorInput.businessErrors && errorInput.businessErrors.length > 0) {

        const entNotFoundError = errorInput.businessErrors.filter(err => err.code === ENTITY_NOT_FOUND);

        if (entNotFoundError && entNotFoundError.length > 0) {

            return entNotFoundError[0];
        }
    }
}

function prepareError(errorCode, message, detailedMessage) {

    const response = {
        code: errorCode,
        message: message
    };

    if (detailedMessage) {

        response.additionalErrorData = {
            message: detailedMessage
        };
    }

    return response;
}

module.exports = {
    getEntityNotFoundError,
    prepareError
};
