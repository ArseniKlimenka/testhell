'use strict';

const {
    getCoolOffPeriodEndSyncWithCalendar,
    checkDuplicateCancelledRequests,
    fillInAmendmentReason,
    getBankAccounts,
    getRecipientBankAccounts,
    fillInBankAccount,
    fillInRecipientBankAccount,
    getPolicyCancellationAmendments,
    showDuplicateCancelledMessage,
    blockAgentModification,
    blockAgentCancellation,
    getRelatedRequest
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');
const { documentStates, typeOfRequest, initiator } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { didPaymentClassTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const { checkAvailabilitySome } = require('@config-rgsl/infrastructure/lib/ArrayUtilsImpl');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function LifeInsuranceRequestBeforeSave(input, ambientProperties) {

    const body = input.context.Body;
    const technicalInformation = body.technicalInformation;
    const currentTypeOfRequest = body.typeOfRequest;
    const createdFromPolicy = technicalInformation?.createdFromPolicy;
    const contractNumber = body.contract?.number;
    const policyWasFound = technicalInformation.policyWasFound;
    await blockAgentModification(input, ambientProperties, this);
    await blockAgentCancellation(input, ambientProperties, this);

    if (!input.context.Number) {
        body.initiator = initiator.applicant;
    }

    const configurationName = body.contract?.configurationName;
    const productGroup = body.contract.productGroup;
    const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;
    if ((!configurationName || !currentTypeOfRequest) && !createdFromPolicy) {
        ambientProperties.services.confirmationDialog.showConfirmation('Необходимо найти договор и указать тип обращения', 'OK', 'OK', 2);
        return false;
    }

    const holderPartyCode = body.holder?.partyCode;
    const applicantPartyCode = body.applicant?.partyData?.partyCode;

    if (holderPartyCode && !applicantPartyCode) {
        body.applicant.partyData = {};
        body.applicant.partyData.partyCode = holderPartyCode;
    }

    try {
        this.view.startBlockingUI();
        await this.view.evaluate([
            '/applicant/**'
        ], false, true);
    } catch (error) {
        this.view.stopBlockingUI();
        throw error;
    }

    try {
        this.view.startBlockingUI();
        input.context.Body.coolOffPeriodEndSyncWithCalendar = await getCoolOffPeriodEndSyncWithCalendar(input, ambientProperties);
    } catch (error) {
        this.view.stopBlockingUI();
        throw error;
    }

    if (contractNumber && policyWasFound) {

        const checkPolicyInRequestStates = [documentStates.Draft, documentStates.OnReview];
        if (checkPolicyInRequestStates.includes(input.rootContext.State.Code)) {
            try {
                this.view.startBlockingUI();
                await this.view.evaluate([
                    '/technicalInformation[CheckPolicyStatus]',
                ], false, true);
            } catch (err) {
                throwResponseError(err);
            } finally {
                this.view.stopBlockingUI();
            }
        }

        const checkPolicyAmendmentsInRequestStates = [documentStates.Draft, documentStates.OnReview, documentStates.CreateAmendment];
        if (checkPolicyAmendmentsInRequestStates.includes(input.rootContext.State.Code)) {
            try {
                this.view.startBlockingUI();
                await this.view.evaluate([
                    '/technicalInformation[CheckPolicyAmendmentsStatus]',
                ], false, true);
            } catch (err) {
                throwResponseError(err);
            } finally {
                this.view.stopBlockingUI();
            }
        }
    }

    await checkDuplicateCancelledRequests(input, ambientProperties, this);
    await getBankAccounts(input, ambientProperties);

    if (!createdFromPolicy) {
        await fillInAmendmentReason(input, ambientProperties);
        await fillInBankAccount(input);
    }

    if (input.rootContext.State.Code == documentStates.Draft || input.rootContext.State.Code == documentStates.OnReview) {

        this.view.startBlockingUI();

        await getPolicyCancellationAmendments(input, ambientProperties, this);
        const duplicateCancelledRequestsNumbers = technicalInformation?.duplicateCancelledRequestsNumbers;
        const newCancellationRequestAvailable = technicalInformation?.newCancellationRequestAvailable;
        if (duplicateCancelledRequestsNumbers && !newCancellationRequestAvailable) {
            await showDuplicateCancelledMessage(input, ambientProperties, this);
        }

        try {
            await this.view.evaluate([
                '/attachmentsPackage'
            ], false, true);
        } catch (error) {
            this.view.stopBlockingUI();
            throw error;
        }

        this.view.stopBlockingUI();
    }

    const changeClass = body.changeClass;
    const isDidPaymentClassTypes = checkAvailabilitySome(didPaymentClassTypes, changeClass);
    if (isDidPaymentClassTypes) {
        try {
            await this.view.evaluate([
                '/equityDidPayment'
            ], false, true);
        } catch (error) {
            this.view.stopBlockingUI();
            throw error;
        }

        if (isEquityProductGroup && currentTypeOfRequest === typeOfRequest.Modification) {
            this.view.startBlockingUI();

            try {
                await this.view.evaluate(['/recipient[SetRecipient]'], false, true);
                await getRecipientBankAccounts(input, ambientProperties);

                const relatedRequest = await getRelatedRequest(input, ambientProperties, this);
                if (!relatedRequest) {
                    ambientProperties.services.confirmationDialog.showConfirmation('Обратите внимание, что Выгодоприобретателя по Дожитию после первой выплаты ДИД поменять нельзя.', 'OK', 'OK', 2);
                }
            } catch (error) {
                this.view.stopBlockingUI();
                throw error;
            }

            this.view.stopBlockingUI();

            fillInRecipientBankAccount(input);
        }
    }
    else {
        body.equityDidPayment = {};
    }

    await this.view.evaluate(['/paymentCalculation[SetPayments]'], false, true);

    this.view.rebind();
    this.view.reevaluateRules();
    this.view.validate();

};
