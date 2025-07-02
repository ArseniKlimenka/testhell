const { paymentOrderActiveStates } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const amendmentConstants = require('@config-rgsl/life-insurance/lib/amendmentConstants');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { paymentOrderSubType } = require('@config-rgsl/acc-base/lib/paymentOrderConst');
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const partyDocumentLib = require('@config-rgsl/party/component/PartyDocument/lib/partyDocumentLib');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { documentStates } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');
const { translationUtils } = require('@adinsure/runtime');
const { changeTypes, personalDataChangeTypes, compliencePropertiesDataExtractor, compliencePropertyTranslations } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
/* eslint no-undef: "off"*/

/**
 * @errorCode {errorCode} ErrorCheckingKPKFor
 * @errorCode {errorCode} KPKCheckNotPassedFor
 * @errorCode {errorCode} invalidAgePassport
 * @errorCode {errorCode} unableToValidatePassport
 * @errorCode {errorCode} banksStatementItemsWithOpenAmountWarning
 * @errorCode {errorCode} ComplianceAgreementIsNeeding
 * @errorCode {errorCode} ClientIsPublicOfficial
 * */

module.exports = {

    /**
     * @param  {} sequenceNumber Sequence number of current document.
     * @param  {} latestAppliedSequenceNumber Sequence number of latest applied version.
     * @param  {} latestNonDiscardedSequenceNumber Sequence number of latest non discarded version.
     * @returns Returns whether version is first unapplied.
     */
    isFirstUnappliedAmendment: function (sequenceNumber, latestAppliedSequenceNumber, latestNonDiscardedSequenceNumber) {
        return sequenceNumber == latestAppliedSequenceNumber && sequenceNumber == latestNonDiscardedSequenceNumber;
    },

    /**
     * @param  {} that Context from change amendment flow rule.
     * @returns Returns whether version is first unapplied or false if user doesn't have rights for create amendment.
     */
    getChangeAmendmentFlowRule: function (that) {

        const roles = that.applicationContext.user.applicationRoles ?? [];

        if (!roles.includes('TesterRole')) {

            return false;
        }

        const isFirstUnappliedAmendment = this.isFirstUnappliedAmendment(that.businessContext.sequenceNumber, that.businessContext.latestAppliedSequenceNumber, that.businessContext.latestNonDiscardedSequenceNumber);

        if (!isFirstUnappliedAmendment) {
            return {
                errorCode: 'policyTransitionPreviousAmendmentInProgress'
            };
        }

        return isFirstUnappliedAmendment;
    },

    /**
     * @param {object} self this from initialView
     * @returns {object} data to save in technicalInformation in body
     */
    getTechnicalInformation: function (self) {
        return {
            creatorUsername: self.applicationContext.originatingUser.username,
            isCreatedByOperations: self.applicationContext.actor == 'Operations',
            originalDocumentId: self.businessContext.entityId
        };
    },

    /**
     * @param {object} self this from initialView
     * @returns {object} data to save as default cancellation amendment body
     */
    getDefaultCancellationBody: function (self, policyHolder) {

        const amendmentBody = amendmentConstants.LifeInsuranceCancellationDefaultValue;

        if (policyHolder) {

            amendmentBody.basicAmendmentConditions.applicant = {
                partyCode: policyHolder.partyData.partyCode,
                partyType: policyHolder.partyData.partyType,
                fullName: policyHolder.partyData.partyFullName
            };
        }

        amendmentBody.technicalInformation = self !== undefined ? this.getTechnicalInformation(self) : {};
        amendmentBody.taxDeductionItems = [];
        amendmentBody.paymentAmendmentConditions.paymentLines = [];
        amendmentBody.contractVersions = [];

        return amendmentBody;
    },

    validateReactivationAvailability: async function (input, ambientProperties, view) {

        let data = [];

        const request = {
            method: 'post',
            url: 'api/entity-infrastructure/shared/datasource/PODocumentSearchDataSource',
            data: {
                data: {
                    criteria: {
                        contractNumber: input.rootContext.OriginalDocumentNumber || ''
                    }
                }
            }
        };

        let result;
        try {
            view.startBlockingUI();
            result = await ambientProperties.services.api.call(request);
        }
        catch (err) {
            throwResponseError(err);
        }
        finally {
            view.stopBlockingUI();
        }

        if (result && result.data) {

            data = result.data;
        }

        data = data.filter(item => paymentOrderActiveStates.includes(item.resultData.originalStateCode));

        if (data.length > 0) {

            ambientProperties.services.confirmationDialog.showWarning('С договорм связаны РНВ в подтвержденном статусе! \n Активация ДС не возможна!', 'OK', undefined, 1, 'small', { textKeySkipTranslate: true });
            const element = view.getControlByElementId('ai-transitions-relations-control');
            element.hideElement();
        }
    },

    calculateCancellationAmountsInternal: function (body) {

        const paymentLines = body.paymentAmendmentConditions.paymentLines;
        const surrenderValueLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.surrenderValue);
        const paymentRefundLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.paymentRefund);
        const creditRefundLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.creditRefund);
        const partialPremiumRefundLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.partialPremiumRefund);

        const paymentLinesManualCorrection = body.paymentAmendmentConditions?.paymentLinesManualCorrection ?? false;

        if (paymentLinesManualCorrection && paymentRefundLine) {

            paymentRefundLine.paymentLineSum = 0;
            paymentRefundLine.paymentLineSumInRub = 0;
        }

        // check conditions existance
        const validFrom = body.basicAmendmentConditions?.validFrom;
        const amendmentReason = body.basicAmendmentConditions?.amendmentReason;
        const amendmentSubType = body.basicAmendmentConditions?.amendmentSubType;

        if (!validFrom || !amendmentReason) {

            return;
        }

        // calc sums
        let creditRefundSum = 0;
        let creditRefundSumRub = 0;
        let partialPremiumRefundSum = 0;
        let paymentRefundSum = 0;
        let surrenderValueSum = 0;
        const allocationsInfo = body.allocationsInfo ?? [];
        const contractVersions = body.contractVersions ?? [];

        const contractStateVersions = contractVersions.filter(i => i.seqNumber == 0 ||
            i.dimensions?.some(d => d.Key === 'amendmentType' && (d.Value === 'NonFinancialChange' || d.Value === 'FinancialChange')));

        const originalContractStateVersion = contractStateVersions.find(i => i.seqNumber == 0);
        const latestContractStateVersion = contractStateVersions.sort((a, b) => b.seqNumber - a.seqNumber)[0];

        const stateBody = (latestContractStateVersion.seqNumber == 0 ? latestContractStateVersion.body : latestContractStateVersion.snapshotBody)
            ?? originalContractStateVersion.body;

        const surrenderValues = stateBody.surrenderValues ?? [];
        const paymentPlan = stateBody.paymentPlan ?? [];
        const paymentFrequencyCode = stateBody.basicConditions?.paymentFrequency?.paymentFrequencyCode;
        const risks = stateBody.risks ?? [];
        const originalContractVersion = contractVersions.find(v => v.seqNumber === 0);
        const attachmentsPackage = body.attachmentsPackage ?? [];
        const contractAttachments = attachmentsPackage.filter(item => item.entityId == originalContractVersion.contractId);
        const returnPaymentsAttachmentExists = contractAttachments.some(item => item.attachmentType == 'returnPayments');
        const useFixedExchangeRate = body.paymentAmendmentConditions.useFixedExchangeRate ?? false;
        const exchangeRate = useFixedExchangeRate ?
            body.paymentAmendmentConditions.fixedExchangeRate :
            body.paymentAmendmentConditions.exchangeRate;

        if (partialPremiumRefundLine && !paymentLinesManualCorrection) {

            const originalStartDate = stateBody.policyTerms?.startDate;
            const originalEndDate = stateBody.policyTerms?.endDate;
            const originalRiskPremium = stateBody.basicConditions?.riskPremium;
            const validFrom = body.basicAmendmentConditions?.validFrom;

            partialPremiumRefundSum = round(
                (DateTimeUtils.getDayDifference(validFrom, originalEndDate) + 1) /
                (DateTimeUtils.getDayDifference(originalStartDate, originalEndDate) + 1) *
                originalRiskPremium, 2);

            if (partialPremiumRefundSum > 0) {

                partialPremiumRefundLine.paymentLineSum = partialPremiumRefundSum;
                partialPremiumRefundLine.paymentLineSumInRub = round(partialPremiumRefundSum * exchangeRate);
                partialPremiumRefundLine.paymentLineSumByRisks = this.calcPartialPremiumRefundSumByRisks(partialPremiumRefundLine.paymentLineSum, risks);
            }
            else {

                partialPremiumRefundLine.paymentLineSum = 0;
                partialPremiumRefundLine.paymentLineSumInRub = 0;
                partialPremiumRefundLine.paymentLineSumByRisks = undefined;
            }
        }

        if (paymentRefundLine) {

            const isByClientCoolOff = amendmentReason === amendmentConstants.amendmentReason.byClientCoolOff;
            const refundAllocations = isByClientCoolOff ? allocationsInfo : allocationsInfo.filter(item => item.dueDate < validFrom);

            paymentRefundSum = round(refundAllocations
                .reduce((acc, elem) => acc += elem.docAmount, 0), 2);

            if (paymentRefundSum > 0) {

                paymentRefundLine.paymentLineSum = paymentRefundSum;
                paymentRefundLine.paymentLineSumInRub = round(paymentRefundSum * exchangeRate);
            }
            else {

                paymentRefundLine.paymentLineSum = 0;
                paymentRefundLine.paymentLineSumInRub = 0;
            }
        }

        if (creditRefundLine && returnPaymentsAttachmentExists && !paymentLinesManualCorrection) {

            const futureAllocations = allocationsInfo.filter(item => item.dueDate >= validFrom);

            creditRefundSum = round(futureAllocations
                .reduce((acc, elem) => acc += elem.docAmount, 0), 2);

            creditRefundSumRub = round(futureAllocations
                .reduce((acc, elem) => acc += (elem.docAmount * elem.docRate), 0), 2);

            if (creditRefundSum > 0) {

                creditRefundLine.paymentLineSum = creditRefundSum;
                creditRefundLine.paymentLineSumInRub = creditRefundSumRub;
            }
            else {

                creditRefundLine.paymentLineSum = 0;
                creditRefundLine.paymentLineSumInRub = 0;
            }
        }

        const paymentPeriodOnValidFrom = paymentPlan.find(item => item.paymentPeriodStart <= validFrom && item.paymentPeriodEnd >= validFrom);
        const surrenderPerionOnValidFrom = surrenderValues.find(item => item.periodStartDate <= validFrom && item.periodEndDate >= validFrom);

        if (surrenderValueLine && paymentPeriodOnValidFrom && surrenderPerionOnValidFrom && !paymentLinesManualCorrection) {

            if (paymentFrequencyCode == lifeInsuranceConstants.paymentFrequency.semiAnnual.code &&
                paymentPeriodOnValidFrom.paymentPeriodStart == surrenderPerionOnValidFrom.periodStartDate) {

                // in case of semi-annual need to calculate as average if in first half of year
                const surrenderPerionOnValidFromIndex = surrenderValues.findIndex(item => item.periodStartDate <= validFrom && item.periodEndDate >= validFrom);
                const previousSurrenderPeriod = surrenderPerionOnValidFromIndex == 0 ? surrenderPerionOnValidFrom : surrenderValues[surrenderPerionOnValidFromIndex - 1];
                surrenderValueSum = round((previousSurrenderPeriod.surrenderValue + surrenderPerionOnValidFrom.surrenderValue) / 2, 2);
            }
            else {

                surrenderValueSum = round(surrenderPerionOnValidFrom.surrenderValue, 2);
            }

            if (surrenderValueSum > 0) {

                surrenderValueLine.paymentLineSum = surrenderValueSum;
                surrenderValueLine.paymentLineSumInRub = round(surrenderValueSum * exchangeRate);
            }
            else {

                surrenderValueLine.paymentLineSum = 0;
                surrenderValueLine.paymentLineSumInRub = 0;
            }
        }

        // 0 if byCompanyDecision or byCourtDecision amendmentSubType, can be corrected manually
        if (!paymentLinesManualCorrection) {

            if ([amendmentConstants.amendmentSubType.byCourtDecision, amendmentConstants.amendmentSubType.byCommissionDecision].includes(amendmentSubType) ||
                (amendmentConstants.amendmentSubType.byCompanyDecision === amendmentSubType &&
                    amendmentConstants.amendmentReason.partiesAgreement === amendmentReason)) {

                if (surrenderValueLine) {

                    surrenderValueLine.paymentLineSum = 0;
                    surrenderValueLine.paymentLineSumInRub = 0;
                }

                if (partialPremiumRefundLine) {

                    partialPremiumRefundLine.paymentLineSum = 0;
                    partialPremiumRefundLine.paymentLineSumInRub = 0;
                    partialPremiumRefundLine.paymentLineSumByRisks = [];
                }

                if (creditRefundLine) {

                    creditRefundLine.paymentLineSum = 0;
                    creditRefundLine.paymentLineSumInRub = 0;
                }
            }

            if ([amendmentConstants.amendmentSubType.byCompanyDecision, amendmentConstants.amendmentSubType.byCourtDecision].includes(amendmentSubType)) {

                if (paymentRefundLine) {

                    paymentRefundLine.paymentLineSum = 0;
                    paymentRefundLine.paymentLineSumInRub = 0;
                }
            }
        }
    },

    calculateCancellationAmounts: function (body, installements, investProfitRates, partiesData, policyData, existingPaymentOrders, cancellationState) {

        const skipPaymentLinesCalc = cancellationState === amendmentConstants.amendmentState.SentToPayment;

        this.updatePaymentLinesRubCurrency(body);

        const paymentLinesManualCorrection = body.paymentAmendmentConditions?.paymentLinesManualCorrection ?? false;

        if (!paymentLinesManualCorrection) {

            this.calculateDebt(body, installements);
            this.calculateObligations(body, installements, policyData);
        }

        if (cancellationState === amendmentConstants.cancellationAmendmentState.OperationsApproval) {

            this.setInvestProfit(body, investProfitRates);
        }

        if (paymentLinesManualCorrection) {

            this.setPercentage(body, existingPaymentOrders);
        }

        if (!skipPaymentLinesCalc) {

            this.calculateCancellationAmountsInternal(body);
        }

        if (body.technicalInformation?.requestAmendmentReason === amendmentConstants.amendmentReason.creditRepayment &&
            body.technicalInformation.requestState === documentStates.CancelWithoutPayment) {

            const paymentLines = body.paymentAmendmentConditions.paymentLines ?? [];

            paymentLines.forEach(item => {

                item.paymentLineSum = 0;
                item.paymentLineSumInRub = 0;

                if (item.paymentLineType === amendmentConstants.amendmentPaymentLineType.creditRefund) {

                    item.paymentLineSumByRisks = undefined;
                }
            });
        }

        this.calculateRecipientsPit(body, partiesData, policyData.currencyCode, existingPaymentOrders);
        this.recalculateCancellationRecipientsAmount(body, existingPaymentOrders);
    },

    updatePaymentLinesRubCurrency: function (body) {

        const paymentLines = body.paymentAmendmentConditions.paymentLines ?? [];

        paymentLines.forEach(line => {

            if (line.paymentLineType !== amendmentConstants.amendmentPaymentLineType.pit) {

                const lineAmount = line.paymentLineSum;
                const useFixedExchangeRate = body.paymentAmendmentConditions.useFixedExchangeRate ?? false;
                const exchangeRate = useFixedExchangeRate ? body.paymentAmendmentConditions.fixedExchangeRate : body.paymentAmendmentConditions.exchangeRate;

                line.paymentLineSumInRub = round(lineAmount * exchangeRate);
            }
        });
    },

    setInvestProfit: function (body, investProfit) {

        const calculatedItems = investProfit ?? [];
        const currentPaymentLines = body.paymentAmendmentConditions.paymentLines ?? [];
        const paymentLine = currentPaymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.investProfit);

        if (paymentLine) {

            paymentLine.paymentLineSum = calculatedItems[0]?.Rate ?? 0;

            const useFixedExchangeRate = body.paymentAmendmentConditions.useFixedExchangeRate ?? false;
            const exchangeRate = useFixedExchangeRate ?
                body.paymentAmendmentConditions.fixedExchangeRate :
                body.paymentAmendmentConditions.exchangeRate;

            paymentLine.paymentLineSumInRub = round((calculatedItems[0]?.Rate ?? 0) * exchangeRate);
        }
    },

    calculateDebt: function (body, installements) {

        const paymentLines = body.paymentAmendmentConditions.paymentLines ?? [];
        const debtPaymentLine = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.debt);

        if (!debtPaymentLine) {

            return;
        }

        const validFrom = body.basicAmendmentConditions.validFrom;

        installements = installements.filter(i => i.dueDate <= validFrom);

        const debt = installements.reduce((previousValue, currentValue) => previousValue + (currentValue.underpaymentSum ?? 0), 0) ?? 0;
        debtPaymentLine.paymentLineSum = round(debt);
        const useFixedExchangeRate = body.paymentAmendmentConditions.useFixedExchangeRate ?? false;
        const exchangeRate = useFixedExchangeRate ?
            body.paymentAmendmentConditions.fixedExchangeRate :
            body.paymentAmendmentConditions.exchangeRate;
        debtPaymentLine.paymentLineSumInRub = round(debt * exchangeRate);

        const amendmentSubType = body.basicAmendmentConditions.amendmentSubType;
        const amendmentReason = body.basicAmendmentConditions.amendmentReason;

        if ([amendmentConstants.amendmentSubType.byCourtDecision, amendmentConstants.amendmentSubType.byCommissionDecision].includes(amendmentSubType) ||
            (amendmentConstants.amendmentSubType.byCompanyDecision === amendmentSubType &&
                amendmentConstants.amendmentReason.partiesAgreement === amendmentReason)) {

            if (debtPaymentLine) {

                debtPaymentLine.paymentLineSum = 0;
                debtPaymentLine.paymentLineSumInRub = 0;
            }
        }
    },

    calculateObligations: function (body, installements, policyData) {

        const paymentLines = body.paymentAmendmentConditions.paymentLines ?? [];
        const obligationsPaymentLine = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.obligations);

        if (!obligationsPaymentLine) {

            return;
        }

        const validFrom = body.basicAmendmentConditions.validFrom;
        let oblgationsEndDate = undefined;
        const policyPeriods = DateTimeUtils.getPeriodsTable(policyData.startDate, policyData.endDate);
        const cancellationPeriod = policyPeriods.find(p => p.periodStartDate <= validFrom && p.periodEndDate >= validFrom);

        if (cancellationPeriod) {

            oblgationsEndDate = cancellationPeriod.periodEndDate;
        }
        else {

            oblgationsEndDate = policyData.endDate;
        }

        installements = installements.filter(i => validFrom < i.dueDate && i.dueDate <= oblgationsEndDate);
        const obligationsSum = installements.reduce((previousValue, currentValue) => previousValue + (currentValue.installmentSum ?? 0), 0) ?? 0;

        obligationsPaymentLine.paymentLineSum = round(obligationsSum);
        const useFixedExchangeRate = body.paymentAmendmentConditions.useFixedExchangeRate ?? false;
        const exchangeRate = useFixedExchangeRate ?
            body.paymentAmendmentConditions.fixedExchangeRate :
            body.paymentAmendmentConditions.exchangeRate;
        obligationsPaymentLine.paymentLineSumInRub = round(obligationsSum * exchangeRate);

        const amendmentSubType = body.basicAmendmentConditions.amendmentSubType;
        const amendmentReason = body.basicAmendmentConditions.amendmentReason;

        if ([amendmentConstants.amendmentSubType.byCourtDecision, amendmentConstants.amendmentSubType.byCommissionDecision].includes(amendmentSubType) ||
            (amendmentConstants.amendmentSubType.byCompanyDecision === amendmentSubType &&
                amendmentConstants.amendmentReason.partiesAgreement === amendmentReason)) {

            if (obligationsPaymentLine) {

                obligationsPaymentLine.paymentLineSum = 0;
                obligationsPaymentLine.paymentLineSumInRub = 0;
            }
        }
    },


    setPercentage: function (body, existingPaymentOrders) {

        const paymentLines = body.paymentAmendmentConditions.paymentLines ?? [];
        const pitLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.pit);
        const pitAmount = pitLine?.paymentLineSum ?? 0;
        let requestedAmount = this.calculateTotalCancellationAmount(body)?.total ?? 0;
        requestedAmount = requestedAmount - pitAmount;
        const recipients = body.paymentAmendmentConditions.canellationRecipients ?? [];

        recipients.forEach(item => {

            const relatedPaymentOrder = existingPaymentOrders.find(po => po.recipientCode === item.partyCode &&
                !po.paymentOrderSubType &&
                po.paymentOrderNumber === item.assignedPaymentOrderNumber);
            const calculateFromAmount = item.calculateFromAmount;

            if (!relatedPaymentOrder && calculateFromAmount) {

                const amount = item.amountToPay;

                if ((amount || amount === 0) && requestedAmount) {

                    const percentage = amount / requestedAmount;
                    item.amountToPayPercetage = percentage;
                }
                else {

                    delete item.amountToPayPercetage;
                }
            }
        });
    },

    calculateRecipientsPit: function (body, partiesData, contractCurrencyCode, existingPaymentOrders) {

        if (!contractCurrencyCode) {

            throw 'Contract currency parameter is not provided!';
        }

        const paymentLines = body.paymentAmendmentConditions.paymentLines ?? [];
        const pitLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.pit);
        const validFrom = body.basicAmendmentConditions.validFrom;
        const allocationsInfo = body.allocationsInfo ?? [];
        const recipients = body.paymentAmendmentConditions.canellationRecipients ?? [];
        const policyHolderCode = body.technicalData.policyParties.holder.personCode;
        const partiesInfo = partiesData ?? [];

        if (!validFrom || !pitLine) {

            recipients.forEach(item => {

                delete item.pitAmount;
                delete item.pitAmountInRubCurrency;
                delete item.isManualPit;
            });

            return;
        }

        pitLine.paymentLineSum = 0;
        pitLine.paymentLineSumInRub = 0;

        const policyHolderName = body.technicalData.policyParties.holder.fullName;
        const holderInfo = partiesInfo.find(i => i.code === policyHolderCode);
        const excludedPersons = holderInfo?.partyExcludedPersons ?? [];
        const excludedPersonsNames = excludedPersons.map(item => item.excludedPersonName);

        const holderAllocations = allocationsInfo.filter(a => a.bsi.paymentDate <= validFrom &&
            (a.bsi.payerName === policyHolderName || excludedPersonsNames.includes(a.bsi.payerName)));
        const totalHolderAllocatedSum = holderAllocations.reduce((sum, current) => sum + (current.payAmount * current.payRate), 0);

        const nonHolderAllocations = allocationsInfo.filter(a => a.bsi.paymentDate <= validFrom &&
            a.bsi.payerName !== policyHolderName && !excludedPersonsNames.includes(a.bsi.payerName));
        const totalNonHolderAllocatedSum = nonHolderAllocations.reduce((sum, current) => sum + (current.payAmount * current.payRate), 0);

        const surrenderValueLine = paymentLines.find(item => item.paymentLineType === amendmentConstants.amendmentPaymentLineType.surrenderValue);
        const surrenderValueAmount = surrenderValueLine?.paymentLineSumInRub ?? 0;

        const debtPaymentLine = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.debt);
        const debtAmount = debtPaymentLine?.paymentLineSumInRub ?? 0;

        const investProfitLine = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.investProfit);
        const investProfitAmount = investProfitLine?.paymentLineSumInRub ?? 0;

        const paymentRefundLine = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.paymentRefund);
        const paymentRefundAmount = paymentRefundLine?.paymentLineSumInRub ?? 0;

        const creditRefundLine = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.creditRefund);
        const creditRefundAmount = creditRefundLine?.paymentLineSumInRub ?? 0;

        let additionalLinesSum = 0;

        if (contractCurrencyCode !== 'RUB') {

            additionalLinesSum = paymentRefundAmount + creditRefundAmount;
        }

        const taxDeductionAmount = body.taxDeductionItems.reduce((sum, current) => sum + (current.amount ?? 0), 0) ?? 0;

        let baseTaxableAmount = (surrenderValueAmount + investProfitAmount + additionalLinesSum - debtAmount - totalHolderAllocatedSum - totalNonHolderAllocatedSum);

        if (baseTaxableAmount < 0) {

            baseTaxableAmount = 0;
        }

        baseTaxableAmount += (totalNonHolderAllocatedSum + taxDeductionAmount);

        const totalAmountToPay = this.calculateTotalCancellationAmount(body)?.total ?? 0;

        recipients.forEach(r => {

            const relatedPaymentOrder = existingPaymentOrders.find(po => po.recipientCode === r.partyCode &&
                po.paymentOrderSubType === paymentOrderSubType.PIT &&
                po.paymentOrderNumber === r.assignedPitPaymentOrderNumber);
            const isManualPit = r.isManualPit ?? false;


            if (!relatedPaymentOrder && !isManualPit) {

                const recipientData = partiesInfo.find(data => data.code === r.partyCode);
                const taxResidencies = recipientData.partyTaxResidencies ?? [];

                const periodsEndDate = DateTimeUtils.substractDays(validFrom, 1);
                const periodsStartDate = DateTimeUtils.substractYears(periodsEndDate, 1);

                const otherCountriesPeriods = taxResidencies.filter(item =>
                    item.startDate <= periodsEndDate &&
                    item.endDate >= periodsStartDate &&
                    item.residenceCountry.countryCode !== partyConstants.countryRussia.countryCode);

                const totalOtherCountriesDays = otherCountriesPeriods.reduce((sum, current) => {

                    const periodStartDate = periodsStartDate > current.startDate ? periodsStartDate : current.startDate;
                    const periodEndDate = periodsEndDate < current.endDate ? periodsEndDate : current.endDate;
                    const days = DateTimeUtils.getDayDifference(periodStartDate, periodEndDate);
                    return sum + days;
                }, 0) ?? 0;

                let pit = 0;
                const recipientTaxableAmount = r.amountToPayPercetage ? round(r.amountToPayPercetage * baseTaxableAmount) : 0;

                if (totalAmountToPay > 0 && (r.amountToPayPercetage ?? 0) > 0) {

                    if (totalOtherCountriesDays < 183) {

                        if (recipientTaxableAmount < 5000000) {

                            pit = recipientTaxableAmount * 0.13;
                        }
                        else {

                            pit = recipientTaxableAmount * 0.15;
                        }
                    }
                    else {

                        pit = recipientTaxableAmount * 0.3;
                    }
                }

                r.pitAmount = undefined;
                r.pitAmountInRubCurrency = round(pit, 0);
            }
        });

        const totalPit = recipients.reduce((sum, current) => sum + (current.pitAmountInRubCurrency ?? 0), 0) ?? 0;
        pitLine.paymentLineSum = undefined;
        pitLine.paymentLineSumInRub = totalPit;
    },

    recalculateCancellationRecipientsAmount: function (body, existingPaymentOrders) {

        const amendmentSubType = body.basicAmendmentConditions.amendmentSubType;
        const amednmentReason = body.basicAmendmentConditions.amendmentReason;

        if (!amendmentSubType || !amednmentReason) {

            const recipients = body.paymentAmendmentConditions.canellationRecipients ?? [];
            recipients.forEach(item => {

                item.amountToPay = 0;
                item.amountToPayInRubCurrency = 0;
            });

            return;
        }

        const recipients = body.paymentAmendmentConditions.canellationRecipients ?? [];
        const requestedAmount = this.calculateTotalCancellationAmount(body)?.totalInRub ?? 0;
        const useFixedExchangeRate = body.paymentAmendmentConditions.useFixedExchangeRate ?? false;
        const exchangeRate = useFixedExchangeRate ?
            body.paymentAmendmentConditions.fixedExchangeRate :
            body.paymentAmendmentConditions.exchangeRate;

        recipients.forEach(item => {

            const relatedPaymentOrder = existingPaymentOrders.find(po => po.recipientCode === item.partyCode &&
                !po.paymentOrderSubType &&
                po.paymentOrderNumber === item.assignedPaymentOrderNumber);

            if (!relatedPaymentOrder) {

                const percentage = item.amountToPayPercetage;

                if ((percentage ?? 0) > 0 && requestedAmount > 0) {

                    const percentageAmount = round(requestedAmount * percentage);
                    const convertedAmount = round(percentageAmount / exchangeRate);
                    item.amountToPay = convertedAmount;
                    item.amountToPayInRubCurrency = percentageAmount;
                }
                else {

                    item.amountToPay = 0;
                    item.amountToPayInRubCurrency = 0;
                }
            }
        });
    },

    calculateTotalCancellationAmount: function (body) {

        const paymentLines = body.paymentAmendmentConditions.paymentLines ?? [];
        const paymentLinesToAdd = paymentLines
            .filter(l => l.paymentLineType !== amendmentConstants.amendmentPaymentLineType.debt &&
                l.paymentLineType !== amendmentConstants.amendmentPaymentLineType.pit &&
                l.paymentLineType !== amendmentConstants.amendmentPaymentLineType.obligations);
        const paymentLinesToAddRub = paymentLines
            .filter(l => l.paymentLineType !== amendmentConstants.amendmentPaymentLineType.debt &&
                l.paymentLineType !== amendmentConstants.amendmentPaymentLineType.pit &&
                l.paymentLineType !== amendmentConstants.amendmentPaymentLineType.obligations);
        const debt = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.debt)?.paymentLineSum ?? 0;
        const debtRub = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.debt)?.paymentLineSumInRub ?? 0;
        const obligations = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.obligations)?.paymentLineSum ?? 0;
        const obligationsRub = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.obligations)?.paymentLineSumInRub ?? 0;
        const pit = paymentLines.find(l => l.paymentLineType === amendmentConstants.amendmentPaymentLineType.pit)?.paymentLineSumInRub ?? 0;
        let totalAmount = paymentLinesToAdd.reduce((previousValue, currentValue) => previousValue + currentValue.paymentLineSum, 0) - debt - obligations;
        totalAmount = Math.max(0, totalAmount);
        let totalAmountInRub = paymentLinesToAddRub.reduce((previousValue, currentValue) => previousValue + currentValue.paymentLineSumInRub, 0) - debtRub - obligationsRub - pit;
        totalAmountInRub = Math.max(0, totalAmountInRub);

        return {
            total: round(totalAmount),
            totalInRub: round(totalAmountInRub)
        };
    },

    calcPartialPremiumRefundSumByRisks: function (partialPremiumRefundSum, refundRisks) {

        let result = [];

        const risksPremiumSum = refundRisks.reduce((acc, v) => { acc += v.riskPremium; return acc; }, 0);
        result = refundRisks.map(r => {
            return {
                riskCode: r.risk.riskCode,
                riskSum: round(r.riskPremium / risksPremiumSum * partialPremiumRefundSum, 2)
            };
        });
        const calculatedSum = result.reduce((acc, v) => { acc += v.riskSum; return acc; }, 0);
        const roundingDiff = partialPremiumRefundSum - calculatedSum;
        result[0].riskSum = round(result[0].riskSum + roundingDiff, 2);

        return result;
    },

    validateCancellationRecipientsBankAccounts: function (body, state, validationErrors) {

        if (!amendmentConstants.cancellationStatesToValidateBankAccounts.includes(state)) {

            return;
        }

        const recipientsBankAccounts = body.tempTechnicalData?.recipientsBankAccounts ?? [];
        const recipients = body.paymentAmendmentConditions?.canellationRecipients ?? [];

        const noSelectedBankAccounts = recipients.filter(item => !item.bankAccount || item.bankAccount.length === 0);

        const validFrom = body.basicAmendmentConditions.validFrom;
        const noBankAccountsCodes = recipientsBankAccounts.filter(item => !item.bankAccounts ||
            (item.bankAccounts.filter(a => a.closingDate && (validFrom ? a.closingDate <= validFrom : true))).length === (item.bankAccounts?.length ?? 0))
            .map(i => i.partyCode);
        const noBankAccountsRecipients = recipients.filter(i => noBankAccountsCodes.includes(i.partyCode));

        if (recipients.length > 0 && noBankAccountsRecipients.length > 0) {

            const forError = noBankAccountsRecipients.filter(i => i.recipientPaymentType?.code === amendmentConstants.recipientPaymentType.bankAccount);
            const forWarning = noBankAccountsRecipients.filter(i => i.recipientPaymentType?.code === amendmentConstants.recipientPaymentType.nettingPayment);

            const namesForError = forError.map(item => item.fullName);
            const namesForWarning = forWarning.map(item => item.fullName);

            if (namesForWarning.length > 0) {

                validationErrors.push({
                    errorCode: 'RecipientsWithoutBankAccountsWarning',
                    reference: {
                        items: namesForWarning.join()
                    },
                    severity: 'Warning'
                });
            }

            if (namesForError.length > 0) {

                validationErrors.push({
                    errorCode: 'RecipientsWithoutBankAccountsError',
                    reference: {
                        items: namesForError.join()
                    },
                    severity: 'Error'
                });
            }
        }

        if (recipients.length > 0 && noSelectedBankAccounts.length > 0) {

            const forError = noSelectedBankAccounts.filter(i => i.recipientPaymentType?.code === amendmentConstants.recipientPaymentType.bankAccount);
            const forWarning = noSelectedBankAccounts.filter(i => i.recipientPaymentType?.code === amendmentConstants.recipientPaymentType.nettingPayment);

            const namesForError = forError.map(item => item.fullName);
            const namesForWarning = forWarning.map(item => item.fullName);

            if (namesForWarning.length > 0) {

                validationErrors.push({
                    errorCode: 'RecipientsWithoutSelectedBankAccountsWarning',
                    reference: {
                        items: namesForWarning.join()
                    },
                    severity: 'Warning'
                });
            }

            if (namesForError.length > 0) {

                validationErrors.push({
                    errorCode: 'RecipientsWithoutSelectedBankAccountsError',
                    reference: {
                        items: namesForError.join()
                    },
                    severity: 'Error'
                });
            }
        }
    },

    setCancellationPaymentLines: function (amendmentBody, policyLatestBody) {

        const amendmentSubType = amendmentBody.basicAmendmentConditions.amendmentSubType;
        const amednmentReason = amendmentBody.basicAmendmentConditions.amendmentReason;

        if (!amendmentSubType || !amednmentReason) {

            amendmentBody.paymentAmendmentConditions.paymentLines = [];
            return;
        }

        const currentPaymentLines = amendmentBody.paymentAmendmentConditions.paymentLines ?? [];
        const paymentLinesTypesToSet = amendmentConstants.amendmentPaymentLinesGroups[amendmentSubType][amednmentReason] ?? [];
        let paymentLinesToSet = [];

        if (policyLatestBody.basicConditions.currency.currencyCode !== 'RUB' &&
            paymentLinesTypesToSet.includes(amendmentConstants.amendmentPaymentLineType.paymentRefund) &&
            !paymentLinesTypesToSet.includes(amendmentConstants.amendmentPaymentLineType.pit)) {

            paymentLinesTypesToSet.push(amendmentConstants.amendmentPaymentLineType.pit);
        }

        paymentLinesTypesToSet.forEach(item => {

            const lineWeight = amendmentConstants.amendmentPaymentLineWeight[item];
            const existingPaymentLine = currentPaymentLines.find(line => line.paymentLineType === item);

            const line = {
                paymentLineType: item,
                paymentLineSum: existingPaymentLine ? existingPaymentLine.paymentLineSum : 0,
                paymentLineSumInRub: existingPaymentLine ? existingPaymentLine.paymentLineSumInRub : 0,
                paymentLineSumByRisks: existingPaymentLine ? existingPaymentLine.paymentLineSumByRisks : [],
                weight: lineWeight
            };

            paymentLinesToSet.push(line);
        });

        paymentLinesToSet = paymentLinesToSet.sort(function (a, b) { return a.weight - b.weight; });
        amendmentBody.paymentAmendmentConditions.paymentLines = paymentLinesToSet;
    },

    validateKPK: function (input, confCodeName, validationErrors) {

        const enrich = documents.getDocumentConfiguration(confCodeName, 1).processEnrichmentsFn;
        enrich(undefined, input.body, ['/paymentAmendmentConditions[SetPolicyParties]']);
        enrich(undefined, input.body, ['/paymentAmendmentConditions[GetPolicyDates]']);
        enrich(undefined, input.body, ['/paymentAmendmentConditions[GetKPKValidationStatus]']);

        const holder = input.body.technicalData.policyParties.holder;
        const insured = input.body.technicalData.policyParties.insuredPerson;
        const paticipantsData = input.body.technicalData.partiesInfo;

        const validationResults = input.body.tempTechnicalData.kpkValidationData;

        let participantTypeName = ' ';
        let participantPartyName = ' ';

        validationResults.forEach(item => {

            const participant = paticipantsData.find(p => p.code == item.resultData.ContractorPartyCode);
            participantPartyName = participant.fullName;

            if (item.resultData.ContractorPartyCode == holder.personCode) {

                participantTypeName = 'Страхователь';
            }
            else if (item.resultData.ContractorPartyCode == insured.personCode) {

                participantTypeName = 'Застрахованный';
            }
            else {

                participantTypeName = 'Выгодоприобретатель';
            }

            if (item.resultData.CheckResultData.Error) {

                validationErrors.push({
                    errorCode: 'ErrorCheckingKPKFor',
                    reference: {
                        participant: participantTypeName,
                        participantName: participantPartyName
                    }
                });
            }
            else if (item.resultData.CheckResultData.Reject == 'true' || ['НаСогласовании', 'НеСогласован'].includes(item.resultData.CheckResultData.Agreement)) {

                validationErrors.push({
                    errorCode: 'KPKCheckNotPassedFor',
                    reference: {
                        participant: participantTypeName,
                        participantName: participantPartyName
                    }
                });
            }

            const passports = participant.identityDocuments.filter(doc => doc.identityDocumentType === 'passport');
            let latestPassport = passports.length > 0 && passports[0] || undefined;
            passports.forEach(function (pass) { latestPassport = new Date(pass.issueDate) > new Date(latestPassport.issueDate) ? pass : latestPassport; });

            const passportValidationResult = partyDocumentLib.checkPassportAge(
                {
                    issueDate: latestPassport?.issueDate,
                    dateOfBirth: participant.dateOfBirth,
                    validationDate: DateTimeUtils.dateNow()
                });

            if (!latestPassport) {

                validationErrors.push({
                    errorCode: 'unableToValidatePassport',
                    reference: {
                        participant: participantTypeName,
                        participantName: participantPartyName
                    }
                });
            }
            else if (passportValidationResult.invalidAgePassport14 || passportValidationResult.invalidAgePassport20 || passportValidationResult.invalidAgePassport4) {

                validationErrors.push({
                    errorCode: 'invalidAgePassport',
                    reference: {
                        participant: participantTypeName,
                        participantName: participantPartyName
                    }
                });
            }
        });
    },

    getKPKRequestData: function (body, partiesData, documentId, documentNumber) {

        const holder = body.technicalData.policyParties.holder;
        const insured = body.technicalData.policyParties.insuredPerson;

        const kpkRequestData = [];

        partiesData.forEach(item => {

            const output = {};
            output.Contractor = {};

            if (item.partyType === 'LegalEntity') {

                output.Contractor.JuridicalSection = {};
                output.Contractor.JuridicalSection.Group = '';
                output.Contractor.JuridicalSection.Name = item.shortName;
                output.Contractor.JuridicalSection.FullName = item.fullName;
                output.Contractor.JuridicalSection.INN = item.INNKIO;
                output.Contractor.JuridicalSection.KPP = item.KPP;
                output.Contractor.JuridicalSection.OGRN = item.OGRNOGRNIP;
            }

            if (item.partyType === 'NaturalPerson') {

                output.Contractor.PhisicalSection = {};
                output.Contractor.PhisicalSection.Group = '';
                output.Contractor.PhisicalSection.FullName = item.fullName;
                output.Contractor.PhisicalSection.Birthday = item.dateOfBirth;
                output.Contractor.PhisicalSection.Name = item.firstName;
                output.Contractor.PhisicalSection.Surname = item.lastName;
                output.Contractor.PhisicalSection.MiddleName = item.middleName;
                output.Contractor.PhisicalSection.Sex = item.personGender;

                const citizenship = item.citizenship || [];
                const Nationality = citizenship.length > 0 && citizenship[0].countryShortName || undefined;
                output.Contractor.PhisicalSection.Nationality = Nationality;

                const passports = item.identityDocuments.filter(doc => doc.identityDocumentType === 'passport');
                let latestPassport = passports.length > 0 && passports[0] || undefined;

                if (latestPassport) {

                    passports.forEach(function (pass) { latestPassport = new Date(pass.issueDate) > new Date(latestPassport.issueDate) ? pass : latestPassport; });
                    output.Contractor.PhisicalSection.Passport = {
                        Series: latestPassport.documentSeries,
                        Number: latestPassport.documentNumber,
                        GivedOut: latestPassport.issuerName,
                        DateOfIssue: latestPassport.issueDate,
                        DocumentType: 'ПаспортРФ'
                    };
                }

                output.Contractor.PhisicalSection.BirthPlace = item.birthPlace;
                output.Contractor.PhisicalSection.INN = item.INNKIO;

                const Entrepreneur = item.naturalPersonCategory == 'soleProprietor' ? 1 : 0;
                output.Contractor.PhisicalSection.Entrepreneur = Entrepreneur;

                let SNILS = item.SNILS;

                if (SNILS) {

                    SNILS = SNILS.replace(/ /gi, '').replace(/-/gi, '');
                }

                const PDL = item.isPublicOfficial ? 1 : 0;
                const PDLRelative = ((PDL === 1) && item.executivePerson?.executivePersonDesc === 'Родственник ПДЛ') ? 1 : 0;
                const PDLRelativeDegree = (PDLRelative === 1) && item.relationType;
                const IPDL = ((PDL == 1) && item.executivePerson?.executivePersonDesc == 'Иностранное ПДЛ') ? 1 : 0;

                output.Contractor.PhisicalSection.PDL = PDL;
                output.Contractor.PhisicalSection.PDLRelative = PDLRelative;
                output.Contractor.PhisicalSection.PDLRelativeDegree = PDLRelativeDegree;
                output.Contractor.PhisicalSection.IPDL = IPDL;
            }

            output.Contractor.NonResident = item.isNonResident;

            const partyEmails = item.partyEmails || [];
            const preferableEmails = partyEmails.filter(e => e.isPreferable);
            const Email = preferableEmails.length > 0 ? preferableEmails[0].email : (partyEmails.length > 0 ? partyEmails[0].email : undefined);

            if (Email) {

                if (!output.Contractor.Contacts) {

                    output.Contractor.Contacts = {};
                }

                output.Contractor.Contacts.Email = Email;
            }

            const partyPhones = item.partyPhones || [];
            const preferablePhones = partyPhones.filter(p => p.isPreferable);
            const PhoneNumber = preferablePhones.length > 0 ? preferablePhones[0].fullNumberFormatted : (partyPhones.length > 0 ? partyPhones[0].fullNumberFormatted : undefined);
            const PhoneNumberWithoutCodes = preferablePhones.length > 0 ? preferablePhones[0].fullNumber : (partyPhones.length > 0 ? partyPhones[0].fullNumber : undefined);

            if (PhoneNumber || PhoneNumberWithoutCodes) {

                if (!output.Contractor.Contacts) {

                    output.Contractor.Contacts = {};
                }

                output.Contractor.Contacts.PhoneNumber = PhoneNumber;
                output.Contractor.Contacts.PhoneNumberWithoutCodes = PhoneNumberWithoutCodes;
            }

            output.Contractor.OuterID = item.partyId;

            if (item.code === holder.personCode) {

                output.Contractor.Role = 'Клиент';
            }
            else if (item.code === insured.personCode) {

                output.Contractor.Role = 'Иное';
            }
            else {

                output.Contractor.Role = 'Выгодоприобретатель';
            }

            const partyBankAccounts = item.bankAccounts ?? [];
            const partyBankAccount = partyBankAccounts.length > 0 ? partyBankAccounts[partyBankAccounts.length - 1] : undefined;

            if (partyBankAccount) {

                output.Contractor.BankAccount = {};
                output.Contractor.BankAccount.Name = partyBankAccount.bankName;
                output.Contractor.BankAccount.Currency = partyBankAccount?.currency?.currencyCode;
                output.Contractor.BankAccount.AccountNumber = partyBankAccount.accountNumber;

                output.Contractor.BankAccount.Bank = {};
                output.Contractor.BankAccount.Bank.SWIFTBIK = partyBankAccount.SWIFT;
                output.Contractor.BankAccount.Bank.SWIFTBIK = partyBankAccount.bankBic;
                output.Contractor.BankAccount.Bank.Name = partyBankAccount.bankName;
                output.Contractor.BankAccount.Bank.CorrAccount = partyBankAccount.bankCorrespondentAccount;
            }

            output.Contractor.RelationshipBeginDate = body.tempTechnicalData?.policyIssueDate;
            output.Contractor.RelationshipEndDate = body.basicAmendmentConditions?.validFrom;

            output.Document = {
                DocumentUID: documentId,
                DocumentNumber: documentNumber,
                Representation: 'Расторжение ' + documentNumber,
                TypeOperation: 'Расход',
                Summ: 0,
                CheckAgreement: 0,
                BatchUpload: 0
            };

            output.BaseID = 'ADINSURE';

            const request = {
                itemCode: item.code,
                itemData: output
            };

            kpkRequestData.push(request);
        });

        return kpkRequestData;
    },

    validateOpenAmount: function (body, validationErrors) {

        const allocationsInfo = body.allocationsInfo ?? [];

        let itemsIdsWithOpenAmount = allocationsInfo.filter(a => (a.bsi.openAmount ?? 0) > 0).map(a => a.bsiId);
        itemsIdsWithOpenAmount = [...new Set(itemsIdsWithOpenAmount)];

        if (itemsIdsWithOpenAmount.length > 0) {

            validationErrors.push({
                errorCode: 'banksStatementItemsWithOpenAmountWarning',
                reference: {
                    items: itemsIdsWithOpenAmount.join()
                },
                severity: 'Warning'
            });
        }
    },

    validateChangingInquiries(input, validationErrors) {
        const personalDataChangeTypeArr = input.body.amendmentData.nonFinChangeAmendmentData.mainAttributes.personalDataChangeType ?? [];
        const lastComplienceInquirie = input.body.tempTechnicalData?.inquiries?.filter(item => item.departmentCodeName === 'compliance')?.slice(-1)[0];
        const isComplienceInquirieIssued = lastComplienceInquirie?.stateCode === 'Issued';
        const selectedChangeTypes = input.body.amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.changeTypes ?? [];
        const technicalData = input.body.amendmentData?.nonFinChangeAmendmentData.technicalData;

        personalDataChangeTypeArr.push('taxResidence', 'registrationCountry');

        if (selectedChangeTypes.some(type => [changeTypes.policyHolderPersonalDataEdit, changeTypes.insuredPersonPersonalDataEdit].includes(type)) && !isComplienceInquirieIssued) {
            personalDataChangeTypeArr.forEach(type => {
                const propertiesToCheck = compliencePropertiesDataExtractor[type];

                if (propertiesToCheck?.(technicalData)) {
                    validationErrors.push({
                        errorCode: 'ComplianceAgreementIsNeeding',
                        reference: {
                            context: compliencePropertyTranslations[type]
                        }
                    });
                }
            });

            if (technicalData.isPublicOfficial) {
                validationErrors.push({
                    errorCode: 'ClientIsPublicOfficial'
                });
            }
        }
    },

    setAmendmentAccumulatedPolicyData: function (amendmentBody, policyBody) {
        amendmentBody.basicAmendmentConditions.policyData = {};
        amendmentBody.basicAmendmentConditions.policyData.policyProductGroup = policyBody.mainInsuranceConditions.insuranceProduct.productGroup;
        amendmentBody.basicAmendmentConditions.policyData.insuranceProductName = policyBody.mainInsuranceConditions.insuranceProduct.productDescription;
        amendmentBody.basicAmendmentConditions.policyData.policyHolderFullName = policyBody.policyHolder.partyData.partyFullName;
        amendmentBody.basicAmendmentConditions.policyData.policyIssueDate = policyBody.basicConditions.issueDate;
        amendmentBody.basicAmendmentConditions.policyData.policyStartDate = policyBody.policyTerms.startDate;
        amendmentBody.basicAmendmentConditions.policyData.policyEndDate = policyBody.policyTerms.endDate;
        amendmentBody.basicAmendmentConditions.policyData.contractCurrencyName = policyBody.basicConditions.currency.currencyDesc;

        return amendmentBody;
    },

    productGroups: {
        accident: "НС",
        endowment: "НСЖ",
        credit: "КСЖ",
        equity: "ДСЖ",
        investment: "ИСЖ",
        med: "ДМС",
        risk: "РСЖ"
    }
};
