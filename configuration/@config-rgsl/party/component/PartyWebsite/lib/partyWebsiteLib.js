const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    /**
     * @desc Validation of party phone
     * @param {object} input party phone from component
     * @param {object} self this context from component
     * @return {array} validationErrors
     */
    websiteValidation: function (input, self) {

        const validationErrors = [];
        const hasWebsite = getValue(input, 'hasWebsite');
        const websiteAddress = getValue(input, 'websiteAddress');
        const dataPath = getValue(self, 'businessContext.dataPath');

        if (hasWebsite && !websiteAddress) {
            validationErrors.push({
                errorCode: "websiteAddressIsRequired",
                errorDataPath: dataPath + '/websiteAddress',
            });
        }

        return validationErrors;
    }
};
