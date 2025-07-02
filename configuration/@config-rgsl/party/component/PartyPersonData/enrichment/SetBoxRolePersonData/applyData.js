'use strict';

const { countryRussia } = require('@config-rgsl/party/lib/partyConstantsImpl');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const { getGenderFromMiddleName } = require('@config-rgsl/party/lib/partyGenderHelper');

module.exports = function applyData(partyPersonData) {

    const partyRole = this.businessContext?.rootData?.data?.partyRoleOfPerson?.partyRole || this.businessContext?.rootData?.partyRoleOfPerson?.partyRole;

    if (partyRole === configValidationByRole.PolicyHolderBoxNaturalPerson.code || partyRole === configValidationByRole.InsuredBoxNaturalPerson.code) {
        if (!partyPersonData.citizenship || partyPersonData.citizenship.length === 0) {
            partyPersonData.citizenship = [countryRussia];
        }

        if (partyPersonData.middleName === "") {
            partyPersonData.middleName = undefined;
        }
        else {
            const middleNameGender = getGenderFromMiddleName(partyPersonData.middleName);

            if (middleNameGender == partyConstants.gender.Female) {
                partyPersonData.personGender = partyConstants.gender.Female;
            }
            else if (middleNameGender == partyConstants.gender.Male) {
                partyPersonData.personGender = partyConstants.gender.Male;
            }
        }

    }

};
