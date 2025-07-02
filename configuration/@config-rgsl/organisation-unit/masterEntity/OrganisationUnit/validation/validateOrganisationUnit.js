const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

/**
* @errorCode {errorCode} onlyParentOrPartner
*/

module.exports = function validateOrganisationUnit(input, ambientProperties) {

    const validationErrors = [];

    const parentCode = getValue(input, 'parentCode');
    const partnerCode = getValue(input, 'partnerCode');

    if ((parentCode && partnerCode) || (!parentCode && !partnerCode)) {
        validationErrors.push({
            errorCode: "onlyParentOrPartner"
        });
    }

    return validationErrors;

};
