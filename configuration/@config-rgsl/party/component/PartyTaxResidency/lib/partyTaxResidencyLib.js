const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    /**
     * @desc Validation of party tax residencies
     * @param {object} input party tax residencies from component
     * @param {object} self this context from component
     * @return {array} validationErrors
     */
    partyTaxResidencyValidation: function (input, self) {

        const validationErrors = [];
        const dataPath = getValue(self, 'businessContext.dataPath');

        const residenceCountry = input.residenceCountry;
        const docTypeCode = getValue(input, 'docType.docTypeCode');
        const startDate = input.startDate;
        const endDate = input.endDate;
        const otherDocTypeDesc = input.otherDocTypeDesc;

        if (!residenceCountry) {
            validationErrors.push({
                errorCode: "residenceCountryRequired",
                errorDataPath: dataPath + '/residenceCountry'
            });
        }

        if (!docTypeCode) {
            validationErrors.push({
                errorCode: "docTypeRequired",
                errorDataPath: dataPath + '/docType'
            });
        }

        if (docTypeCode == "otherDocument" && !otherDocTypeDesc) {
            validationErrors.push({
                errorCode: "otherDocTypeDescRequired",
                errorDataPath: dataPath + '/otherDocTypeDesc'
            });
        }

        if (!startDate) {
            validationErrors.push({
                errorCode: "startDateRequired",
                errorDataPath: dataPath + '/startDate'
            });
        }

        if (!endDate) {
            validationErrors.push({
                errorCode: "endDateRequired",
                errorDataPath: dataPath + '/endDate'
            });
        }

        return validationErrors;

    }

};
