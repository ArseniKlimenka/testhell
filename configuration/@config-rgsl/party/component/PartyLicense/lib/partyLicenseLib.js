const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    /**
     * @desc Validation of party phone
     * @param {object} input party phone from component
     * @param {object} self this context from component
     * @return {array} validationErrors
     */
    licenseValidation: function (input, self) {

        const validationErrors = [];
        const licenseNumber = getValue(input, 'licenseNumber');
        const licensingAuthority = getValue(input, 'licensingAuthority');
        const dateOfIssueOfLicense = getValue(input, 'dateOfIssueOfLicense');
        const dataPath = getValue(self, 'businessContext.dataPath');

        if (!licenseNumber && (licensingAuthority || dateOfIssueOfLicense)) {
            validationErrors.push({
                errorCode: "licenseNumberIsRequired",
                errorDataPath: dataPath + '/licenseNumber',
            });
        }

        if (!licensingAuthority && (licenseNumber || dateOfIssueOfLicense)) {
            validationErrors.push({
                errorCode: "licensingAuthorityIsRequired",
                errorDataPath: dataPath + '/licensingAuthority',
            });
        }

        if (!dateOfIssueOfLicense && (licensingAuthority || licenseNumber)) {
            validationErrors.push({
                errorCode: "dateOfIssueOfLicenseIsRequired",
                errorDataPath: dataPath + '/dateOfIssueOfLicense',
            });
        }

        return validationErrors;
    }
};
