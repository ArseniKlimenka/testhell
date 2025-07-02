const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const { getGenderFromMiddleName } = require('@config-rgsl/party/lib/partyGenderHelper');


module.exports = function middleNameChanged(input) {

    const middleName = input.data.middleName;
    const middleNameGender = getGenderFromMiddleName(middleName);

    if (middleNameGender == partyConstants.gender.Female) {
        input.data.personGender = partyConstants.gender.Female;
    }
    else if (middleNameGender == partyConstants.gender.Male) {
        input.data.personGender = partyConstants.gender.Male;
    }

    this.view.reevaluateRules();
    this.view.validate();
};
