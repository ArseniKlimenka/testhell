'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const guidHelper = require("@config-rgsl/infrastructure/lib/GuidHelper");
const mappingHelper = require('@config-rgsl/life-insurance/lib/commonSchemaMappingHelper');

module.exports = {

    getContractSat: function ({
        body,
        originalDocumentNumber,
        stateCode,
    }) {
        const startDate = getValue(body, 'policyTerms.startDate');
        const endDate = getValue(body, 'policyTerms.endDate');
        const issueDate = getValue(body, 'basicConditions.issueDate');
        const paymentStartDate = body.policyTerms?.paymentPeriodStartDate;
        const paymentEndDate = body.policyTerms?.paymentPeriodEndDate;
        const phCode = getValue(body, 'policyHolder.partyData.partyCode');
        const phName = getValue(body, 'policyHolder.partyData.partyFullName');
        const phDateOfBirth = getValue(body, 'policyHolder.partyData.partyBody.partyPersonData.dateOfBirth');
        const phAgeOnStartDate = (startDate && phDateOfBirth) ? DateTimeUtils.getYearDifference(phDateOfBirth, startDate) : undefined;
        const ipCode = getValue(body, 'insuredPerson.partyData.partyCode');
        const ipName = getValue(body, 'insuredPerson.partyData.partyFullName');
        const partnerCode = getValue(body, 'mainInsuranceConditions.partner.partnerCode');
        const partnerName = getValue(body, 'mainInsuranceConditions.partner.partnerDescription');
        const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
        const paymentFrequencyCode = getValue(body, 'basicConditions.paymentFrequency.paymentFrequencyCode');
        const guaranteedIncomeCode = getValue(body, 'basicConditions.guaranteedIncome.guaranteedIncomeCode');
        const currencyCode = getValue(body, 'basicConditions.currency.currencyCode');
        const insuranceTerms = getValue(body, 'basicConditions.insuranceTerms');
        const isReinvest = getValue(body, 'basicConditions.isReinvest');
        const isMigrated = body.migrationAttributes?.isMigrated;
        const isManual = body.migrationAttributes?.isManual;
        const riskPremiumAll = mappingHelper.getRiskPremiumAll(body);
        const riskPremium = body.basicConditions?.riskPremium || riskPremiumAll;
        const initiatorUserName = getValue(body, 'initiator.userName');
        const initiatorEmployeeCode = getValue(body, 'initiator.employeeCode');
        const initiatorOrgUnitCode = getValue(body, 'initiator.organisationUnitCode');
        const initiatorIsDBO = Boolean(getValue(body, 'initiator.isDBO'));
        const purchaseDate = getValue(body, 'basicInvestmentParameters.purchaseDate');
        const isHeritors = Boolean(getValue(body, 'beneficiaries.isHeritors'));
        const isNotHeritors = Boolean(getValue(body, 'beneficiaries.isNotHeritors'));
        const beneficiarySpecialConditions = getValue(body, 'beneficiaries.specialConditions');
        const invoiceOnActivation = body.basicConditions?.invoiceOnActivation ?? false;
        const issueFormCode = getValue(body, 'issueForm.code.issueFormCode');
        const manualCorrection = getValue(body, 'risksCorrection.manualCorrection');
        const phEmails = getValue(body, 'policyHolder.partyData.partyBody.partyEmails', []);
        const phEmail = phEmails.length > 0 && phEmails[0].email || '';
        const ipEmails = getValue(body, 'insuredPerson.partyData.partyBody.partyEmails', []);
        const ipEmail = ipEmails.length > 0 && ipEmails[0].email || '';
        const creditSum = getValue(body, 'creditContract.creditSum');
        const creditSumNet = getValue(body, 'creditContract.creditSumNet');
        const creditRate = getValue(body, 'creditContract.creditRate');
        const annuityPaymentSum = getValue(body, 'creditContract.annuityPaymentSum');
        const creditProgramId = getValue(body, 'creditProgram.creditProgramId');
        const investmentStrategyDescriptionFull = body.basicInvestmentParameters?.investmentStrategyDescriptionFull;
        const variantCode = body.basicInvestmentParameters?.variant?.variantCode;
        const rateOfReturn = body.basicInvestmentParameters?.rateOfReturn;
        const cashback = body.basicInvestmentParameters?.cashback;
        const manualRule = body.commission?.manualRule;

        return [{
            CONTRACT_NUMBER: originalDocumentNumber,
            STATE: stateCode,
            ISSUE_DATE: issueDate,
            START_DATE: startDate,
            END_DATE: endDate,
            PAYMENT_START_DATE: paymentStartDate,
            PAYMENT_END_DATE: paymentEndDate,
            HOLDER_CODE: phCode,
            HOLDER_NAME: phName,
            HOLDER_BIRTH_DATE: phDateOfBirth,
            HOLDER_AGE: phAgeOnStartDate,
            INSURED_CODE: ipCode,
            INSURED_NAME: ipName,
            PARTNER_CODE: partnerCode,
            PARTNER_NAME: partnerName,
            PRODUCT_CODE: productCode,
            PAYMENT_FREQUENCY_CODE: paymentFrequencyCode,
            GUARANTEE_INCOME_CODE: guaranteedIncomeCode,
            CURRENCY_CODE: currencyCode,
            INSURANCE_TERMS: insuranceTerms,
            IS_REINVEST: isReinvest,
            IS_MIGRATED: isMigrated,
            IS_MANUAL: isManual,
            RISK_PREMIUM: riskPremium,
            INITIATOR_USERNAME: initiatorUserName,
            INITIATOR_EMPLOYEE_CODE: initiatorEmployeeCode,
            INITIATOR_ORGUNIT_CODE: initiatorOrgUnitCode,
            INITIATOR_IS_DBO: initiatorIsDBO,
            PURCHASE_DATE: purchaseDate,
            INVOICE_ON_ACTIVATION: invoiceOnActivation,
            IS_HERITORS: isHeritors,
            IS_NOT_HERITORS: isNotHeritors,
            BENEFICIARY_SPEC_CONDITIONS: beneficiarySpecialConditions,
            ISSUE_FORM_CODE: issueFormCode,
            RISKS_MANUAL_CORRECTION: manualCorrection,
            RISK_PREMIUM_ALL: riskPremiumAll,
            HOLDER_EMAIL: phEmail,
            INSURED_EMAIL: ipEmail,
            CREDIT_SUM: creditSum,
            CREDIT_SUM_NET: creditSumNet,
            CREDIT_RATE: creditRate,
            ANNUITY_PAYMENT_SUM: annuityPaymentSum,
            CREDIT_PROGRAM_ID: creditProgramId,
            EXCHANGE_RATE: body.basicConditions?.exchangeRate,
            IS_EVALUATION_CTR: body.basicConditions?.isEvaluationContract ?? false,
            STRATEGY_DESCRIPTION_FULL: investmentStrategyDescriptionFull,
            VARIANT_CODE: variantCode,
            RATE_OF_RETURN: rateOfReturn,
            CASHBACK: cashback,
            MANUAL_RULE: manualRule
        }];

    },

    getContractRisksSat: function ({
        body,
        originalDocumentNumber,
    }) {

        const result = [{
            $deleted: true,
            CONTRACT_NUMBER: originalDocumentNumber,
        }];

        if (body.risks && body.risks.length > 0) {
            body.risks.map(risk => {

                const riskCode = getValue(risk, 'risk.riskCode');
                const startDate = getValue(risk, 'startDate');
                const endDate = getValue(risk, 'endDate');
                const riskPremium = round(getValue(risk, 'riskPremium'), 2);
                const riskInsuredSum = round(getValue(risk, 'riskInsuredSum'), 2);
                const riskInsuredSumWithoutCashBack = round(getValue(risk, 'riskInsuredSumWithoutCashBack'), 2);

                result.push({
                    CONTRACT_NUMBER: originalDocumentNumber,
                    RISK_CODE: riskCode,
                    START_DATE: startDate,
                    END_DATE: endDate,
                    PREMIUM: riskPremium,
                    INSURED_SUM: riskInsuredSum,
                    INSURED_SUM_WITHOUT_CASHBACK: riskInsuredSumWithoutCashBack
                });

            });
        }

        return result;

    },

    getBeneficiarySat: function ({
        body,
        originalDocumentNumber,
    }) {

        const result = [{
            $deleted: true,
            CONTRACT_NUMBER: originalDocumentNumber,
        }];

        const isNotHeritors = Boolean(getValue(body, 'beneficiaries.isNotHeritors'));

        if (isNotHeritors &&
            body.beneficiaries &&
            body.beneficiaries.beneficiaries &&
            body.beneficiaries.beneficiaries.length > 0) {

            body.beneficiaries.beneficiaries.map(beneficiary => {

                const beneficiaryId = getValue(beneficiary, 'beneficiaryId');
                const beneficiaryFullName = getValue(beneficiary, 'partyFullName');
                const dateOfBirth = getValue(beneficiary, 'dateOfBirth');
                const personGender = getValue(beneficiary, 'personGender');
                const relationType = getValue(beneficiary, 'relationType');
                const share = getValue(beneficiary, 'share');

                result.push({
                    CONTRACT_NUMBER: originalDocumentNumber,
                    BENEFICIARY_ID: beneficiaryId,
                    FULL_NAME: beneficiaryFullName,
                    DATE_OF_BIRTH: dateOfBirth,
                    PERSON_GENDER: personGender,
                    SHARE: share,
                    RELATION_TYPE: relationType
                });

            });
        }

        return result;

    },

    getAdditionalBeneficiarySat: function ({
        body,
        originalDocumentNumber
    }) {

        const result = [{
            $deleted: true,
            CONTRACT_NUMBER: originalDocumentNumber,
        }];

        if (
            body?.additionalBeneficiaries?.length > 0) {

            body.additionalBeneficiaries.map(beneficiary => {

                const beneficiaryId = getValue(beneficiary, 'beneficiaryId');
                const beneficiaryFullName = getValue(beneficiary, 'partyFullName');
                const dateOfBirth = getValue(beneficiary, 'dateOfBirth');
                const personGender = getValue(beneficiary, 'personGender');
                const relationType = getValue(beneficiary, 'relationType');
                const share = getValue(beneficiary, 'share');
                const riskCode = getValue(beneficiary, 'risk.code');

                result.push({
                    CONTRACT_NUMBER: originalDocumentNumber,
                    BENEFICIARY_ID: beneficiaryId,
                    FULL_NAME: beneficiaryFullName,
                    DATE_OF_BIRTH: dateOfBirth,
                    PERSON_GENDER: personGender,
                    SHARE: share,
                    RELATION_TYPE: relationType,
                    RISK_CODE: riskCode
                });
            });
        }

        return result;

    },

    getAmendmentSat: function ({
        number,
        body,
        dimensions,
        state
    }) {

        const issueDate = getValue(body, 'basicAmendmentConditions.applicationSignDate');
        const validFrom = getValue(body, 'basicAmendmentConditions.validFrom');
        const amendmentReason = getValue(body, 'basicAmendmentConditions.amendmentReason');
        const amendmentType = getValue(dimensions, 'amendmentType');

        return [{
            AMENDMENT_NUMBER: number,
            STATE: state,
            ISSUE_DATE: issueDate,
            VALID_FROM: validFrom,
            AMENDMENT_TYPE: amendmentType,
            AMENDMENT_REASON: amendmentReason
        }];

    },

    getNonFinChangeCommonAmendmentSat: function ({
        number,
        body,
        dimensions,
        state
    }) {

        const issueDate = getValue(body, 'amendmentData.nonFinChangeAmendmentData.mainAttributes.amendmentIssueDate');
        const validFrom = getValue(body, 'amendmentData.nonFinChangeAmendmentData.mainAttributes.amendmentEffectiveDate');
        const amendmentReason = getValue(body, 'amendmentData.nonFinChangeAmendmentData.mainAttributes.changeReason');
        const amendmentType = getValue(dimensions, 'amendmentType');

        return [{
            AMENDMENT_NUMBER: number,
            STATE: state,
            ISSUE_DATE: issueDate,
            VALID_FROM: validFrom,
            AMENDMENT_TYPE: amendmentType,
            AMENDMENT_REASON: amendmentReason
        }];

    },

    getNonFinChangeAmendmentSat: function ({
        number,
        body,
    }) {

        const initiator = getValue(body, 'amendmentData.nonFinChangeAmendmentData.mainAttributes.initiator');
        const rejectionReason = getValue(body, 'amendmentData.nonFinChangeAmendmentData.amendmentInfo.rejectionReason');

        return [{
            AMENDMENT_NUMBER: number,
            INITIATOR_TYPE: initiator,
            REJECTION_REASON: rejectionReason
        }];

    },

    getAmendmentLinesSat: function ({
        number,
        body
    }) {

        const result = [{
            $deleted: true,
            AMENDMENT_NUMBER: number,
        }];

        const paymentLines = body?.paymentAmendmentConditions?.paymentLines ?? [];

        paymentLines.map(line => {

            const paymentLineType = getValue(line, 'paymentLineType');
            const paymentLineSum = round(getValue(line, 'paymentLineSum'), 2);
            const paymentLineSumInRub = round(getValue(line, 'paymentLineSumInRub'), 2);

            result.push({
                AMENDMENT_NUMBER: number,
                TYPE: paymentLineType,
                PAYMENT_SUM: paymentLineSum,
                PAYMENT_SUM_IN_RUB: paymentLineSumInRub,
            });
        });

        return result;
    },

    setCancellationRecipientData: function (body, number, result) {

        result['PAS_IMPL.CNL_RECIPIENT_SAT'] = [
            {
                $deleted: true,
                AMENDMENT_NUMBER: number
            }
        ];

        const recipients = body?.paymentAmendmentConditions?.canellationRecipients ?? [];

        recipients.forEach(item => {

            if (item.partyCode) {

                const currentLinks = result['PAS_IMPL.CNL_RECIPIENT_LINK'] ?? [];
                const existingLink = currentLinks.find(item => item.AMENDMENT_NUMBER === number && item.PARTY_CODE === item.partyCode);

                if (!existingLink) {

                    result['PAS_IMPL.CNL_RECIPIENT_LINK'] = [
                        {
                            AMENDMENT_NUMBER: number,
                            PARTY_CODE: item.partyCode
                        }
                    ];
                }

                result['PAS_IMPL.CNL_RECIPIENT_SAT'].push(
                    {
                        AMENDMENT_NUMBER: number,
                        PARTY_CODE: item.partyCode,
                        RECORD_ID: guidHelper.generate(),
                        REASON_CODE: item.recipientReason?.code,
                        REASON_DESCRIPTION: item.recipientReason?.description,
                        PAYMENT_TYPE_CODE: item.recipientPaymentType?.code,
                        PAYMENT_TYPE_DESCRIPTION: item.recipientPaymentType?.description,
                        AMOUNT_TO_PAY_PERCENTAGE: item.amountToPayPercetage,
                        AMOUNT_TO_PAY: item.amountToPay,
                        AMOUNT_TO_PAY_RUB_CUR: item.amountToPayInRubCurrency,
                        PIT_AMOUNT: item.pitAmount,
                        PIT_AMOUNT_RUB_CUR: item.pitAmountInRubCurrency,
                        IS_MANUAL_PIT: item.isManualPit ?? false,
                        BANK_ACCOUNT_NUMBER: item?.bankAccount?.number,
                        IS_PAID: item.isPaid ?? false,
                        ASSIGNED_PO_NUMBER: item.assignedPaymentOrderNumber,
                        ASSIGNED_PIT_PO_NUMBER: item.assignedPitPaymentOrderNumber
                    }
                );
            }
        });
    },

    getInvestmentSat: function ({
        body,
        originalDocumentNumber,
    }) {

        const basicInvestmentParameters = body.basicInvestmentParameters;
        const additionalInvestmentParameters = body.additionalInvestmentParameters;
        const rateOfReturnEquityActives = additionalInvestmentParameters?.rateOfReturnEquityActives;
        const commWithdrawalFunds = rateOfReturnEquityActives?.commWithdrawalFunds ?? {};

        const result = [{
            CONTRACT_NUMBER: originalDocumentNumber,
            STRATEGY_CODE: basicInvestmentParameters?.investmentStrategy?.investmentStrategyCode,
            STRATEGY_DESCRIPTION: basicInvestmentParameters?.investmentStrategy?.investmentStrategyDescription,
            RATE_OF_RETURN: basicInvestmentParameters?.rateOfReturn,
            RATE_OF_RETURN_MANUAL_RATE: basicInvestmentParameters?.rateOfReturnManualRate,
            VARIANT_CODE: basicInvestmentParameters?.variant?.variantCode,
            VARIANT_DESCRIPTION: basicInvestmentParameters?.variant?.variantDescription,
            STRATEGY_DESCRIPTION_FULL: basicInvestmentParameters?.investmentStrategyDescriptionFull,
            CASHBACK: basicInvestmentParameters?.cashback,
            PAYOFF_DESCRIPTION: basicInvestmentParameters?.payOffDescription,
            IS_MANUAL_SET_INV_PARAMS: basicInvestmentParameters?.isManualSetInvestmentParams,
            BASE_ACTIVE_DESCRIPTION: basicInvestmentParameters?.baseActiveDescription,
            PARTICIPATION_COEFF: basicInvestmentParameters?.participationCoeff,
            OPTION_PRICE: basicInvestmentParameters?.optionPrice,
            BARRIER: basicInvestmentParameters?.barrier,
            BARRIER_AUTO_CALL: basicInvestmentParameters?.barrierAutoCall,
            PARTICIPATION_COEFF_BY_PERIODS: basicInvestmentParameters?.participationCoeffByPeriods,
            PURCHASE_DATE: basicInvestmentParameters?.purchaseDate,
            EMITENT: basicInvestmentParameters?.emitent,
            FIX_RATE: basicInvestmentParameters?.fixRate,
            INITIAL_SHARE: basicInvestmentParameters?.intialShare,
            HEDGE_COST: basicInvestmentParameters?.hedgeCost,
            SPREAD_BA: basicInvestmentParameters?.spreadBA,
            PAY_OFF_SHORT_DESCRIPTION: basicInvestmentParameters?.payOffShortDescription,
            TOOL_TYPE: basicInvestmentParameters?.toolType,
            MEASURE_TOOL_NOMINAL: basicInvestmentParameters?.measureToolNominal,
            CALCULATING_AGENT: basicInvestmentParameters?.calculatingAgent,
            PRICE_OF_MEASURE_TOOL: basicInvestmentParameters?.priceOfMeasureTool,
            PART_OF_PREMIUM_FOR_TOOL: basicInvestmentParameters?.partOfPremiumForTool,
            DISCOUNT: basicInvestmentParameters?.discount,
            DISCHARGE_DATE: basicInvestmentParameters?.dischargeDate,
            DID_BEGIN_DATE: basicInvestmentParameters?.didBeginDate,
            DID_END_DATE: basicInvestmentParameters?.didEndDate,
            WINDOW_START_DATE: basicInvestmentParameters?.windowStartDate,
            WINDOW_START_END: basicInvestmentParameters?.windowEndDate,
            FUTURE_CONTRACT_NUMBER: body.technicalInformation?.futureContractNumber,
            AIP_MF_PROD_CONF: additionalInvestmentParameters?.mf,
            AIP_INVESTMENT_START_DATE: additionalInvestmentParameters?.investmentStartDate,
            AIP_INVESTMENT_END_DATE: additionalInvestmentParameters?.investmentEndDate,
            AIP_MANUAL_RATE: rateOfReturnEquityActives?.manualRate,
            AIP_INVESTMENT_FREQUENCY: rateOfReturnEquityActives?.investmentFrequency,
            AIP_MF: rateOfReturnEquityActives?.mf,
            AIP_COST_OPEN_CONTRACTS: rateOfReturnEquityActives?.costsOpenContracts,
            AIP_COMM_WITHDRAWAL_FUNDS_1: commWithdrawalFunds[1],
            AIP_COMM_WITHDRAWAL_FUNDS_2: commWithdrawalFunds[2],
            AIP_COMM_WITHDRAWAL_FUNDS_3: commWithdrawalFunds[3],
            AIP_COMM_WITHDRAWAL_FUNDS_4: commWithdrawalFunds[4],
            AIP_COMM_WITHDRAWAL_FUNDS_5: commWithdrawalFunds[5],
            AIP_RKO: rateOfReturnEquityActives?.rko,
            AIP_IS_STAND_CONTRACT_COND: rateOfReturnEquityActives?.isStandardContractConditions,
            AIP_IS_COORD_UD_REQUIRED: rateOfReturnEquityActives?.isCoordinationUDRequired,
        }];

        return result;
    },

    getCreatedFromPolicySat: function ({
        body,
        originalDocumentNumber,
    }) {

        const productDescription = getValue(body, 'mainInsuranceConditions.insuranceProduct.productDescription');
        const createdFromPolicy = getValue(body, 'technicalInformation.createdFromPolicy');
        const createdFromPolicyOriginal = getValue(body, 'technicalInformation.createdFromPolicyOriginal');

        if (createdFromPolicy || createdFromPolicyOriginal) {

            return [{
                CONTRACT_NUMBER: originalDocumentNumber,
                PRODUCT_DESCRIPTION: productDescription,
                CF_POLICY: createdFromPolicy,
                CF_POLICY_ORIGINAL: createdFromPolicyOriginal ?? createdFromPolicy,
            }];
        }

    },

    getAdditionalInitiatorsSat: function({
        body, originalDocumentNumber
    }) {
        let result = [];

        result = [
            {
                $deleted: true,
                CONTRACT_NUMBER: originalDocumentNumber
            }
        ];
        const additionalInitiators = body.additionalInitiators?.additionalInitiatorsLines ?? [];

        additionalInitiators.map((item) => {

            result.push(
                {
                    CONTRACT_NUMBER: originalDocumentNumber,
                    SERVICE_PROVIDER_CODE: item.agent.employeeCode,
                    USERNAME: item.agent.userName,
                    ORGUNIT_CODE: item.agent.partyCode,
                    INITIATOR_TYPE : item.agentType,
                    IS_DBO: item.isDBO,
                    SHARE: item.agentShare
                }
            );
        });

        return result;
    },

    getAdditionalInitiatorsLink: function ({
        body, originalDocumentNumber
    }) {
        const result = [];
        const additionalInitiators = body.additionalInitiators?.additionalInitiatorsLines ?? [];

        additionalInitiators.map((item) => {
            result.push(
                {
                    CONTRACT_NUMBER: originalDocumentNumber,
                    SERVICE_PROVIDER_CODE: item.agent.employeeCode
                }
            );
        });
        return result;
    },

    getAssetSat: function ({
        body, number
    }) {
        const result = [];
        const assets = body?.basicAssetProperties?.assetProperties ?? [];

        assets.map((item) => {
            result.push(
                {
                    CONTRACT_NUMBER: number,
                    ASSET_NUMBER: item?.asset?.assetNumber,
                    ASSET_UNITS_COUNT: body?.basicAssetProperties?.assetUnitsCountOnClient
                }
            );
        });
        return result;
    }

};
