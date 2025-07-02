'use strict';

const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function (input) {

    const criteria = input.data.criteria;

    const parameters = {
        currentPartyCode: null,
        lastName: null,
        firstName: null,
        middleName: null,
        middleNameExists: false,
        dateOfBirth: null,
        OGRNOGRNIP: null,
        isNaturalPerson: false,
        isLegalEntity: false
    };

    if (!criteria.partyType) {
        throw 'Party type is not provided!';
    }

    if (criteria.partyType == partyConstants.partyType.NaturalPerson) {

        parameters.isNaturalPerson = true;

        if (!criteria.lastName || !criteria.firstName || !criteria.dateOfBirth) {
            throw 'Not enough criteria for Natural Person!';
        }

        parameters.lastName = criteria.lastName;
        parameters.firstName = criteria.firstName;
        parameters.dateOfBirth = criteria.dateOfBirth;
        if (criteria.middleName) {
            parameters.middleName = criteria.middleName;
            parameters.middleNameExists = true;
        }

        parameters.documents = criteria.documents;

    }
    else if (criteria.partyType == partyConstants.partyType.LegalEntity) {

        parameters.isLegalEntity = true;

        if (!criteria.OGRNOGRNIP) {
            throw 'Not enough criteria for Legal Entity!';
        }

        parameters.OGRNOGRNIP = criteria.OGRNOGRNIP;

    }
    else {
        throw 'Incorrect party type!';
    }

    if (criteria.currentPartyCode) {
        parameters.currentPartyCode = criteria.currentPartyCode;
    }

    return {
        parameters: parameters
    };

};
