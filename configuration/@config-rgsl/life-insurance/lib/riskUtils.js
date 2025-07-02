const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const riskEndDateHelper = require('@config-rgsl/life-insurance/lib/riskEndDateCalc');
const riskConditionsHelper = require('@config-rgsl/life-insurance/lib/riskConditions');
const riskStartDateHelper = require('@config-rgsl/life-insurance/lib/riskStartDateCalc');
const { riskPackagesConfiguration } = require('@config-rgsl/life-insurance/lib/riskPackagesConfiguration');
const { changeAmendmentTypes, changeTypes } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = {

    /**
     * @desc Determines context for all risks condition. This function simplifies condition functions
     * and gives the list of required properties for risks in one place.
     * @param {object} Document Body
     */
    getBodyContext: function (body, amendmentType) {

        const amendmentData = body.amendmentData?.finChangeAmendmentData;
        const effectiveDate = amendmentData?.mainAttributes?.amendmentEffectiveDate;

        const insuredBirthDate = objectUtils.getValue(body, 'insuredPerson.partyData.partyBody.partyPersonData.dateOfBirth');
        const phBirthDate = objectUtils.getValue(body, 'policyHolder.partyData.partyBody.partyPersonData.dateOfBirth');
        const contractIssueDate = objectUtils.getValue(body, 'basicConditions.issueDate');
        const contractSartDate = amendmentType === changeAmendmentTypes.financialChange ? effectiveDate : objectUtils.getValue(body, 'policyTerms.startDate');
        const contractEndDate = objectUtils.getValue(body, 'policyTerms.endDate');
        const insredAgeOnStartDate = dateUtils.getYearDifference(insuredBirthDate, contractIssueDate);
        const insredAgeOnEndDate = dateUtils.getYearDifference(insuredBirthDate, contractEndDate);
        const phAgeOnStartDate = dateUtils.getYearDifference(phBirthDate, contractIssueDate);
        const phAgeOnEndDate = dateUtils.getYearDifference(phBirthDate, contractEndDate);
        const paymentType = objectUtils.getValue(body, 'basicConditions.paymentFrequency.paymentFrequencyCode');
        const isInsuredPolicyHolder = objectUtils.getValue(body, 'insuredPerson.isPolicyHolder');
        const productCode = objectUtils.getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');
        const manualCorrection = objectUtils.getValue(body, 'risksCorrection.manualCorrection', false);
        const manualRiskDeletion = objectUtils.getValue(body, 'risksCorrection.manualRiskDeletion', false);
        const replaceDisabilityAnyReason = objectUtils.getValue(body, 'risksCorrection.replaceDisabilityAnyReason', false);
        const creditSumNet = objectUtils.getValue(body, 'creditContract.creditSumNet', 0);
        const creditProgramId = objectUtils.getValue(body, 'creditProgram.creditProgramId', '');
        const risksPackages = objectUtils.getValue(body, 'risksPackages', {});
        const isHardcoreDeletedRisk = objectUtils.getValue(body, 'mainInsuranceConditions.isHardcoreDeletedRisk', false);
        const restoreAllRisks = objectUtils.getValue(body, 'mainInsuranceConditions.restoreAllRisks', false);
        const risks = objectUtils.getValue(body, 'risks', []);
        const deletedRisks = objectUtils.getValue(body, 'mainInsuranceConditions.deletedRisks', []);
        const replaceDisabilityECOF = objectUtils.getValue(body, 'risksCorrection.replaceDisabilityECOF', false);
        const correctionWithoutCalc = body?.risksCorrection?.correctionWithoutCalc ?? false;

        const context = {
            insredAgeOnStartDate,
            insredAgeOnEndDate,
            phAgeOnStartDate,
            phAgeOnEndDate,
            contractIssueDate,
            contractSartDate,
            contractEndDate,
            paymentType,
            isInsuredPolicyHolder,
            productCode,
            manualCorrection,
            creditSumNet,
            creditProgramId,
            risksPackages,
            manualRiskDeletion,
            replaceDisabilityAnyReason,
            isHardcoreDeletedRisk,
            restoreAllRisks,
            risks,
            deletedRisks,
            replaceDisabilityECOF,
            correctionWithoutCalc
        };

        Object.keys(context).forEach(key => context[key] === undefined ? delete context[key] : {});

        return context;
    },

    /**
     * @desc Add all available risks to the Contract data, except those that have conditions
     * In case of conditions we need to check them first before the adding.
     * @param {object} Document Body
     */
    setRisks: function (body, risks) {

        const availablePackages = objectUtils.getValue(body, 'risksPackages.availablePackages', []);

        // check previous conditions
        const riskConditions = this.getBodyContext(body);
        const areConditionsChanged = !objectUtils.objectComparison(riskConditions, body.riskConditions);
        const previousRisks = objectUtils.deepCopy(body.risks);
        const isSelectedPackage = objectUtils.objectComparison(riskConditions.risksPackages?.selectedPackages, body.riskConditions?.risksPackages?.selectedPackages);
        const isCDHR = previousRisks?.some(item => item.risk.riskCode == 'CDP36404');
        const isVTB = lifeInsuranceConstants.productsCOF.includes(body?.mainInsuranceConditions?.insuranceProduct?.productCode);
        const threePackage = riskConditions.risksPackages?.selectedPackages?.some(item => ['ECOFPVTB3', 'ECOFVVTB3'].includes(item.packageCode));

        if (areConditionsChanged
            && isCDHR
            && isVTB
            && threePackage
            && isSelectedPackage) { return; }

        if (!areConditionsChanged) { return; }
        if (riskConditions.manualCorrection) {
            body.riskConditions.manualCorrection = true;
            return;
        }

        if (riskConditions.correctionWithoutCalc) {
            body.riskConditions.correctionWithoutCalc = true;
            return;
        }

        body.riskConditions = riskConditions;

        // clear all previously added risks to Body
        if (riskConditions.manualRiskDeletion) {
            body.technicalInformation.allRisks = [];

            // Удаляем удалённые дополнительные риски
            const risks = objectUtils.deepCopy(body.risks);
            body.risks = [];
            risks.forEach(r => {
                if (!availablePackages.find(a => a.packageCode == r.risk.riskCode)) {
                    body.risks.push(r);
                }
            });
        }
        else {
            if (!body.technicalInformation) { body.technicalInformation = {}; }
            body.technicalInformation.allRisks = [];
            body.risks = [];
        }

        if (risks.length == 0) { return; }

        risks.forEach(r => {
            let IsConditionPassed = true;
            const conditionFunctionName = objectUtils.getValue(r, 'resultData.conditionsFunction');
            const conditionFunctionReference = conditionFunctionName && objectUtils.getValue(riskConditionsHelper, conditionFunctionName);

            if (conditionFunctionReference) {
                IsConditionPassed = conditionFunctionReference(riskConditions);
            }

            if (IsConditionPassed) {

                const riskStartDateFunctionReference = conditionFunctionName && objectUtils.getValue(riskStartDateHelper, conditionFunctionName);
                const riskStartDate = riskStartDateFunctionReference ? riskStartDateFunctionReference(riskConditions) : riskConditions.contractSartDate;

                const riskEndDateFunctionReference = conditionFunctionName && objectUtils.getValue(riskEndDateHelper, conditionFunctionName);
                const riskEndDate = riskEndDateFunctionReference ? riskEndDateFunctionReference(riskConditions) : riskConditions.contractEndDate;

                const risk = {
                    risk:
                    {
                        riskShortDescription: r.resultData.riskShortDescription,
                        riskFullDescription: r.resultData.riskFullDescription,
                        riskCode: r.resultData.riskCode,
                        isLife: r.resultData.isLife,
                        withoutProduct: r.resultData.withoutProduct ?? false,
                        conditionsFunction: r.resultData.conditionsFunction || '',
                        riskOrder: r.resultData.riskOrder,
                        riskProgram: r.resultData.riskProgram,
                        riskPerson: r.resultData.riskPerson,
                        risksGroup: r.resultData.risksGroup
                    },
                    replacementInfo:
                    {
                        isReplaceable: r.resultData.isReplaceable,
                        parentRiskCode: r.resultData.riskCode
                    },
                    startDate: riskStartDate,
                    endDate: riskEndDate
                };

                if (riskConditions.manualRiskDeletion) {

                    const newRisk = body.risks.find(x => x.risk.riskCode == risk.risk.riskCode);
                    if (newRisk) {
                        risk.underwriterPremium = newRisk.underwriterPremium;
                        risk.underwriterRatio = newRisk.underwriterRatio;
                        risk.underwriterPremiumPaymentFrequency = newRisk.underwriterPremiumPaymentFrequency;
                    }
                    body.technicalInformation.allRisks.push(risk);

                    if (availablePackages.filter(x => x.packageCode == risk.risk.riskCode).length != 0) {
                        body.risks.push(risk);
                    }

                }
                else {
                    body.technicalInformation.allRisks.push(risk);
                    body.risks.push(risk);
                }
            }
        });

        if (riskConditions.manualRiskDeletion && (riskConditions.replaceDisabilityAnyReason || riskConditions.replaceDisabilityECOF)) {

            const hasRisk = body.risks.filter(x => x.risk.riskCode == "D36404").length == 1;
            if (hasRisk) {
                body.risks = body.risks.filter(x => !["D36404", "DA36404"].includes(x.risk.riskCode));
                body.risks.push(body.technicalInformation.allRisks.find(x => x.risk.riskCode == "DA36404"));
            }
        }

        if (riskConditions.manualRiskDeletion && (!riskConditions.replaceDisabilityAnyReason || !riskConditions.replaceDisabilityECOF)) {

            const hasRisk = body.risks.filter(x => x.risk.riskCode == "DA36404").length == 1;
            const hasNotRisk = body.risks.filter(x => x.risk.riskCode == "D36404").length == 0;
            if (hasRisk && hasNotRisk) {
                body.risks = body.risks.filter(x => x.risk.riskCode != "DA36404");
                body.risks = body.risks.concat(body.technicalInformation.allRisks.filter(x => ["D36404", "DA36404"].includes(x.risk.riskCode)));
            }
        }

        previousRisks.forEach(pr => {
            const existsInBody = body.risks.some(x => x.risk.riskCode == pr.risk.riskCode);
            if (existsInBody) {
                body.risks.find(x => x.risk.riskCode == pr.risk.riskCode).underwriterPremiumWithoutTariffication = previousRisks.find(x => x.risk.riskCode == pr.risk.riskCode).underwriterPremiumWithoutTariffication;
                body.risks.find(x => x.risk.riskCode == pr.risk.riskCode).underwriterRatioWithoutTariffication = previousRisks.find(x => x.risk.riskCode == pr.risk.riskCode).underwriterRatioWithoutTariffication;
            }
        });

        body.risks.sort((a, b) => objectUtils.getValue(a, 'risk.riskOrder', 0) - objectUtils.getValue(b, 'risk.riskOrder', 0));
    },

    updateRisksTerm: function (body, risks, amendmentType, isNotePolicyCreating) {

        const riskConditions = this.getBodyContext(body, amendmentType);

        if (riskConditions.manualCorrection && amendmentType !== changeAmendmentTypes.financialChange && !isNotePolicyCreating) {

            body.riskConditions.manualCorrection = true;
            return;
        }

        if (riskConditions.correctionWithoutCalc && amendmentType !== changeAmendmentTypes.financialChange && !isNotePolicyCreating) {

            body.riskConditions.correctionWithoutCalc = true;
            return;
        }

        body.riskConditions = riskConditions;

        const newRisks = [];
        if (risks.length == 0) { return; }

        risks.forEach(r => {
            let IsConditionPassed = true;
            const conditionFunctionName = objectUtils.getValue(r, 'resultData.conditionsFunction');
            const conditionFunctionReference = conditionFunctionName && objectUtils.getValue(riskConditionsHelper, conditionFunctionName);

            if (conditionFunctionReference) {
                IsConditionPassed = conditionFunctionReference(riskConditions);
            }

            if (IsConditionPassed) {

                const riskStartDateFunctionReference = conditionFunctionName && objectUtils.getValue(riskStartDateHelper, conditionFunctionName);
                const riskStartDate = riskStartDateFunctionReference ? riskStartDateFunctionReference(riskConditions) : riskConditions.contractSartDate;

                const riskEndDateFunctionReference = conditionFunctionName && objectUtils.getValue(riskEndDateHelper, conditionFunctionName);
                const riskEndDate = riskEndDateFunctionReference ? riskEndDateFunctionReference(riskConditions) : riskConditions.contractEndDate;

                newRisks.push(
                    {
                        risk:
                        {
                            riskShortDescription: r.resultData.riskShortDescription,
                            riskFullDescription: r.resultData.riskFullDescription,
                            riskCode: r.resultData.riskCode,
                            isLife: r.resultData.isLife,
                            withoutProduct: r.resultData.withoutProduct ?? false,
                            conditionsFunction: r.resultData.conditionsFunction || '',
                            riskOrder: r.resultData.riskOrder,
                            riskProgram: r.resultData.riskProgram,
                            riskPerson: r.resultData.riskPerson
                        },
                        replacementInfo:
                        {
                            isReplaceable: r.resultData.isReplaceable,
                            parentRiskCode: r.resultData.riskCode
                        },
                        startDate: riskStartDate,
                        endDate: riskEndDate
                    }
                );
            }
        });

        body.risks.forEach(r => {
            const newRisk = newRisks.find(x => x.risk.riskCode == r.risk.riskCode);
            if (newRisk) {
                r.startDate = newRisk.startDate;
                r.endDate = newRisk.endDate;
            }
        });
    },

    processRiskPackages: function (body, risks, amendmentType) {

        const context = this.getBodyContext(body, amendmentType);
        const availablePackages = context.risksPackages?.availablePackages ?? [];
        const selectedPackages = context.risksPackages?.selectedPackages ?? [];

        availablePackages.forEach(ap => {

            const packageConf = riskPackagesConfiguration({ packageCode: ap.packageCode });
            const packageRisks = packageConf?.packageRisks ?? [];
            const selected = selectedPackages.find(sp => sp.packageCode === ap.packageCode);

            if (selected) {

                packageRisks.forEach(rCode => {

                    const selectedRisk = body.risks.find(r => r.risk.riskCode === rCode);

                    if (!selectedRisk) {

                        const risk = risks.find(r => r.resultData.riskCode === rCode);

                        if (risk) {

                            body.risks.push(
                                {
                                    risk:
                                    {
                                        riskShortDescription: risk.resultData.riskShortDescription,
                                        riskFullDescription: risk.resultData.riskFullDescription,
                                        riskCode: risk.resultData.riskCode,
                                        isLife: risk.resultData.isLife,
                                        withoutProduct: risk.resultData.withoutProduct ?? false,
                                        conditionsFunction: risk.resultData.conditionsFunction || '',
                                        riskOrder: risk.resultData.riskOrder,
                                        riskProgram: risk.resultData.riskProgram,
                                        riskPerson: risk.resultData.riskPerson,
                                        risksGroup: risk.resultData.risksGroup
                                    },
                                    replacementInfo:
                                    {
                                        isReplaceable: risk.resultData.isReplaceable,
                                        parentRiskCode: risk.resultData.riskCode
                                    }
                                });
                        }
                    }
                });
            }
            else {

                packageRisks.forEach(rCode => {

                    const selectedRisk = body.risks.find(r => r.risk.riskCode === rCode);

                    if (selectedRisk) {

                        const index = body.risks.indexOf(selectedRisk);
                        body.risks.splice(index, 1);
                    }
                });
            }
        });
    }
};
