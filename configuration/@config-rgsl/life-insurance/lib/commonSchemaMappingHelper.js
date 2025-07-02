'use strict';

const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const confCorp = require('@config-rgsl/life-insurance/lib/productConfigurationCorp');
const { businessRules } = require('@adinsure/runtime');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');

module.exports = {

    generateContext: function (input, self) {

        const isCollectivePolicy = self?.businessContext?.configurationCodeName == lifeInsuranceConstants.productCode.CollectiveLifeInsurancePolicy;
        const dimensions = self?.businessContext?.configurationDimensions;
        const amendmentType = dimensions?.amendmentType;
        const productConfOnAmendmentDate = input.amendmentData?.finChangeAmendmentData?.mainAttributes?.productConfOnAmendmentDate;

        let productConfDate = undefined;

        if (!productConfOnAmendmentDate) {

            productConfDate = input.basicConditions?.issueDate ?? dateUtils.newDateAsString();
        }
        else {

            productConfDate = input.amendmentData?.finChangeAmendmentData?.mainAttributes?.amendmentIssueDate ?? dateUtils.newDateAsString();
        }

        let amendmentValidFrom = undefined;

        if (amendmentType === changeAmendmentTypes.financialChange) {

            amendmentValidFrom = input.amendmentData?.finChangeAmendmentData?.mainAttributes?.amendmentEffectiveDate;
        }
        else if (amendmentType === changeAmendmentTypes.nonFinancialChange) {

            amendmentValidFrom = input.amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.amendmentEffectiveDate;
        }
        else {

            amendmentValidFrom = getValue(input, 'amendmentData.basicAmendmentConditions.validFrom');
        }

        const productCode = getValue(input, 'mainInsuranceConditions.insuranceProduct.productCode');
        const startDate = getValue(input, 'policyTerms.startDate', dateUtils.newDateAsString());
        const endDate = getValue(input, 'policyTerms.endDate', dateUtils.newDateAsString());
        const issueDate = getValue(input, 'basicConditions.issueDate', dateUtils.newDateAsString());
        const insuranceTermsByDates = dateUtils.getYearDifference(startDate, endDate) + 1;
        const productConf = isCollectivePolicy ? confCorp({ productCode, issueDate: productConfDate }) : input.productConfiguration;
        const isHardcoreDeletedRisk = getValue(input, 'riskConditions.isHardcoreDeletedRisk', false);
        const restoreAllRisks = getValue(input, 'riskConditions.restoreAllRisks', false);
        const correctionWithoutCalc = input?.risksCorrection?.correctionWithoutCalc ?? false;
        const insuranceTermsDays = input?.insuranceTermsDays;
        const sportTypes = input?.sportTypes;

        // policyHolder
        let phCitizenship = getValue(input, 'policyHolder.partyData.partyBody.partyPersonData.citizenship');
        phCitizenship = phCitizenship && phCitizenship.length > 0 && phCitizenship[0];
        const phDateOfBirth = getValue(input, 'policyHolder.partyData.partyBody.partyPersonData.dateOfBirth');
        const phAgeOnStartDate = dateUtils.getYearDifference(phDateOfBirth, startDate);
        const phAgeOnEndDate = dateUtils.getYearDifference(phDateOfBirth, endDate);
        const phAgeOnIssueDate = dateUtils.getYearDifference(phDateOfBirth, issueDate);

        // insured person
        const insuredDateOfBirth = getValue(input, 'insuredPerson.partyData.partyBody.partyPersonData.dateOfBirth');
        const insuredAgeOnStartDate = dateUtils.getYearDifference(insuredDateOfBirth, startDate);
        const insuredAgeOnEndDate = dateUtils.getYearDifference(insuredDateOfBirth, endDate);
        const insuredAgeOnIssueDate = dateUtils.getYearDifference(insuredDateOfBirth, issueDate);
        const IsInsuredPolicyHolder = getValue(input, 'insuredPerson.isPolicyHolder');

        // agent
        const partnerCode = getValue(input, 'mainInsuranceConditions.partner.partnerCode');
        const partner = getValue(input, 'mainInsuranceConditions.partner', {});

        const paymentPeriodEnd = input.paymentPlan
            && (input.paymentPlan.length > 0)
            && input.paymentPlan[input.paymentPlan.length - 1]
            && input.paymentPlan[input.paymentPlan.length - 1].paymentPeriodEnd;
        const installmentsAmount = input.paymentPlan
            && (input.paymentPlan.length > 0)
            && input.paymentPlan.length;

        // prefixes
        const currencyCode = getValue(input, 'basicConditions.currency.currencyCode');
        const prefix = productConf?.prefix;
        const prefixByStrategy = productConf?.prefixByStrategy;

        // premiums
        const riskPremiumAll = this.getRiskPremiumAll(input);
        const riskPremium = input.basicConditions?.riskPremium || riskPremiumAll;

        // investment parameters
        const investmentFrequency = input.additionalInvestmentParameters?.rateOfReturnEquityActives?.investmentFrequency;

        return {
            issueDate: issueDate,
            effectiveDate: getValue(input, 'policyTerms.effectiveDate'),
            startDate: getValue(input, 'policyTerms.startDate'),
            endDate: getValue(input, 'policyTerms.endDate'),
            productCode,
            productPrefix: prefix ? prefix[currencyCode] : undefined,
            productPrefixByStrategy: prefixByStrategy ? prefixByStrategy[currencyCode] : undefined,
            productStrategyCode: getValue(input, 'basicInvestmentParameters.investmentStrategy.investmentStrategyCode'),
            ph: getValue(input, 'policyHolder.partyData'),
            phPartyCode: getValue(input, 'policyHolder.partyData.partyCode'),
            phPartyId: getValue(input, 'policyHolder.partyData.partyId'),
            phCitizenship,
            phAgeOnStartDate,
            phAgeOnEndDate,
            phAgeOnIssueDate,
            phGender: getValue(input, 'policyHolder.partyData.partyBody.partyPersonData.personGender'),
            phPartyType: getValue(input, 'policyHolder.partyData.partyType'),
            insuredGender: getValue(input, 'insuredPerson.partyData.partyBody.partyPersonData.personGender'),
            insuredAgeOnStartDate,
            insuredAgeOnEndDate,
            insuredAgeOnIssueDate,
            IsInsuredPolicyHolder,
            ip: input.insuredPerson?.partyData,
            ipPartyId: getValue(input, 'insuredPerson.partyData.partyId'),
            ipPartyCode: getValue(input, 'insuredPerson.partyData.partyCode'),
            isCreatedByOperations: getValue(input, 'technicalInformation.isCreatedByOperations', false),
            beneficiaries: getValue(input, 'beneficiaries.beneficiaries'),
            risks: getValue(input, 'risks'),
            allRisks: getValue(input, 'technicalInformation.allRisks'),
            initiatorName: getValue(input, 'initiator.partyFullName'),
            initiatorOrganisationUnitName: getValue(input, 'initiator.organisationUnitName'),
            initiatorOrganisationUnitCode: getValue(input, 'initiator.organisationUnitCode'),
            initiatorUserId: getValue(input, 'initiator.userId'),
            initiatorEmployeeCode: getValue(input, 'initiator.employeeCode'),
            initiatorIsDBO: getValue(input, 'initiator.isDBO', false),
            paymentFrequencyDescription: getValue(input, 'basicConditions.paymentFrequency.paymentFrequencyDescription'),
            paymentFrequencyCode: getValue(input, 'basicConditions.paymentFrequency.paymentFrequencyCode'),
            riskPremiumAll,
            riskPremium,
            riskInsuredSum: getValue(input, 'basicConditions.riskInsuredSum'),
            calcFromInsuredSum: getValue(input, 'basicConditions.calcFromInsuredSum', false),
            currency: getValue(input, 'basicConditions.currency'),
            paymentPeriodEnd,
            paymentPlan: getValue(input, 'paymentPlan', []),
            agentCode: partnerCode,
            partner: partner,
            installmentsAmount,
            insuranceTerms: getValue(input, 'basicConditions.insuranceTerms', insuranceTermsByDates),
            insuranceTermsDays: getValue(input, 'basicConditions.insuranceTermsDays', insuranceTermsDays),
            sportTypes: getValue(input, 'basicConditions.sportTypes', sportTypes),
            manualCorrection: getValue(input, 'risksCorrection.manualCorrection'),
            manualRiskDeletion: getValue(input, 'risksCorrection.manualRiskDeletion', false),
            correctionWithoutCalc: correctionWithoutCalc,
            contractType: getValue(self, 'businessContext.configurationDimensions.contractType'),
            amendmentType,
            sequenceNumber: getValue(self, 'businessContext.sequenceNumber'),
            configurationCodeName: getValue(self, 'businessContext.configurationCodeName'),
            amendmentValidFrom,
            amendmentReason: getValue(input, 'amendmentData.basicAmendmentConditions.amendmentReason'),
            creditSum: getValue(input, 'creditContract.creditSum'),
            creditSumNet: getValue(input, 'creditContract.creditSumNet'),
            annuityPaymentSum: getValue(input, 'creditContract.annuityPaymentSum'),
            creditRate: getValue(input, 'creditContract.creditRate'),
            creditProgramId: getValue(input, 'creditProgram.creditProgramId'),
            isReinvest: getValue(input, 'basicConditions.isReinvest', false),
            isSpecialOffer: getValue(input, 'basicConditions.isSpecialOffer', false),
            issueFormCode: getValue(input, 'issueForm.code.issueFormCode'),
            externalContractId: getValue(input, 'creditProgram.externalContractId'),
            percentRateImpact: getValue(input, 'creditProgram.percentRateImpact'),
            surrenderValues: getValue(input, 'surrenderValues', []),
            additionalServices: getValue(input, 'additionalServices', []),
            isHardcoreDeletedRisk,
            restoreAllRisks,
            futureContractNumber: getValue(input, 'technicalInformation.futureContractNumber'),
            isNeedGenerateFutureNumber: getValue(input, 'technicalInformation.isNeedGenerateFutureNumber'),
            isCollectivePolicy,
            participationCoeff: getValue(input, 'basicInvestmentParameters.participationCoeff', 0),
            intialShare: input.basicInvestmentParameters?.intialShare ?? 0,
            fixRate: getValue(input, 'basicInvestmentParameters.fixRate', 0),
            rateOfReturn: getValue(input, 'basicInvestmentParameters.rateOfReturn', 0),
            rateOfReturnManualRate: getValue(input, 'basicInvestmentParameters.rateOfReturnManualRate', 0),
            variant: getValue(input, 'basicInvestmentParameters.variant', 0),
            cashback: getValue(input, 'basicInvestmentParameters.cashback', 0),
            isEvaluationContract: getValue(input, 'basicConditions.isEvaluationContract', false),
            amateurSportOption: getValue(input, 'amateurSportCondition.amateurSportOption', false),
            investmentFrequency,
            productConfigurationData: productConf,
        };
    },

    getRiskPremiumAll: function(body) {

        const paymentPlan = getValue(body, 'paymentPlan', []);

        if (paymentPlan.length == 0) {

            return undefined;
        }

        const firstPaymentSum = paymentPlan[0].paymentSum;

        if (paymentPlan.length < 3) {

            return firstPaymentSum;
        }

        if (dateUtils.addDays(paymentPlan[0].paymentExpirationDate, 15) > paymentPlan[0].paymentPeriodEnd) {
            return firstPaymentSum + paymentPlan[1].paymentSum + paymentPlan[2].paymentSum;
        }

        return firstPaymentSum;
    },

    generateCommonBody: function (input, self) {

        const context = this.generateContext(input, self);

        const commonBody = {
            attributes: {
                productPrefix: context.productPrefix,
                productPrefixByStrategy: context.productPrefixByStrategy,
                productStrategyCode: context.productStrategyCode,
                isCreatedByOperations: context.isCreatedByOperations,
                initiatorName: context.initiatorName,
                initiatorOrganisationUnitName: context.initiatorOrganisationUnitName,
                initiatorIsDBO: context.initiatorIsDBO,
                contractIssueDate: context.issueDate,
                creditProgramId: context.creditProgramId,
                isReinvest: context.isReinvest,
                issueFormCode: context.issueFormCode,
                externalContractId: context.externalContractId,
                percentRateImpact: context.percentRateImpact,
                partner: context.partner,
                additionalServices: context.additionalServices,
                isHardcoreDeletedRisk: context.isHardcoreDeletedRisk,
                restoreAllRisks: context.restoreAllRisks,
                riskPremiumAll: context.riskPremiumAll,
                riskPremium: context.riskPremium,
                futureContractNumber: context.futureContractNumber,
                isNeedGenerateFutureNumber: context.isNeedGenerateFutureNumber,
                participationCoeff: context.participationCoeff,
                intialShare: context.intialShare,
                fixRate: context.fixRate,
                rateOfReturn: context.rateOfReturn,
                rateOfReturnManualRate: context.rateOfReturnManualRate,
                variant: context.variant,
                cashback: context.cashback,
                isEvaluationContract: context.isEvaluationContract,
                investmentFrequency: context.investmentFrequency,
                productConfigurationData: context.productConfigurationData,
                isSpecialOffer: context.isSpecialOffer
            },
            requestDate: context.effectiveDate,
            startDate: context.startDate,
            endDate: context.endDate,
            issueDate: context.issueDate,
            validFrom: context.effectiveDate,
            productCode: context.productCode,
            ...this.getParties(context),
            ...this.getOrganisation(context),
            ...this.getObjects(context),
            ...this.getPayment(context),
            ...this.getPaymentPlan(context),
            ...this.getItems(context),
            ...this.getCancellationInputs(context)
        };

        if (context.contractType == 'Amendment') {

            Object.assign(commonBody, this.getAmendment(context));

            if (context.amendmentType == 'Cancellation') {

                Object.assign(commonBody, this.getCancellation(context));
            }

            if (context.amendmentType == 'FinancialChange') {

                commonBody.amendment.attributes.productConfOnAmendmentDate = input.amendmentData?.finChangeAmendmentData?.
                    mainAttributes?.productConfOnAmendmentDate ?? false;
            }
        }

        return commonBody;
    },

    getParties: function (context) {

        const partiesObject = {
            parties: {
                holder: {
                    personId: context.phPartyId,
                    personCode: context.phPartyCode,
                    attributes: {
                        citizenshipCode: context.phCitizenship,
                        policyHolderStartingAge: context.phAgeOnStartDate,
                        policyHolderPartyType: context.phPartyType
                    }
                },
                insuredPersons: [
                    {
                        personId: context.ipPartyId,
                        personCode: context.ipPartyCode,
                        attributes: {

                        }
                    }
                ],
                beneficiaries: [],
                otherParties: [
                    {
                        personId: context.phPartyId,
                        personCode: context.phPartyCode,
                        roleCode: 'Payer',
                        attributes: {
                            validFrom: context.startDate,
                            validTo: context.endDate,
                            paymentType: 'Transfer',
                            percentage: 100,
                            firstInstallmentDueDate: context.startDate,
                            dueDay: new Date(context.startDate).getDate(),
                        }
                    }
                ]
            }
        };

        if (context.beneficiaries && context.beneficiaries.length > 0)
        { context.beneficiaries.forEach((b, idx) => {
            partiesObject.parties.beneficiaries.push(
                {
                    beneficiaryId: b.beneficiaryId,
                    partyFullName: b.partyFullName,
                    dateOfBirth: b.dateOfBirth,
                    personGender: b.personGender,
                    relationType: b.relationType,
                    share: b.share,
                    priority: idx,
                    attributes: {},
                    itemRefs: [],
                    externalDocumentNumber: undefined,
                    riskCode: undefined,
                    sumInsured: undefined,
                    description: b.relationType // Can't be null in platform (PAS.P_DESCR_BENEFICIARY_SAT)
                });
        }); }

        return partiesObject;
    },

    getOrganisation: function (context) {
        return {
            organisation: {
                organisationalUnit: context.initiatorOrganisationUnitCode,
                policyAdministrator: context.initiatorUserId,
                salesResponsible: context.initiatorEmployeeCode,
                salesInitial: context.initiatorEmployeeCode
            }
        };
    },

    getObjects: function (context) {
        if (context.isCollectivePolicy) {
            return {
                objects: [
                    {
                        id: context.phPartyId,
                        code: context.phPartyCode,
                        type: context.ph?.partyType,
                        description: context.ph?.partyFullName,
                        startDate: context.startDate,
                        endDate: context.endDate,
                        isObjectGroup: false,
                        attributes: {
                            birthDate: getValue(context, 'ph.partyBody.partyPersonData.dateOfBirth'),
                            gender: getValue(context, 'ph.partyBody.partyPersonData.personGender'),
                            occupation: undefined,
                            smoker: undefined,
                            startingAge: context.phAgeOnStartDate,
                            insuredAge: undefined, // context.insuredAgeOnStartDate,
                            insuredPerson: undefined, // context.ipPartyCode
                        }
                    }
                ]
            };
        }

        return {
            objects: [
                {
                    id: context.ipPartyId,
                    code: context.ipPartyCode,
                    type: context.ip?.partyType,
                    description: context.ip?.partyFullName,
                    startDate: context.startDate,
                    endDate: context.endDate,
                    isObjectGroup: false,
                    attributes: {
                        birthDate: getValue(context, 'ph.partyBody.partyPersonData.dateOfBirth'),
                        gender: getValue(context, 'ph.partyBody.partyPersonData.personGender'),
                        occupation: undefined,
                        smoker: undefined,
                        startingAge: context.phAgeOnStartDate,
                        insuredAge: context.insuredAgeOnStartDate,
                        insuredPerson: context.ipPartyCode
                    }
                }
            ]
        };
    },

    getPayment: function (context) {
        return {
            payment: {
                paymentFrequency: context.paymentFrequencyCode,
                itemPremiumPrecision: 2,
                itemCoveragePrecision: 2,
                requiredInstallment: {
                    amount: context.riskPremium
                }
            }
        };
    },

    getPaymentPlan: function (context) {
        return {
            paymentPlan: {
                manual: context.paymentPlan.map(pp => {
                    return {
                        dueDate: pp.paymentPeriodStart,
                        amount: pp.paymentSum,
                        payerCode: pp.partyCode,
                        agentCode: context.agentCode,
                        paymentType: 'Transfer',
                        paymentPeriodStart: pp.paymentPeriodStart,
                        paymentPeriodEnd: pp.paymentPeriodEnd
                    };
                })
            }
        };
    },

    getItems: function (context) {

        const tariffConstants = businessRules.getRuleByVersion('TariffConstantsRule', 1).rule;
        const tariffCode = context.isCollectivePolicy ? 'CollectivePolicyTariff' : tariffConstants({ productCode: context.productCode }).result.tariffCode;

        return {
            items: [
                {
                    id: "1",
                    description: 'life-insurance',
                    tariffCode,
                    tariffDate: context.effectiveDate,
                    startDate: context.startDate,
                    endDate: context.endDate,
                    paymentEndDate: context.paymentPeriodEnd,
                    objectRef: context.isCollectivePolicy ? context.phPartyId : context.ipPartyId,
                    changed: undefined,
                    attributes: {
                        productCode: context.productCode,
                        term: context.insuranceTerms,
                        paymentFrequency: context.paymentFrequencyCode,
                        currency: context.currency.currencyCode,
                        insuredPersonId: context.phPartyId,
                        policyHolderId: context.phPartyId,
                        risks: context.risks,
                        allRisks: context.allRisks,
                        installmentAmount: context.riskPremium,
                        insuredSumAmount: context.riskInsuredSum,
                        calcFromInsuredSum: context.calcFromInsuredSum,
                        phGender: context.phGender,
                        phAgeOnStartDate: context.phAgeOnStartDate,
                        phAgeOnEndDate: context.phAgeOnEndDate,
                        phAgeOnIssueDate: context.phAgeOnIssueDate,
                        insuredGender: context.insuredGender,
                        insuredAgeOnStartDate: context.insuredAgeOnStartDate,
                        insuredAgeOnEndDate: context.insuredAgeOnEndDate,
                        insuredAgeOnIssueDate: context.insuredAgeOnIssueDate,
                        IsInsuredPolicyHolder: context.IsInsuredPolicyHolder,
                        paymentPlan: context.paymentPlan,
                        manualCorrection: context.manualCorrection,
                        manualRiskDeletion: context.manualRiskDeletion,
                        creditSum: context.creditSum,
                        creditSumNet: context.creditSumNet,
                        annuityPaymentSum: context.annuityPaymentSum,
                        creditRate: context.creditRate,
                        creditProgramId: context.creditProgramId,
                        externalContractId: context.externalContractId,
                        percentRateImpact: context.percentRateImpact,
                        surrenderValues: context.surrenderValues,
                        additionalServices: context.additionalServices,
                        amateurSportOption: context.amateurSportOption,
                        correctionWithoutCalc: context.correctionWithoutCalc,
                        insuranceTermsDays: context.insuranceTermsDays,
                        sportTypes: context.sportTypes,
                    }
                }
            ]
        };
    },

    getCancellationInputs: function (context) {
        return {
            cancellationInputs: {
                freeLookPeriodEndDate: undefined,
                gracePeriod: undefined,
                canAutomaticallyCancel: undefined
            }
        };
    },

    getAmendment: function (context) {
        return {
            amendment: {
                reasonCode: context.configurationCodeName,
                attributes: {
                    amendmentReason: context.amendmentReason,
                    validFrom: context.amendmentValidFrom,
                    contractType: context.contractType,
                    amendmentType: context.amendmentType
                }
            }
        };
    },

    getCancellation: function (context) {
        return {
            cancellation: {
                cancellationReason: context.amendmentReason,
                validFrom: context.amendmentValidFrom
            }
        };
    }
};
