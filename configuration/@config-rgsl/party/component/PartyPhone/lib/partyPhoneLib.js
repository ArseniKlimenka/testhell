const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    /**
     * @desc Validation of party phone
     * @param {object} input party phone from component
     * @param {object} self this context from component
     * @param {object} isRequiredPhone set the phone is required
     * @return {array} validationErrors
     */
    phoneValidation: function (input, self) {

        const validationErrors = [];
        const dataPath = getValue(self, 'businessContext.dataPath');

        const phoneTypeCode = getValue(input, 'phoneType.phoneTypeCode');
        const countryPhoneCode = getValue(input, 'countryCode.countryPhoneCode');
        const fullNumber = getValue(input, 'fullNumber') || '';
        const clearFullNumber = fullNumber.replace(/\D/g, '');

        if (!phoneTypeCode) {
            validationErrors.push({
                errorCode: "phoneTypeIsRequired",
                errorDataPath: dataPath + '/phoneType'
            });
        }

        if (!countryPhoneCode) {
            validationErrors.push({
                errorCode: "countryCodeIsRequired",
                errorDataPath: dataPath + '/countryCode'
            });
        }


        if (countryPhoneCode == '+7') {
            if (clearFullNumber.length != 10) {
                validationErrors.push({
                    errorCode: "fullNumber10Digits",
                    errorDataPath: dataPath + '/fullNumber'
                });
            }
        }
        else {
            if (clearFullNumber.length < 1 || clearFullNumber.length > 15) {
                validationErrors.push({
                    errorCode: "fullNumber15Digits",
                    errorDataPath: dataPath + '/fullNumber'
                });
            }
        }

        return validationErrors;

    },

    /**
     * @desc Formatting of party phone
     * @param {object} input party phone from component
     * @param {object} self this context from component
     * @return {string} formatted phone
     */
    phoneFormatting: function (input, self) {

        const fullNumber = input.fullNumber || '';
        const countryPhoneCode = getValue(input, 'countryCode.countryPhoneCode') || '';

        const clearFullNumber = fullNumber.replace(/\D/g, '');
        const nubmerThirdPart = clearFullNumber.substring(clearFullNumber.length - 2, clearFullNumber.length) || '';
        const nubmerSecondPart = clearFullNumber.substring(clearFullNumber.length - 4, clearFullNumber.length - 2) || '';
        const nubmerFirstPart = clearFullNumber.substring(clearFullNumber.length - 7, clearFullNumber.length - 4) || '';
        const cityCode = clearFullNumber.substring(0, clearFullNumber.length - 7) || '';

        return countryPhoneCode + ' (' + cityCode + ')' + ' ' + nubmerFirstPart + ' ' + nubmerSecondPart + ' ' + nubmerThirdPart;

    }

};
