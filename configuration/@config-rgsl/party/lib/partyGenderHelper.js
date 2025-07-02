const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = {

    /**
     * @desc get gender from middle name
     * @param {object} middleName middle name
     * @return {object} one of gender option or null if cant determine gender
     */
    getGenderFromMiddleName: function (middleName) {

        const maleEndings = ['ич'];
        const femaleEndings = ['а'];

        if (middleName) {

            middleName = middleName.toLowerCase();

            for (const suffix of maleEndings) {
                if (middleName.endsWith(suffix)) {
                    return partyConstants.gender.Male;
                }
            }

            for (const suffix of femaleEndings) {
                if (middleName.endsWith(suffix)) {
                    return partyConstants.gender.Female;
                }
            }

            return "Unknown";
        }

    }
};
