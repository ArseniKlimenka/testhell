const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { countryRussia, addressType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = {

    /**
     * @desc Validation of party address
     * @param {object} input party address from component
     * @param {object} self this context from component
     * @return {array} validationErrors
     */
    addressValidation: function (input, self) {

        const validationErrors = [];
        const dataPath = getValue(self, 'businessContext.dataPath');

        const fullAddressValue = getValue(input, 'fullAddress.value');
        const addressTypeCode = getValue(input, 'addressType.addressTypeCode');
        const isForeignAddress = getValue(input, 'isForeignAddress');
        const isManualAddress = getValue(input, 'isManualAddress');
        const manualCountryName = getValue(input, 'manualCountry.countryShortName');

        if (!fullAddressValue) {
            const errorDataPath = (isForeignAddress || isManualAddress) ? dataPath + '/fullAddress/value' : dataPath + '/fullAddress';
            validationErrors.push({
                errorCode: "fullAddressRequired",
                errorDataPath: errorDataPath
            });
        }

        if (!addressTypeCode) {
            validationErrors.push({
                errorCode: "addressTypeRequired",
                errorDataPath: dataPath + '/addressType'
            });
        }

        if ((isForeignAddress || isManualAddress) && addressTypeCode !== addressType.postal.code && !manualCountryName) {
            const errorDataPath = dataPath + '/manualCountry';
            validationErrors.push({
                errorCode: "manualCountryRequired",
                errorDataPath: errorDataPath
            });
        }

        return validationErrors;

    }

};
