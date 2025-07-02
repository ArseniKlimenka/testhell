const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const { getGenderFromMiddleName } = require('@config-rgsl/party/lib/partyGenderHelper');

module.exports = function personGenderChanged(input, ambientProperties) {

    const middleName = input.data.middleName;
    const middleNameGender = getGenderFromMiddleName(middleName);

    if (middleNameGender == partyConstants.gender.Female && input.data.personGender == partyConstants.gender.Male ||
        middleNameGender == partyConstants.gender.Male && input.data.personGender == partyConstants.gender.Female) {
        ambientProperties.services.confirmationDialog.showNotification('Просьба проверить корректность указания пола контрагента.', 'OK', '', 1);
    }
};
