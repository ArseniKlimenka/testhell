'use strict';

const { mapChangeSubtypeByChangeClass } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');
const { nonFinChangeTypesForChangeClass, changeTypes, didPaymentClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { documentActors, applicantType } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = function changeClassOnChange(input, ambientProperties) {

    const currentWorkUnitActor = ambientProperties.currentWorkUnitActor;
    const isAgent = currentWorkUnitActor == documentActors.Agent;

    delete input.context.Body.signatureForm;
    const bankAccountsArray = input.context.Body.bankAccountsArray;
    input.context.Body.bankAccount = bankAccountsArray ? input.context.Body.bankAccountsArray[0] : {};

    const changeSubtype = input.context.Body.changeSubtype;
    const changeClass = input.context.Body.changeClass;
    input.context.Body.changeSubtype = mapChangeSubtypeByChangeClass(changeSubtype, changeClass);

    const changeTypeReset = !checkAvailabilitySome(nonFinChangeTypesForChangeClass, changeClass);
    if (changeTypeReset) {
        input.context.Body.changeType = [];
    }

    if (changeClass.includes(changeTypes.investmentParametersEdit)) {

        const currentDate = DateTimeUtils.newDateAsString(DateTimeUtils.DateFormats.ECMASCRIPT);
        input.context.Body.changeClass = changeClass.filter(item => item == changeTypes.investmentParametersEdit);

        input.context.Body.issueDate = currentDate;
        input.context.Body.receivedDate = currentDate;
        input.context.Body.registrationDate = currentDate;
        input.context.Body.receiveMethod = amendmentConstants.receiveMethod.partner;

        if (isAgent) {
            input.context.Body.bankAccount = {};
        }
    }

    const isDidPaymentClassTypes = checkAvailabilitySome(didPaymentClassTypes, changeClass);
    if (isDidPaymentClassTypes) {
        ambientProperties.services.confirmationDialog.showConfirmation('Обращаем внимание, что при осуществлении выплаты ДИД страховщиком удерживаются расходы на администрирование договора, а также НДФЛ (при наличии),  определяемый по правилам, действующим на момент осуществления выплаты и подлежащий перечислению в ФНС России.', 'OK', 'OK', 2);
    }

    const currentApplicantType = input.context.Body.applicantType;
    if (isDidPaymentClassTypes) {
        if (![applicantType.beneficiary, applicantType.beneficiaryRepresentative].includes(currentApplicantType)) {
            input.context.Body.applicantType = undefined;
        }
    }
    else {
        if ([applicantType.beneficiary, applicantType.beneficiaryRepresentative].includes(currentApplicantType)) {
            input.context.Body.applicantType = applicantType.policyHolder;
        }
    }

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

};
