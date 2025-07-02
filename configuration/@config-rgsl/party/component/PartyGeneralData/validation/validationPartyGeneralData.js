const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const partyValidationHelper = require('@config-rgsl/party/lib/partyValidationHelper');
const { partyType, viewType } = require('@config-rgsl/party/lib/partyConstantsImpl');

/**
* @errorCode {errorCode} isEmptyRegistrationCountry
* @errorCode {errorCode} isEmptySegment
* @errorCode {errorCode} INNWarningForNaturalPerson
* @errorCode {errorCode} INNError
* @errorCode {errorCode} INNErrorEmpty
* @errorCode {errorCode} isEmptyBeneficiaryOwner
* @errorCode {errorCode} isEmptyRelationGoal
* @errorCode {errorCode} isEmptySuggestedRelationType
* @errorCode {errorCode} isEmptyGoalOfFinancialActivity
* @errorCode {errorCode} isEmptyFinancialState
* @errorCode {errorCode} isEmptyBusinessReputation
* @errorCode {errorCode} isEmptyIncomeSource
* @errorCode {errorCode} isEmptyTIN
* @errorCode {errorCode} illegalTINSymbols
* @errorCode {errorCode} illegalNonResidentCode
* @errorCode {errorCode} anotherNaturalPersonIsRequired
* @errorCode {errorCode} taxResidenceIsRequired
* @errorCode {errorCode} duplicatesExist
* @errorCode {errorCode} incorrectINNKIOForNonResident
* @errorCode {errorCode} isEmptyDescriptionForGoalOfFinancialActivity
* @errorCode {errorCode} isEmptyDescriptionForIncomeSource
* @errorCode {errorCode} wrongFraction
* @errorCode {errorCode} isEmptyBeneficiaryOwnerQuestionnaire2
* @errorCode {errorCode} isEmptyTINAbsenceReason
*/

