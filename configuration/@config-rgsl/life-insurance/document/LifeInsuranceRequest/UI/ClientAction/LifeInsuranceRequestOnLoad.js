'use strict';

const { isSaveOperationAvailable, isVersionApplied } = require('@config-rgsl/infrastructure/lib/UIUtils');
const {
    searchContractButtonClick,
    getTransitionDateFromRequest,
    checkDuplicateCancelledRequests,
    fillInAmendmentReason,
    getPolicyDataByStatuses,
    getBankAccounts,
    getRecipientBankAccounts,
    blockAgentModification
} = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestHelper');
const { documentStates, documentActors, applicantType, initiator } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { operationCode } = require('@config-rgsl/infrastructure/lib/ImplConstants');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { defaultPayments } = require('@config-rgsl/life-insurance/component/LifeInsurancePaymentCalculation/lib/paymentCalculationConsts');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = async function LifeInsuranceRequestOnLoad(input, ambientProperties) {

    const userGroups = ambientProperties.applicationContext.currentUser().getUserGroups();
    const isCurrentUserAdmin = ambientProperties.applicationContext.isCurrentUserAdmin();
    if (userGroups.some(item => item.UserGroupCode == 'audit') && !isCurrentUserAdmin) {
        this.view.disableAllElements();
        this.view.getContext().AvailableOperations = [];
        this.view.getContext().AvailableTransitions = [];
        this.view.rebind();
        this.view.reevaluateRules();
        this.view.validate();
        return;
    }

    if (!input.context.Body.technicalInformation) {
        input.context.Body.technicalInformation = {};
    }
    const technicalInformation = input.context.Body.technicalInformation;
    const isAgent = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Agent;
    const currentInitiator = input.context.Body.initiator;
    const stateCode = input.rootContext.State.Code;
    const isDraft = stateCode == documentStates.Draft;
    const isGeneralBackOffice = input.rootContext.WorkUnitActor.CurrentActor == documentActors.GeneralBackOffice;
    const isOperations = input.rootContext.WorkUnitActor.CurrentActor == documentActors.Operations;
    const currentTypeOfRequest = input.context.Body.typeOfRequest;
    const createdFromPolicy = technicalInformation.createdFromPolicy;
    const contractNumber = input.context.Body.contract?.number;
    const productGroup = input.context.Body.contract?.productGroup;
    const policyWasFound = technicalInformation.policyWasFound;
    const isEquityProductGroup = productGroup === lifeInsuranceConstants.productGroup.DSZ.descriptionRU;
    const requestApplicantType = input.context.Body.applicantType;

    try {
        this.view.startBlockingUI();
        await blockAgentModification(input, ambientProperties, this);
        await getBankAccounts(input, ambientProperties);
        await getRecipientBankAccounts(input, ambientProperties);

        if (contractNumber && !policyWasFound) {
            await getPolicyDataByStatuses(input, ambientProperties, this);
        }

        if (createdFromPolicy && isDraft && !currentTypeOfRequest) {
            await searchContractButtonClick(input, ambientProperties, this);
        }

        if (stateCode == documentStates.OnReview && !input.context.Body.receivedDate) {
            await getTransitionDateFromRequest(input, ambientProperties, this);
        }

        if (isAgent && !currentInitiator) {
            input.context.Body.initiator = initiator.applicant;
        }

        const hideSaveInRequestStates = [documentStates.CreateAmendment];
        const isSaveHide = hideSaveInRequestStates.includes(stateCode) && isGeneralBackOffice;
        if (isSaveHide) {
            this.view.getContext().AvailableOperations = this.view.getContext().AvailableOperations.filter(
                operation => operation.Code != operationCode.Save
            );
        }

        if (!isSaveOperationAvailable(this.view)) {
            this.view.disableAllElements();
        }

        if (isVersionApplied(this.view)) {
            this.view.disableValidation();
        }

        if (contractNumber && technicalInformation.policyWasFound) {

            const checkPolicyInRequestStates = [documentStates.Draft, documentStates.OnReview];
            if (checkPolicyInRequestStates.includes(stateCode) && (isGeneralBackOffice || isOperations)) {
                await this.view.evaluate(['/technicalInformation[CheckPolicyStatus]',], false, true);
                this.view.setClean();
            }

            const checkPolicyAmendmentsInRequestStates = [documentStates.Draft, documentStates.OnReview, documentStates.CreateAmendment];
            if (checkPolicyAmendmentsInRequestStates.includes(stateCode) && (isGeneralBackOffice || isOperations)) {
                await this.view.evaluate(['/technicalInformation[CheckPolicyAmendmentsStatus]',], false, true);
                this.view.setClean();
            }

            await this.view.evaluate(['[GetInvestmentEndDate]',], false, true);
            this.view.setClean();

        }

        await checkDuplicateCancelledRequests(input, ambientProperties, this);
        this.view.setClean();
        await fillInAmendmentReason(input);
        this.view.setClean();


        const checkPolicyInRequestStates = [documentStates.OnReview, documentStates.CreateAmendment, documentStates.CreateNonFinancialAmendment];

        if (checkPolicyInRequestStates.includes(stateCode)) {

            this.subscribeToEventsFromCurrentEntity({
                handler: {
                    name: 'LifeInsuranceStatusChangedServerSideHandler',
                    func: (message) => {
                        if (message.eventType === 'StatusChanged') {
                            this.unsubscribeFromEventsFromCurrentEntity('LifeInsuranceStatusChangedServerSideHandler');
                            this.view.reloadEntity();
                        }
                    }
                }
            });
        }

        let showErrorTab = false;

        if (input?.context?.Number) {

            const request = {
                method: 'post',
                url: 'api/entity-infrastructure/shared/datasource/SinkErrorDataSource',
                data: {
                    data: {
                        criteria: {
                            anyMatchNumber: input?.context?.Number ?? null
                        },
                    }
                }
            };

            const resultData = await ambientProperties.services.api.call(request);
            showErrorTab = resultData.data.length > 0;
        }

        if (showErrorTab) {

            this.view?.getControlByElementId('TabLayout')?.showTab('tabDocumentErrorsHistory');

            const checkPolicyInRequestStates = [
                documentStates.CreateAmendment,
                documentStates.CreateNonFinancialAmendment,
                documentStates.CreateFinancialAmendment,
                documentStates.CreateFinancialPolicyHolderChangeAmendment
            ];

            if (checkPolicyInRequestStates.includes(stateCode)) {
                this.view?.getControlByElementId('TabLayout')?.selectTab('tabDocumentErrorsHistory');
            }

        } else {
            this.view?.getControlByElementId('TabLayout')?.hideTab('tabDocumentErrorsHistory');
        }

        if (!input.context.Body.paymentCalculation?.paymentLines?.length) {
            if (!input.context.Body.paymentCalculation) {
                input.context.Body.paymentCalculation = {};
            }
            input.context.Body.paymentCalculation.paymentLines = defaultPayments;
        }

        if (isEquityProductGroup && !requestApplicantType) {
            input.context.Body.applicantType = applicantType.policyHolder;
        }

    } catch (err) {
        throwResponseError(err);
    } finally {
        this.view.stopBlockingUI();
    }

    this.view.rebind();
};
