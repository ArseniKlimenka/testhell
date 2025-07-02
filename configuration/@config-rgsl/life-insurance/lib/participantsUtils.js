const { checkPersonBirthday } = require('@config-rgsl/party/lib/partyValidationHelper');

module.exports = {

    allDataFromBeneficiaty: function (data) {
        let result = false;
        const { partyFullName, dateOfBirth, share, relationType } = data;
        if (!partyFullName || !dateOfBirth || checkPersonBirthday(dateOfBirth) || !share || !relationType)
        { result = true; }
        return result;
    },

};