module.exports = function validationPartyGeneralData(input, ambientProperties) {

    const validationErrors = [];

    const actor = this.applicationContext.actor;
    if (actor == 'SkipValidationIS') { return []; }

    const businessContext = this.businessContext;
    const body = this.businessContext.rootData;
    const isNonResident = input?.isNonResident;
    const registrationCountry = getValue(input, 'registrationCountry.countryShortName');
    const taxResidence = getValue(input, 'taxResidence');
    const tin = getValue(input, 'TIN');
    const noTIN = getValue(input, 'noTIN');
    const TINAbsenceReason = input.TINAbsenceReason;
    const nonResidentCode = getValue(input, 'nonResidentCode');
    const inn = getValue(input, 'INNKIO');
    const beneficiaryOwnerCode = getValue(input, 'beneficiaryOwner.beneficiaryOwnerCode');
    const duplicatesCount = getValue(input, 'duplicatesCount');

    const relationGoal = getValue(input, 'relationGoal');
    const suggestedRelationType = getValue(input, 'suggestedRelationType');
    const goalOfFinancialActivity = getValue(input, 'goalOfFinancialActivity');
    const descriptionForGoalOfFinancialActivity = getValue(input, 'descriptionForGoalOfFinancialActivity');
    const descriptionForIncomeSource = getValue(input, 'descriptionForIncomeSource');
    const financialState = getValue(input, 'financialState');
    const businessReputation = getValue(input, 'businessReputation');
    const incomeSource = getValue(input, 'incomeSource');
    const skipForMigratedByAPI = partyValidationHelper.isSkipForMigratedByAPI(body, this);
    const anotherNaturalPersons = getValue(input, 'anotherNaturalPersons', []);
    const fraction = anotherNaturalPersons.reduce((acc, val) => acc + val.fraction, 0);
    const dataPath = this.businessContext.dataPath;

    let typeOfParty;
    if (businessContext.configurationCodeName == viewType.NaturalPerson)
    { typeOfParty = partyType.NaturalPerson; }
    else if (businessContext.configurationCodeName == viewType.LegalEntity)
    { typeOfParty = partyType.LegalEntity; }
    else
    { typeOfParty = businessContext.configurationCodeName; }

    if (!taxResidence && !skipForMigratedByAPI) {
        validationErrors.push({
            errorCode: "taxResidenceIsRequired",
            errorDataPath: '/Body/partyGeneralData/taxResidence',
        });
    }

    if (isNonResident && !registrationCountry && !skipForMigratedByAPI) {
        validationErrors.push({
            errorCode: "isEmptyRegistrationCountry",
            errorDataPath: '/Body/partyGeneralData/registrationCountry',
        });
    }

    if (isNonResident && !tin && !noTIN) {
        validationErrors.push({
            errorCode: "isEmptyTIN",
            errorDataPath: '/Body/partyGeneralData/TIN',
        });
    }

    if (isNonResident && noTIN && !TINAbsenceReason) {
        validationErrors.push({
            errorCode: "isEmptyTINAbsenceReason",
            errorDataPath: '/Body/partyGeneralData/TINAbsenceReason',
        });
    }

    if (isNonResident && tin && !noTIN) {
        const illegalTINSymbolsRegex = new RegExp('^[a-zA-Z0-9]+$');
        if (!tin.match(illegalTINSymbolsRegex)) {
            validationErrors.push({
                errorCode: "illegalTINSymbols",
                errorDataPath: '/Body/partyGeneralData/TIN',
            });
        }
    }

    if (isNonResident && noTIN && nonResidentCode && !/^КН\d\d\d\d$/.test(nonResidentCode)) {
        validationErrors.push({
            errorCode: "illegalNonResidentCode",
            errorDataPath: '/Body/partyGeneralData/nonResidentCode',
        });
    }

    if (isNonResident && inn) {
        const onlyNumbersRegex = new RegExp('^[0-9]+$');
        if (!inn.match(onlyNumbersRegex)) {
            validationErrors.push({
                errorCode: "incorrectINNKIOForNonResident",
                errorDataPath: '/Body/partyGeneralData/INNKIO',
            });
        }
    }

    if (!isNonResident && inn) {
        if (typeOfParty === partyType.NaturalPerson && partyValidationHelper.innValidation(inn, typeOfParty) !== true) {
            validationErrors.push({
                errorCode: "INNWarningForNaturalPerson",
                errorDataPath: `${dataPath}/INNKIO`
            });
        } else if (typeOfParty !== partyType.NaturalPerson && partyValidationHelper.innValidation(inn, typeOfParty) !== true) {
            validationErrors.push({
                errorCode: "INNError",
                errorDataPath: `${dataPath}/INNKIO`
            });
        }
    }

    if (typeOfParty === partyType.NaturalPerson && !beneficiaryOwnerCode) {
        validationErrors.push({
            errorCode: "isEmptyBeneficiaryOwner",
            errorDataPath: '/partyGeneralData/beneficiaryOwner',
        });
    }

    if (typeOfParty === partyType.LegalEntity && beneficiaryOwnerCode == 2 && anotherNaturalPersons.length == 0) {
        validationErrors.push({
            errorCode: "anotherNaturalPersonIsRequired"
        });
    }

    if (!relationGoal) {
        validationErrors.push({
            errorCode: "isEmptyRelationGoal",
            errorDataPath: '/partyGeneralData/relationGoal',
        });
    }

    if (!suggestedRelationType) {
        validationErrors.push({
            errorCode: "isEmptySuggestedRelationType",
            errorDataPath: '/partyGeneralData/suggestedRelationType',
        });
    }

    if (!goalOfFinancialActivity) {
        validationErrors.push({
            errorCode: "isEmptyGoalOfFinancialActivity",
            errorDataPath: '/partyGeneralData/goalOfFinancialActivity',
        });
    }

    if (goalOfFinancialActivity && goalOfFinancialActivity?.goalOfFinancialActivityDesc === "Иная" && !descriptionForGoalOfFinancialActivity) {
        validationErrors.push({
            errorCode: "isEmptyDescriptionForGoalOfFinancialActivity",
            errorDataPath: '/partyGeneralData/descriptionForGoalOfFinancialActivity',
        });
    }

    if (!financialState) {
        validationErrors.push({
            errorCode: "isEmptyFinancialState",
            errorDataPath: '/partyGeneralData/financialState',
        });
    }

    if (!businessReputation) {
        validationErrors.push({
            errorCode: "isEmptyBusinessReputation",
            errorDataPath: '/partyGeneralData/businessReputation',
        });
    }

    if (!incomeSource) {
        validationErrors.push({
            errorCode: "isEmptyIncomeSource",
            errorDataPath: '/partyGeneralData/incomeSource',
        });
    }

    if (incomeSource && incomeSource.incomeSourceDesc === "Иное" && !descriptionForIncomeSource) {
        validationErrors.push({
            errorCode: "isEmptyDescriptionForIncomeSource",
            errorDataPath: '/partyGeneralData/descriptionForIncomeSource',
        });
    }

    if (duplicatesCount > 0) {
        validationErrors.push({
            errorCode: "duplicatesExist",
            errorDataPath: '/partyDuplicates/duplicatesCount'
        });
    }

    if (!inn && typeOfParty !== partyType.NaturalPerson) {
        validationErrors.push({
            errorCode: "INNErrorEmpty",
            errorDataPath: `${dataPath}/INNKIO`
        });
    }

    if (fraction > 100) {
        validationErrors.push({
            errorCode: "wrongFraction"
        });
    }

    anotherNaturalPersons.forEach(x => {

        const partyFullName = getValue(x, 'anotherNaturalPerson.partyFullName');
        const answer1 = getValue(x, 'anotherNaturalPerson.partyBody.beneficiaryOwnerQuestionnaire.questionnaire1.answer');
        const answer2 = getValue(x, 'anotherNaturalPerson.partyBody.beneficiaryOwnerQuestionnaire.questionnaire2.answer');
        const answer3 = getValue(x, 'anotherNaturalPerson.partyBody.beneficiaryOwnerQuestionnaire.questionnaire3.answer');
        if (partyFullName && (answer1 == undefined || answer2 == undefined || answer3 == undefined)) {
            validationErrors.push({
                errorCode: 'isEmptyBeneficiaryOwnerQuestionnaire2',
                reference: {
                    entity: {
                        partyFullName: x.anotherNaturalPerson.partyFullName
                    }
                }
            });
        }
    });

    return validationErrors;

};
