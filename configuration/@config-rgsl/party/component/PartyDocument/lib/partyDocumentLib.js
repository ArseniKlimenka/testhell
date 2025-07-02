const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const configValidationByRole = require('@config-rgsl/party/lib/partyValidationByRoleConstant');

module.exports = {

    checkPassportAge: function ({ issueDate, dateOfBirth, validationDate, skipForMigratedByAPI, skipForBoxRoles }) {

        if (!skipForMigratedByAPI) {

            skipForMigratedByAPI = false;
        }

        if (!issueDate && !skipForBoxRoles || !dateOfBirth || !validationDate) {

            return {};
        }

        const differenceYears = !skipForBoxRoles ? DateTimeUtils.getYearDifference(dateOfBirth, issueDate) : 0;
        const differenceYearsValidation = DateTimeUtils.getYearDifference(dateOfBirth, validationDate);
        const substractYearsCurrentDate20 = DateTimeUtils.substractYears(validationDate, 20);
        const substractDaysNow20 = DateTimeUtils.substractDays(substractYearsCurrentDate20, 90);
        const substractYearsCurrentDate45 = DateTimeUtils.substractYears(validationDate, 45);
        const substractDaysNow45 = DateTimeUtils.substractDays(substractYearsCurrentDate45, 90);

        const invalidAgePassport14 = ((!skipForBoxRoles ? differenceYears < 14 : differenceYearsValidation < 14) && !skipForMigratedByAPI);
        const invalidAgePassport20 = (substractDaysNow20 > dateOfBirth && differenceYears >= 14 && differenceYears < 20 && !skipForMigratedByAPI);
        const invalidAgePassport45 = (substractDaysNow45 > dateOfBirth && differenceYears >= 20 && differenceYears < 45 && !skipForMigratedByAPI);

        return { invalidAgePassport14, invalidAgePassport20, invalidAgePassport45 };
    },

    /**
     * @desc Validation of party document
     * @param {object} input party document from component
     * @param {object} self this context from component
     * @return {array} validationErrors
     */
    documentValidation: function (input, self) {

        const validationErrors = [];
        const body = getValue(self, 'businessContext.rootData') || self.view.getContext().Body;
        const dataPath = getValue(self, 'businessContext.dataPath');

        const docTypeCode = getValue(input, 'docType.docTypeCode');
        const dateOfBirth = getValue(body, 'partyPersonData.dateOfBirth');
        const docSeries = input.docSeries;
        const docNumber = input.docNumber;
        const issueDate = input.issueDate;
        const expireDate = input.expireDate;
        const issuerName = input.issuerName;
        const issuerCode = input.issuerCode;
        const otherDocTypeDesc = input.otherDocTypeDesc;
        const skipForMigratedByAPI = partyValidationHelper.isSkipForMigratedByAPI(body, self);
        const currentDate = DateTimeUtils.dateNow();
        const validationDate = getValue(body, 'partyGeneralData.documentsValidationDate') || currentDate;

        const applicationRoles = getValue(self, 'applicationContext.originatingUser.applicationRoles', []);
        const skipPassport = (applicationRoles.some(x => x == 'SkipPassport') || (typeof window != "undefined"));

        const partyRole = body?.partyRoleOfPerson?.partyRole || body?.data?.partyRoleOfPerson?.partyRole;
        const skipForBoxRoles = partyRole === configValidationByRole.PolicyHolderBoxNaturalPerson.code || partyRole === configValidationByRole.InsuredBoxNaturalPerson.code;

        if (!docTypeCode) {
            validationErrors.push({
                errorCode: "docTypeRequired",
                errorDataPath: dataPath + '/docType'
            });
        }

        if (["residence",
            "migrationCard",
            "viza",
            "temporaryResidencePermit",
            "refugeeID",
            "otherDocument",
            "foreignCitPassport",
            "incurredIdentityCard",
            "foreignBirthCertificate",
            "registrationDocuments",
            "registrationCertificate"].includes(docTypeCode)) {

            if (!issueDate) {
                validationErrors.push({
                    errorCode: "issueDateRequired",
                    errorDataPath: dataPath + '/issueDate'
                });
            }

            if (docSeries && docSeries.length > 10) {
                validationErrors.push({
                    errorCode: "docSeriesFormatGeneral",
                    errorDataPath: dataPath + '/docSeries'
                });
            }

            if (!docNumber || docNumber.length > 25) {
                validationErrors.push({
                    errorCode: "docNumberFormatGeneral",
                    errorDataPath: dataPath + '/docNumber'
                });
            }

        }

        if (docTypeCode == "refugeeCertificate") {

            if (!issueDate) {
                validationErrors.push({
                    errorCode: "issueDateRequired",
                    errorDataPath: dataPath + '/issueDate'
                });
            }

            if (!docSeries || !docSeries.match(/^[А-ЯЁ]{2}-\d{3}$/)) {
                validationErrors.push({
                    errorCode: "docSeriesFormatRefugeeCertificate",
                    errorDataPath: dataPath + '/docSeries'
                });
            }

            if (!docNumber || !docNumber.match(/^\d{7}$/)) {
                validationErrors.push({
                    errorCode: "docNumberFormatRefugeeCertificate",
                    errorDataPath: dataPath + '/docNumber'
                });
            }

        }

        if (docTypeCode == "passport" && !skipForMigratedByAPI) {

            if (!issueDate && !skipForBoxRoles) {
                validationErrors.push({
                    errorCode: "issueDateRequired",
                    errorDataPath: dataPath + '/issueDate'
                });
            }

            if (!docSeries || !docSeries.match(/^\d{4}$/)) {
                validationErrors.push({
                    errorCode: "docSeriesFormatPassport",
                    errorDataPath: dataPath + '/docSeries'
                });
            }

            if (!docNumber || !docNumber.match(/^\d{6}$/) && !skipForMigratedByAPI) {
                validationErrors.push({
                    errorCode: "docNumberFormatPassport",
                    errorDataPath: dataPath + '/docNumber'
                });
            }

            if (!issuerName && !skipForBoxRoles) {
                validationErrors.push({
                    errorCode: "issuerNameRequired",
                    errorDataPath: dataPath + '/issuerName'
                });
            }

            if (issuerName && !issuerName.match(/^[?!,.()"№а-яА-ЯёЁ0-9\s-]+$/)) {
                validationErrors.push({
                    errorCode: "issuerNameShouldBeInCyrillic",
                    errorDataPath: dataPath + '/issuerName'
                });
            }

            if (!issuerCode && !skipForBoxRoles || issuerCode && !issuerCode.match(/^\d{3}-\d{3}$/)) {
                validationErrors.push({
                    errorCode: "issuerCodeFormatPassport",
                    errorDataPath: dataPath + '/issuerCode'
                });
            }

            if (!expireDate && !skipPassport) {

                const checkPassportAgeResult = this.checkPassportAge({ issueDate, dateOfBirth, skipForMigratedByAPI, validationDate, skipForBoxRoles });
                if (checkPassportAgeResult.invalidAgePassport14) {
                    validationErrors.push({
                        errorCode: "invalidAgePassport14",
                        errorDataPath: dataPath + '/issueDate'
                    });
                }

                if (checkPassportAgeResult.invalidAgePassport20) {
                    validationErrors.push({
                        errorCode: "invalidAgePassport20",
                        errorDataPath: dataPath + '/issueDate'
                    });
                }

                if (checkPassportAgeResult.invalidAgePassport45) {
                    validationErrors.push({
                        errorCode: "invalidAgePassport45",
                        errorDataPath: dataPath + '/issueDate'
                    });
                }
            }
        }

        if (docTypeCode == "militaryID") {

            if (!issueDate) {
                validationErrors.push({
                    errorCode: "issueDateRequired",
                    errorDataPath: dataPath + '/issueDate'
                });
            }

            if (!docSeries || !docSeries.match(/^[А-ЯЁ]{2}$/)) {
                validationErrors.push({
                    errorCode: "docSeriesFormatMilitaryID",
                    errorDataPath: dataPath + '/docSeries'
                });
            }

            if (!docNumber || !docNumber.match(/^\d{7}$/)) {
                validationErrors.push({
                    errorCode: "docNumberFormatMilitaryID",
                    errorDataPath: dataPath + '/docNumber'
                });
            }

        }

        if (docTypeCode == "foreignTravelPassport") {

            if (!issueDate) {
                validationErrors.push({
                    errorCode: "issueDateRequired",
                    errorDataPath: dataPath + '/issueDate'
                });
            }

            if (!docSeries || !docSeries.match(/^\d{2}$/)) {
                validationErrors.push({
                    errorCode: "docSeriesFormatForeignTravelPassport",
                    errorDataPath: dataPath + '/docSeries'
                });
            }

            if (!docNumber || !docNumber.match(/^\d{7}$/)) {
                validationErrors.push({
                    errorCode: "docNumberFormatForeignTravelPassport",
                    errorDataPath: dataPath + '/docNumber'
                });
            }

            if (!issuerName) {
                validationErrors.push({
                    errorCode: "issuerNameRequired",
                    errorDataPath: dataPath + '/issuerName'
                });
            }

        }

        if (docTypeCode == "driverID") {

            if (!issueDate) {
                validationErrors.push({
                    errorCode: "issueDateRequired",
                    errorDataPath: dataPath + '/issueDate'
                });
            }

            if (!docSeries || !docSeries.match(/^\d{4}$/)) {
                validationErrors.push({
                    errorCode: "docSeriesFormatDriverID",
                    errorDataPath: dataPath + '/docSeries'
                });
            }

            if (!docNumber || !docNumber.match(/^\d{7}$/)) {
                validationErrors.push({
                    errorCode: "docNumberFormatDriverID",
                    errorDataPath: dataPath + '/docNumber'
                });
            }

        }

        if (docTypeCode == "birthCertificate" && !skipForMigratedByAPI) {

            if (!issueDate && !skipForBoxRoles) {
                validationErrors.push({
                    errorCode: "issueDateRequired",
                    errorDataPath: dataPath + '/issueDate'
                });
            }

            if (!docSeries || !docSeries.match(/^[IVXLC]{1,4}-[А-ЯЁ]{2}$/)) {
                validationErrors.push({
                    errorCode: "docSeriesFormatBirthCertificate",
                    errorDataPath: dataPath + '/docSeries'
                });
            }

            if (!docNumber || !docNumber.match(/^\d{6}$/) && !skipForMigratedByAPI) {
                validationErrors.push({
                    errorCode: "docNumberFormatBirthCertificate",
                    errorDataPath: dataPath + '/docNumber'
                });
            }

        }

        if (docTypeCode == "otherDocument") {

            if (!issueDate) {
                validationErrors.push({
                    errorCode: "issueDateRequired",
                    errorDataPath: dataPath + '/issueDate'
                });
            }

            if (!otherDocTypeDesc) {
                validationErrors.push({
                    errorCode: "otherDocTypeDescIsRequired",
                    errorDataPath: dataPath + '/otherDocTypeDesc'
                });
            }

        }

        if (issueDate && DateTimeUtils.isAfter(issueDate) && !skipPassport) {
            validationErrors.push({
                errorCode: "issueDateInFuture",
                errorDataPath: dataPath + '/issueDate'
            });
        }

        if (issueDate && expireDate && issueDate >= expireDate) {
            validationErrors.push({
                errorCode: "issueDateMoreExpireDate",
                errorDataPath: dataPath + '/issueDate'
            });
            validationErrors.push({
                errorCode: "expireDateLessIssueDate",
                errorDataPath: dataPath + '/expireDate'
            });
        }

        if (issueDate && dateOfBirth && issueDate < dateOfBirth) {
            validationErrors.push({
                errorCode: "issueDateMoreDateOfBirth",
                errorDataPath: dataPath + '/issueDate'
            });
        }

        return validationErrors;

    },

    /**
     * @desc Formatting issuer code
     * @param {string} issuerCode issuer code
     * @return {string} formatted issuer code
     */
    formatIssuerCode: function (issuerCode) {

        if (!issuerCode) { return ''; }

        const issuerCodeLength = issuerCode.length;
        const fourthSymbol = issuerCode.substring(3, 4);

        let formattedIssuerCode = issuerCode;

        if (issuerCodeLength == 6 && fourthSymbol !== '-') {
            const firstPart = issuerCode.substring(0, 3);
            const lastPart = issuerCode.substring(3, issuerCodeLength);
            formattedIssuerCode = firstPart + '-' + lastPart;
        }

        return formattedIssuerCode;

    }

};
