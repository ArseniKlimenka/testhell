const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const { partyType, viewType } = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = {

    /**
     * @desc Validation of party document
     * @param {object} input party document from component
     * @param {object} self this context from component
     * @param {object} configurationCodeName configurationCodeName
     * @return {array} validationErrors
     */
    partyOGRNValidation: function (input, self, configurationCodeName) {

        const validationErrors = [];
        const body = getValue(self, 'businessContext.rootData') || self.view.getContext().Body;
        const dataPath = getValue(self, 'businessContext.dataPath');

        const OGRN = getValue(input, 'OGRNOGRNIP');
        const dateOfStateRegistration = getValue(input, 'dateOfStateRegistration');
        const dateOfRecordingTermination = getValue(input, 'dateOfRecordingTermination');
        const isManualRegistrationAgency = getValue(input, 'isManualRegistrationAgency', false);
        const registrationAgencyCode = getValue(input, 'registrationAgencyCode');
        const registrationAgencyNameManual = getValue(input, 'registrationAgencyNameManual');
        const skipForMigratedByAPI = partyValidationHelper.isSkipForMigratedByAPI(body, self);
        const nonResident = partyValidationHelper.isNonResident(body);

        let typeOfParty;
        if (configurationCodeName == viewType.NaturalPerson)
        { typeOfParty = partyType.NaturalPerson; }
        else if (configurationCodeName == viewType.LegalEntity)
        { typeOfParty = partyType.LegalEntity; }
        else
        { typeOfParty = configurationCodeName; }

        if (nonResident) {
            return;
        }

        if (!OGRN) {
            validationErrors.push({
                errorCode: "OGRNIsRequired",
                errorDataPath: `${dataPath}/OGRNOGRNIP`,
            });
        }

        if (!dateOfStateRegistration && !skipForMigratedByAPI) {
            validationErrors.push({
                errorCode: "dateOfStateRegistrationIsRequired",
                errorDataPath: `${dataPath}/dateOfStateRegistration`,
            });
        }

        if (typeOfParty == partyType.LegalEntity && !skipForMigratedByAPI) {
            if (isManualRegistrationAgency) {
                if (!registrationAgencyNameManual) {
                    validationErrors.push({
                        errorCode: "registrationAgencyNameManualIsRequired",
                        errorDataPath: `${dataPath}/registrationAgencyNameManual`,
                    });
                }
            } else {
                if (!registrationAgencyCode) {
                    validationErrors.push({
                        errorCode: "registrationAgencyCodeIsRequired",
                        errorDataPath: `${dataPath}/registrationAgencyCode`,
                    });
                }
            }
        }

        if (OGRN && partyValidationHelper.ogrnOgrnipValidation(OGRN, typeOfParty) !== true) {
            validationErrors.push({
                errorCode: "isErrorOGRN",
                errorDataPath: `${dataPath}/OGRNOGRNIP`,
            });
        }

        if (dateOfStateRegistration && partyValidationHelper.checkComingDate(dateOfStateRegistration)) {
            validationErrors.push({
                errorCode: "comingDate",
                errorDataPath: `${dataPath}/dateOfStateRegistration`,
            });
        }

        if (dateOfRecordingTermination && partyValidationHelper.checkComingDate(dateOfRecordingTermination)) {
            validationErrors.push({
                errorCode: "comingDate",
                errorDataPath: `${dataPath}/dateOfRecordingTermination`,
            });
        }

        if (dateOfStateRegistration && dateOfRecordingTermination && partyValidationHelper.checkConsistencyDate(dateOfStateRegistration, dateOfRecordingTermination)) {
            validationErrors.push({
                errorCode: "dateStartAftreStop",
                errorDataPath: `${dataPath}/dateOfRecordingTermination`,
            });
        }

        return validationErrors;
    }

};
