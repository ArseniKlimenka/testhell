"use strict";
/* eslint no-undef: "off"*/
const { changeTypes, personalDataChangeTypes, personalDataChangePropertiesDataExtracor } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentConsts');
const paymentPlanUtils = require('@config-rgsl//life-insurance/lib/paymentPlanUtils');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const { deepCopy, groupBy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');
const { addressType, countryRussia } = require('@config-rgsl/party/lib/partyConstantsImpl');

function getNonFinAmendmentApplyResult(policyDocument, amendmentDocument) {

    const selectedChangeTypes = amendmentDocument?.amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.changeTypes ?? [];
    const isPolcyHolderChangeSelected = selectedChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit);
    const isInsuredPersonChangeSelected = selectedChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit);
    const isBeneficiarySelectionChangeSelected = selectedChangeTypes.includes(changeTypes.beneficiarySelection);
    const isBeneficiaryEditChangeSelected = selectedChangeTypes.includes(changeTypes.beneficiaryEdit);
    const isPaymentGraceDateProlongation = selectedChangeTypes.includes(changeTypes.paymentGraceDateProlongation);
    const amendmentBeneficiaries = amendmentDocument?.beneficiaries?.beneficiaries ?? [];
    const amendmentBeneficiariesId = amendmentBeneficiaries.map(item => item.beneficiaryId);
    const policyBeneficiaries = JSON.parse(JSON.stringify(policyDocument?.beneficiaries?.beneficiaries ?? []));
    const policyBeneficiariesId = policyBeneficiaries.map(item => item.beneficiaryId);
    const policyAdditionalBeneficiaries = JSON.parse(JSON.stringify(policyDocument?.additionalBeneficiaries ?? []));
    const policyAdditionalBeneficiariesId = policyAdditionalBeneficiaries.map(item => item.beneficiaryId);
    let amendmentAdditionalBeneficiaries = amendmentDocument?.additionalBeneficiaries ?? [];
    const amendmentAdditionalBeneficiariesId = amendmentAdditionalBeneficiaries.map(item => item.beneficiaryId);
    const isInvestmentParametersEditSelected = selectedChangeTypes.includes(changeTypes.investmentParametersEdit);

    if (!amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData) {

        amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData = {};
    }

    if (!amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.beneficiaryData) {

        amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.beneficiaryData = {};
    }

    if (!amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.additionalBeneficiaryData) {

        amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.additionalBeneficiaryData = {};
    }

    amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.areFinancialAttributesAffected = false;

    if (!isPolcyHolderChangeSelected) {

        amendmentDocument.policyHolder = policyDocument.policyHolder;

        if (!isPaymentGraceDateProlongation) {
            amendmentDocument.paymentPlan = policyDocument.paymentPlan;
        }
    }

    const amendmentInsured = amendmentDocument.insuredPerson;
    const policyInsured = policyDocument.insuredPerson;

    const isGenderChanged = amendmentInsured?.partyData?.partyBody?.partyPersonData?.personGender !== policyInsured?.partyData?.partyBody?.partyPersonData?.personGender;
    const isDateOfBirthChanged = amendmentInsured?.partyData?.partyBody?.partyPersonData?.dateOfBirth !== policyInsured?.partyData?.partyBody?.partyPersonData?.dateOfBirth;

    if (isGenderChanged || isDateOfBirthChanged) {

        amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.areFinancialAttributesAffected = true;
    }

    if (!isInsuredPersonChangeSelected) {

        amendmentDocument.insuredPerson = policyDocument.insuredPerson;
    }

    if (!isPolcyHolderChangeSelected && !isInsuredPersonChangeSelected) {

        amendmentDocument.uwTriggers = policyDocument.uwTriggers;
    }

    if (!isInvestmentParametersEditSelected) {

        amendmentDocument.equityStrategies = policyDocument.equityStrategies;
    }

    const beneficiaryData = amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.beneficiaryData;
    const additionalBeneficiaryData = amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.additionalBeneficiaryData;

    setAddedOrRemovedBeneficiaries(policyBeneficiariesId, amendmentBeneficiariesId, beneficiaryData);
    setAddedOrRemovedBeneficiaries(policyAdditionalBeneficiariesId, amendmentAdditionalBeneficiariesId, additionalBeneficiaryData);

    if (!isBeneficiarySelectionChangeSelected) {

        amendmentDocument.beneficiaries.isHeritors = policyDocument.beneficiaries.isHeritors;
        amendmentDocument.beneficiaries.isNotHeritors = policyDocument.beneficiaries.isNotHeritors;

        revertBeneficiariesSelection(policyBeneficiaries, amendmentBeneficiaries, beneficiaryData);
        revertBeneficiariesSelection(policyAdditionalBeneficiaries, amendmentAdditionalBeneficiaries, additionalBeneficiaryData);
    }

    setEditedBeneficiaries(policyBeneficiaries, amendmentBeneficiaries, policyBeneficiariesId, beneficiaryData);
    setEditedBeneficiaries(policyAdditionalBeneficiaries, amendmentAdditionalBeneficiaries, policyAdditionalBeneficiariesId, additionalBeneficiaryData);

    if (!isBeneficiaryEditChangeSelected) {

        restoreEditedBeneficiaries(policyBeneficiaries, amendmentBeneficiaries, beneficiaryData);
        restoreEditedBeneficiaries(policyAdditionalBeneficiaries, amendmentAdditionalBeneficiaries, additionalBeneficiaryData);
    }

    amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.beneficiaryData = beneficiaryData;
    amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.additionalBeneficiaryData = additionalBeneficiaryData;
    amendmentDocument.beneficiaries.beneficiaries = amendmentBeneficiaries;


    amendmentAdditionalBeneficiaries = amendmentAdditionalBeneficiaries.sort((a, b) => ((a.risk?.code?.toLowerCase() ?? 'none') > (b.risk?.code?.toLowerCase() ?? 'none')) ? -1 :
        (((b.risk?.code?.toLowerCase() ?? 'none') < (a.risk?.code?.toLowerCase() ?? 'none')) ? 1 : 0));

    amendmentDocument.additionalBeneficiaries = amendmentAdditionalBeneficiaries;

    checkAmendmentDataIsChanged(amendmentDocument, policyDocument);

    if (!isPaymentGraceDateProlongation) {
        amendmentDocument.paymentPlan.forEach(x => {
            delete x.paymentGraceDateProlongation;
        });
    }

    return Object.assign({}, amendmentDocument);
}

function getFinAmendmentApplyResult(policyDocument, amendmentDocument, businessContext) {

    const amendmentData = amendmentDocument.amendmentData;
    const selectedChangeTypes = amendmentData.finChangeAmendmentData.mainAttributes?.changeTypes ?? [];
    const effectiveDate = amendmentData.finChangeAmendmentData.mainAttributes?.amendmentEffectiveDate ?? dateUtils.newDateAsString(dateUtils.DateFormats.ECMASCRIPT);
    const prevEffectiveDate = amendmentData.finChangeAmendmentData.technicalData?.prevAmendmentEffectiveDate ?? effectiveDate;
    const correctedEffectiveDate = dateUtils.substractDays(effectiveDate, 1);

    const policyRisks = deepCopy(policyDocument.risks ?? []);
    const policyTerms = deepCopy(policyDocument.policyTerms ?? {});
    const policyPaymentPlan = deepCopy(policyDocument.paymentPlan ?? []);
    const amendmentSurrenderValues = deepCopy(amendmentDocument.surrenderValues ?? []);
    const amendmentPaymentPlan = deepCopy(amendmentDocument.paymentPlan ?? []);

    const policyPaymentFrequency = deepCopy(policyDocument.basicConditions?.paymentFrequency);

    const isRiskEditSelected = selectedChangeTypes.includes(changeTypes.riskEdit);
    const isInsuranceTermEditSelected = selectedChangeTypes.includes(changeTypes.insuranceTermEdit);
    const isPaymentFrquencyEditSelected = selectedChangeTypes.includes(changeTypes.paymentPeriodTypeEdit);
    const isInsuredSumEditSelected = selectedChangeTypes.includes(changeTypes.insuredSumAndPaymentEdit);
    const isHolderEditSelected = selectedChangeTypes.includes(changeTypes.policyHolderChange);

    if (!amendmentDocument.amendmentData?.finChangeAmendmentData?.technicalData) {
        amendmentDocument.amendmentData.finChangeAmendmentData.technicalData = {};
    }

    amendmentDocument.amendmentData.finChangeAmendmentData.technicalData.originalPolicyRisks = deepCopy(policyRisks);
    amendmentDocument.amendmentData.finChangeAmendmentData.technicalData.originalPolicyTerms = deepCopy(policyTerms);

    if (!isRiskEditSelected && !isInsuredSumEditSelected) {

        amendmentDocument.risks = deepCopy(policyRisks);
    }
    else {

        const initialPolicyRisks = deepCopy(policyRisks);
        const filteredPolicyRisks = initialPolicyRisks.filter(r => r.endDate > prevEffectiveDate);
        const deletedRisks = filteredPolicyRisks.filter(pr => !amendmentDocument.risks.some(ar => ar.risk.riskCode === pr.risk.riskCode));
        const addedRisks = amendmentDocument.risks.filter(ar => !filteredPolicyRisks.some(pr => ar.risk.riskCode === pr.risk.riskCode));

        let risksToSet = initialPolicyRisks.filter(pr => !deletedRisks.some(dr => dr.risk.riskCode === pr.risk.riskCode));

        for (let index = 0; index < risksToSet.length; index++) {

            const updatedRisk = amendmentDocument.risks.find(ir => ir.risk.riskCode === risksToSet[index].risk.riskCode);

            if (updatedRisk) {

                const currentRisk = risksToSet[index];
                updatedRisk.startDate = currentRisk.startDate;
                risksToSet[index] = updatedRisk;
            }
        }

        risksToSet = risksToSet.concat(addedRisks);
        amendmentDocument.risks = risksToSet;
    }

    amendmentDocument.risks = amendmentDocument.risks.filter(r => r.endDate > effectiveDate);

    if (!isRiskEditSelected) {

        amendmentDocument.risksPackages = deepCopy(policyDocument.risksPackages);
    }

    if (!isInsuredSumEditSelected) {

        amendmentDocument.basicConditions.riskPremium = policyDocument.basicConditions.riskPremium;
        amendmentDocument.basicConditions.riskInsuredSum = policyDocument.basicConditions.riskInsuredSum;
        amendmentDocument.basicConditions.calcFromInsuredSum = policyDocument.basicConditions.calcFromInsuredSum;
    }

    if (!isInsuranceTermEditSelected) {

        amendmentDocument.basicConditions.insuranceTerms = policyDocument.basicConditions.insuranceTerms;
        amendmentDocument.basicConditions.insuranceTermsMonths = policyDocument.basicConditions.insuranceTermsMonths;
        amendmentDocument.basicConditions.insuranceTermsDays = policyDocument.basicConditions.insuranceTermsDays;

        amendmentDocument.policyTerms.endDate = policyDocument.policyTerms.endDate;
    }

    if (!isPaymentFrquencyEditSelected) {

        amendmentDocument.basicConditions.paymentFrequency = policyPaymentFrequency;
    }

    if (!isHolderEditSelected) {

        amendmentDocument.policyHolder = deepCopy(policyDocument.policyHolder);
        amendmentDocument.insuredPerson = deepCopy(policyDocument.insuredPerson);
    }

    const initialAmendmentRisks = deepCopy(amendmentDocument.risks);
    const enrich = documents.getDocumentConfiguration(businessContext.configurationCodeName, 1).processEnrichmentsFn;
    const isMigrated = policyDocument.migrationAttributes?.isMigrated ?? false;

    enrich(undefined, amendmentDocument, ['/policyTerms']);

    setAmendmentRisksData(amendmentDocument, policyDocument, initialAmendmentRisks, effectiveDate, isPaymentFrquencyEditSelected, isMigrated);

    enrich(undefined, amendmentDocument, ['/policyHolder/**']);
    enrich(undefined, amendmentDocument, ['/uwTriggers']);
    enrich(undefined, amendmentDocument, ['/additionalServices']);

    const amendmentRisks = deepCopy(amendmentDocument.risks);
    const appliedResult = deepCopy(amendmentDocument);

    const policyStartDate = policyDocument.policyTerms.startDate;

    if (effectiveDate > policyStartDate) {

        const policyRisksToSet = policyRisks.filter(r => r.startDate < effectiveDate).map(r => {

            r.endDate = r.endDate >= effectiveDate ? correctedEffectiveDate : r.endDate;
            r.riskInsuredSumByPeriod = r.riskInsuredSumByPeriod?.filter(p => p.periodEndDate <= effectiveDate);
            r.riskInsuredSumByPeriod = r.riskInsuredSumByPeriod?.map(rp => {

                rp.periodEndDate = rp.periodEndDate === effectiveDate ? correctedEffectiveDate : rp.periodEndDate;
                return rp;
            });

            return r;
        });

        appliedResult.risks = policyRisksToSet.concat(amendmentRisks);
    }

    // Если выбран допник на изменение периодичности оплаты, необходимо очистить продление льготного периода
    if (isPaymentFrquencyEditSelected) {

        amendmentPaymentPlan.forEach(x => {

            delete x.paymentGraceDateProlongation;
        });
    }
    else {

        amendmentPaymentPlan.forEach(n => {

            const oldPaymentPlan = policyDocument.paymentPlan.find(o => o.paymentPeriodStart == n.paymentPeriodStart);

            if (oldPaymentPlan) {

                n.paymentGraceDateProlongation = oldPaymentPlan.paymentGraceDateProlongation;
            }
        });
    }

    appliedResult.paymentPlan = amendmentPaymentPlan;
    appliedResult.surrenderValues = amendmentSurrenderValues;
    appliedResult.amendmentData.finChangeAmendmentData.technicalData.originalPaymentPlanPart = policyPaymentPlan.filter(i => i.paymentPeriodStart < effectiveDate);
    amendmentData.finChangeAmendmentData.technicalData.prevAmendmentEffectiveDate = effectiveDate;

    return appliedResult;
}

function setAmendmentRisksData(amendmentDocument, policyDocument, initialAmendmentRisks, effectiveDate, isPaymentFrquencyEditSelected, isMigrated) {

    amendmentDocument.risks.forEach(r => {

        const initialRisk = initialAmendmentRisks.find(ir => ir.risk.riskCode === r.risk.riskCode);

        if (initialRisk) {

            r.startDate = initialRisk.startDate >= effectiveDate ? initialRisk.startDate : effectiveDate;

            if (!r.endDate) {

                r.endDate = initialRisk.endDate < policyDocument.policyTerms.endDate ? initialRisk.endDate : amendmentDocument.policyTerms.endDate;
            }
        }

        const originalRisks = amendmentDocument.amendmentData.finChangeAmendmentData.technicalData.originalPolicyRisks ?? [];
        const originalRisk = originalRisks.find(or => or.risk.riskCode === r.risk.riskCode);
        const originalPeriods = originalRisk?.riskInsuredSumByPeriod ?? [];
        const shouldCalcPeriods = r.manualPeriodsCalc || originalPeriods.length > 0;

        if (shouldCalcPeriods && r.startDate && r.endDate) {

            let monthCount = 0;
            const paymentFrequency = amendmentDocument.basicConditions.paymentFrequency.paymentFrequencyCode;

            if (paymentFrequency && (isPaymentFrquencyEditSelected || originalPeriods.length === 0)) {

                switch (paymentFrequency) {

                    case lifeInsuranceConstants.paymentFrequency.oneTime.code:
                        monthCount = 9999;
                        break;
                    case lifeInsuranceConstants.paymentFrequency.annual.code:
                        monthCount = 12;
                        break;
                    case lifeInsuranceConstants.paymentFrequency.semiAnnual.code:
                        monthCount = 6;
                        break;
                    case lifeInsuranceConstants.paymentFrequency.quarterly.code:
                        monthCount = 3;
                        break;
                    case lifeInsuranceConstants.paymentFrequency.monthly.code:
                        monthCount = 1;
                        break;
                    default:
                        monthCount = 0;
                }
            }
            else if (originalPeriods.length > 0) {

                const periodStartDate = originalPeriods[0].periodStartDate;
                const periodEndDate = originalPeriods[0].periodEndDate;
                monthCount = dateUtils.getMonthDifference(periodStartDate, dateUtils.addDays(periodEndDate, 1));
            }
            else {

                r.riskInsuredSumByPeriod = [];
                return;
            }

            const periodsTable = dateUtils.getPeriodsTableByMonths(r.startDate, r.endDate, monthCount);

            r.riskInsuredSumByPeriod = periodsTable.map(p => {

                const currentPeriods = initialRisk.riskInsuredSumByPeriod ?? [];
                const existingPeriod = currentPeriods.find(cp => cp.periodStartDate === p.periodStartDate && cp.periodEndDate === p.periodEndDate);

                return {
                    periodNumber: p.periodNumber,
                    insuredSum: existingPeriod?.insuredSum,
                    periodStartDate: p.periodStartDate,
                    periodEndDate: p.periodEndDate
                };
            });
        }
        else if (shouldCalcPeriods) {

            r.riskInsuredSumByPeriod = [];
        }
        else {

            r.riskInsuredSumByPeriod = undefined;
        }
    });
}

function setAddedOrRemovedBeneficiaries(policyBeneficiariesId, amendmentBeneficiariesId, beneficiaryData) {

    const removed = policyBeneficiariesId.filter(policyItem => !amendmentBeneficiariesId.includes(policyItem));
    const added = amendmentBeneficiariesId.filter(amendmentItem => !policyBeneficiariesId.includes(amendmentItem));

    beneficiaryData.added = added;
    beneficiaryData.removed = removed;
}

function revertBeneficiariesSelection(policyBeneficiaries, amendmentBeneficiaries, beneficiaryData) {

    const added = beneficiaryData?.added ?? [];
    const removed = beneficiaryData?.removed ?? [];
    let updatedBeneficiaries = [];

    if (added.length > 0) {

        updatedBeneficiaries = amendmentBeneficiaries.filter(item => !added.includes(item.beneficiaryId));
        beneficiaryData.added = [];
    }

    if (removed.length > 0) {

        const removedItems = policyBeneficiaries.filter(item => removed.includes(item.beneficiaryId));
        updatedBeneficiaries = updatedBeneficiaries.concat(removedItems);
        beneficiaryData.removed = [];
    }

    if (updatedBeneficiaries.length > 0) {

        amendmentBeneficiaries.length = 0;
        amendmentBeneficiaries.push(...updatedBeneficiaries);
    }
}

function setEditedBeneficiaries(policyBeneficiaries, amendmentBeneficiaries, policyBeneficiariesId, beneficiaryData) {

    const sameItems = amendmentBeneficiaries.filter(item => policyBeneficiariesId.includes(item.beneficiaryId));

    const edited = [];

    sameItems.forEach(item => {

        const foundPolicyItem = policyBeneficiaries.find(policyItem => policyItem.beneficiaryId === item.beneficiaryId);

        if (foundPolicyItem && JSON.stringify(foundPolicyItem) !== JSON.stringify(item)) {

            edited.push(foundPolicyItem.beneficiaryId);
        }
    });

    beneficiaryData.edited = edited;
}

function restoreEditedBeneficiaries(policyBeneficiaries, amendmentBeneficiaries, beneficiaryData) {

    const edited = beneficiaryData.edited ?? [];

    if (edited.length > 0) {

        const originalItems = policyBeneficiaries.filter(item => edited.includes(item.beneficiaryId));
        let updatedBeneficiaries = amendmentBeneficiaries.filter(item => !edited.includes(item.beneficiaryId));
        updatedBeneficiaries = updatedBeneficiaries.concat(originalItems);
        amendmentBeneficiaries.length = 0;
        amendmentBeneficiaries.push(...updatedBeneficiaries);
        beneficiaryData.edited = [];
    }
}

async function updateChangesRelatedData(input, view) {

    const selectedChangeTypes = input?.context?.Body?.amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.changeTypes ?? [];
    const policyHolderPersonalDataEditSelected = selectedChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit);
    const insuredPersonPersonalDataEditSelected = selectedChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit);

    await view.evaluate(['/amendmentData/amendmentAttachmentsPackage'], false, true);

    if (policyHolderPersonalDataEditSelected) {

        await view.evaluate(['/policyHolder/**'], false, true);
        paymentPlanUtils.fillPaymentPlan(input.context.Body, input.context.Dimensions);
    }

    if (insuredPersonPersonalDataEditSelected) {

        await view.evaluate(['/insuredPerson/**'], false, true);
    }

    if (policyHolderPersonalDataEditSelected || insuredPersonPersonalDataEditSelected) {

        await view.evaluate(['/uwTriggers'], false, true);
    }
}

function getDefaultAmendmentDataForPolicy(policy) {

    const beneficiaries = policy.beneficiaries?.beneficiaries ?? [];
    const additionalBeneficiaries = policy.additionalBeneficiaries ?? [];

    return {
        amendmentAttachmentsPackage: [],
        nonFinChangeAmendmentData: {
            mainAttributes: {},
            applicationInfo: {
                applicant: {
                    partyCode: policy.policyHolder.partyData.partyCode,
                    partyType: policy.policyHolder.partyData.partyType,
                    fullName: policy.policyHolder.partyData.partyFullName
                },
                registrationDate: dateUtils.dateNow()
            },
            amendmentInfo: {},
            technicalData: {
                beneficiaryData: {
                    initial: beneficiaries.map(item => item.beneficiaryId)
                },
                additionalBeneficiaryData: {
                    initial: additionalBeneficiaries.map(item => item.beneficiaryId)
                }
            }
        }
    };
}

function getNonFinChangeMailMappingResult(input, that) {

    const amendmentNumber = that.businessContext.documentNumber;
    const entityId = that.businessContext.entityId;
    const mailNumber = `99-08-421-04/${input.body.amendmentData.nonFinChangeAmendmentData.amendmentInfo.changeMailSequence}`;
    const sideContent = getNonFinChangeMailSideContent();
    const policyHolder = input.body.policyHolder.partyData.partyFullName;
    const policyHolderAddresses = input.body.policyHolder.partyData.partyBody.partyAddresses;
    let mailAddress = policyHolderAddresses.find(a => a.addressType.addressTypeCode === 'P');

    if (!mailAddress) {

        mailAddress = policyHolderAddresses.find(a => a.addressType.addressTypeCode === 'F');
    }

    let mailAddressText = mailAddress?.fullAddress?.value;
    mailAddressText = mailAddressText ? mailAddressText : "Отсутствует";
    const requestIssueDate = input.body.amendmentData.nonFinChangeAmendmentData.applicationInfo.requestIssueDate;
    const policyIssueDate = input.body.basicConditions.issueDate;
    const { isBeneficiaries, beneficiaries, shareSumIsNot1 } = printoutsHelper.getBeneficiaries(input.body.beneficiaries);
    const holder = printoutsHelper.getPerson(input.body.policyHolder.partyData);
    const insured = printoutsHelper.getPerson(input.body.insuredPerson.partyData);

    const selectedChangeTypes = input.body?.amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.changeTypes ?? [];
    const showPolicyHolder = selectedChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit);
    const showInsuredPerson = selectedChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit);
    const areBeneficiariesSelected = selectedChangeTypes.includes(changeTypes.beneficiarySelection);
    const areBeneficiariesEdited = selectedChangeTypes.includes(changeTypes.beneficiaryEdit);
    const showBeneficiaries = areBeneficiariesSelected || areBeneficiariesEdited;

    const additionalBeneficiaries = input.body.additionalBeneficiaries ?? [];
    const showAdditionalBeneficiaries = additionalBeneficiaries.length > 0 && (areBeneficiariesSelected || areBeneficiariesEdited);

    const attachStampToBeneficiaries = showBeneficiaries && !showPolicyHolder && !showInsuredPerson && !showAdditionalBeneficiaries;
    const attachStampToAdditionalBeneficiaries = showAdditionalBeneficiaries && !showPolicyHolder && !showInsuredPerson;
    const attachStampToPolicyHolder = showPolicyHolder && !showInsuredPerson;
    const attachStampToInsuredPerson = showInsuredPerson;
    const exampleLabel = getChangeAmendmentExampleLabel(that.businessContext);

    let additionalRiskContentMarkup = '';

    if (showAdditionalBeneficiaries) {

        additionalRiskContentMarkup = getAdditionalRiskContentMarkup(additionalBeneficiaries, attachStampToAdditionalBeneficiaries);
    }

    const output = {
        sideContent,
        mailNumber,
        policyHolder,
        mailAddressText,
        amendmentNumber,
        entityId,
        requestIssueDate: printoutsHelper.formatDatePrint(requestIssueDate),
        policyIssueDate: printoutsHelper.formatDatePrint(policyIssueDate),
        isBeneficiaries,
        beneficiaries,
        shareSumIsNot1,
        holder,
        insured,
        showPolicyHolder,
        showInsuredPerson,
        showBeneficiaries,
        attachStampToBeneficiaries,
        attachStampToPolicyHolder,
        attachStampToInsuredPerson,
        exampleLabel,
        additionalRiskContentMarkup
    };

    return output;
}

function getNonFinChangeMailSideContent() {

    return `<style>
    @page {
    @top-left {
        margin-top: 40;
        content: url("./img/logoHeader.png");
    }
    @top-right {
        margin-top: 40;
        content: url("./img/logoHeader2.png");
    }
    @bottom-left {
        margin-bottom: 80px;
        color: gray;
        font-size: 8pt;
        white-space: pre-line;
        content: "ООО СК «Росгосстрах Жизнь»\\A 119991, г. Москва-59, ул. Киевская, д. 7, к. 1.\\A Лицензия Банка России от 25.03.2021 г.: СЖ № 3879, СЛ № 3879\\A ИНН 7743504307. ОГРН 1037739821514";
    }
    @bottom-right {
        margin-bottom: 60px;
        margin-right: 13mm;
        color: crimson;
        font-size: 10pt;
        white-space: pre-line;
        content: "RGSL.RU\\A 8-800-100-12-10";
    }
   }
   </style>`;
}

function getChangeAmendmentExampleLabel(businessContext) {

    const state = businessContext.documentState;

    if (state === 'Activated') {

        return "";
    }

    return '<style>' +
        '@page {' +
        '@left-middle {' +
        'margin-top: 400px;' +
        'margin-left: 200px;' +
        'font-size: 42pt;' +
        'font-family: Arial, Helvetica, sans-serif;' +
        'color: black;' +
        'content: "ОБРАЗЕЦ";' +
        '-webkit-transform: rotate(-45deg);' +
        '-moz-transform: rotate(-45deg);' +
        '-o-transform: rotate(-45deg);' +
        '-ms-transform: rotate(-45deg);' +
        'transform: rotate(-45deg);' +
        'letter-spacing: 1em;' +
        'opacity: 0.5;' +
        'z-index: 999;' +
        '}' +
        '}' +
        '</style>';
}

function checkAmendmentDataIsChanged(amendmentDocument, policyDocument) {
    const selectedChangeTypes = amendmentDocument?.amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.changeTypes ?? [];
    const isPolcyHolderChangeSelected = selectedChangeTypes.includes(changeTypes.policyHolderPersonalDataEdit);
    const isInsuredPersonChangeSelected = selectedChangeTypes.includes(changeTypes.insuredPersonPersonalDataEdit);
    const isBeneficiarySelectionChangeSelected = selectedChangeTypes.includes(changeTypes.beneficiarySelection);
    const isBeneficiaryEditChangeSelected = selectedChangeTypes.includes(changeTypes.beneficiaryEdit);
    const isInvestmentParametersEditChangeSelected = selectedChangeTypes.includes(changeTypes.investmentParametersEdit);
    const technicalData = amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData;

    if (isPolcyHolderChangeSelected) {

        const amendmentHolderComparisonResult = validatePartyPersonalDataIsChanged(amendmentDocument, policyDocument.policyHolder, amendmentDocument.policyHolder);
        const policyHolderBodyFromPolicy = policyDocument.policyHolder.partyData.partyBody;
        const policyHolderBodyFromAmendment = amendmentDocument.policyHolder.partyData.partyBody;
        const sitizenshipIsTheSame = objectComparison(policyHolderBodyFromPolicy.partyPersonData.citizenship ?? [], policyHolderBodyFromAmendment.partyPersonData.citizenship ?? []);
        const taxResidenceIsTheSame = objectComparison(policyHolderBodyFromPolicy.partyGeneralData.taxResidence ?? {}, policyHolderBodyFromAmendment.partyGeneralData.taxResidence ?? {});
        const registrationCountryIsTheSame = objectComparison(policyHolderBodyFromPolicy.partyGeneralData.registrationCountry ?? {}, policyHolderBodyFromAmendment.partyGeneralData.registrationCountry ?? {});
        const publicOfficialIsTheSame = objectComparison(policyHolderBodyFromPolicy.partyPersonData.isPublicOfficial, policyHolderBodyFromAmendment.partyPersonData.isPublicOfficial);
        const isForeignAddress = policyHolderBodyFromAmendment.partyAddresses.find(address => address.addressType.addressTypeCode === addressType.registration.code)?.isForeignAddress;
        const isForeignPhone = policyHolderBodyFromAmendment.partyPhones.some(phone => phone.countryCode.countryCode !== countryRussia.countryCode);
        technicalData.isHolderChanged = amendmentHolderComparisonResult;
        technicalData.isHolderSitizenshipChanged = !sitizenshipIsTheSame;
        technicalData.isForeignAddress = isForeignAddress;
        technicalData.isForeignPhone = isForeignPhone;
        technicalData.isTaxResidenceChanged = !taxResidenceIsTheSame;
        technicalData.isRegistrationCountryChanged = !registrationCountryIsTheSame;
        technicalData.isPublicOfficial = !publicOfficialIsTheSame && policyHolderBodyFromAmendment.partyPersonData.isPublicOfficial;
    }

    if (isInsuredPersonChangeSelected) {

        const amendmentInsuredComparisonResult = validatePartyPersonalDataIsChanged(amendmentDocument, policyDocument.insuredPerson, amendmentDocument.insuredPerson);
        const insuredPersonBodyFromPolicy = policyDocument.insuredPerson.partyData.partyBody;
        const insuredPersonBodyFromAmendment = amendmentDocument.insuredPerson.partyData.partyBody;
        const sitizenshipIsTheSame = objectComparison(insuredPersonBodyFromPolicy.partyPersonData.citizenship ?? [], insuredPersonBodyFromAmendment.partyPersonData.citizenship ?? []);
        const taxResidenceIsTheSame = objectComparison(insuredPersonBodyFromPolicy.partyGeneralData.taxResidence ?? {}, insuredPersonBodyFromAmendment.partyGeneralData.taxResidence ?? {});
        const registrationCountryIsTheSame = objectComparison(insuredPersonBodyFromPolicy.partyGeneralData.registrationCountry ?? {}, insuredPersonBodyFromAmendment.partyGeneralData.registrationCountry ?? {});
        const publicOfficialIsTheSame = objectComparison(insuredPersonBodyFromPolicy.partyPersonData.isPublicOfficial, insuredPersonBodyFromAmendment.partyPersonData.isPublicOfficial);
        const isForeignAddress = insuredPersonBodyFromAmendment.partyAddresses.find(address => address.addressType.addressTypeCode === addressType.registration.code)?.isForeignAddress;
        const isForeignPhone = insuredPersonBodyFromAmendment.partyPhones.some(phone => phone.countryCode.countryCode !== countryRussia.countryCode);
        technicalData.isInsuredChanged = amendmentInsuredComparisonResult;
        technicalData.isInsuredSitizenshipChanged = !sitizenshipIsTheSame;
        technicalData.isForeignAddress = isForeignAddress;
        technicalData.isForeignPhone = isForeignPhone;
        technicalData.isTaxResidenceChanged = !taxResidenceIsTheSame;
        technicalData.isRegistrationCountryChanged = !registrationCountryIsTheSame;
        technicalData.isPublicOfficial = !publicOfficialIsTheSame && insuredPersonBodyFromAmendment.partyPersonData.isPublicOfficial;
    }

    if (isBeneficiarySelectionChangeSelected || isBeneficiaryEditChangeSelected) {

        const areBeneficiariesEqual = objectComparison(amendmentDocument.beneficiaries ?? {}, policyDocument.beneficiaries ?? {});
        const areAdditionalBeneficiariesEqual = objectComparison(amendmentDocument.additionalBeneficiaries ?? [], policyDocument.additionalBeneficiaries ?? []);
        const personalDataChangeTypeArr = amendmentDocument.amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.personalDataChangeType ?? [];
        const isOnlySitizenshipChanging = personalDataChangeTypeArr.length === 1 && personalDataChangeTypeArr[0] === personalDataChangeTypes.sitizenship;
        amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.areBeneficiariesChanged = !areBeneficiariesEqual || !areAdditionalBeneficiariesEqual || isOnlySitizenshipChanging;
    }

    if (isInvestmentParametersEditChangeSelected) {

        const areInvestmentParametersEqual = objectComparison(amendmentDocument.equityStrategies ?? {}, policyDocument.equityStrategies ?? {});
        amendmentDocument.amendmentData.nonFinChangeAmendmentData.technicalData.areInvestmentParametersChanged = !areInvestmentParametersEqual;
    }
}

function validatePartyPersonalDataIsChanged(amendmentDocument, originalPartyObject, updatedPartyObject) {

    const personalDataChangeTypeArr = amendmentDocument?.amendmentData?.nonFinChangeAmendmentData?.mainAttributes?.personalDataChangeType ?? [];
    const validationResult = [];

    personalDataChangeTypeArr.forEach(type => {

        const propertiesToCheck = personalDataChangePropertiesDataExtracor[type];

        const originalObject = {};
        const updatedObject = {};

        for (p in propertiesToCheck) {

            originalObject[p] = propertiesToCheck[p](originalPartyObject);
            updatedObject[p] = propertiesToCheck[p](updatedPartyObject);
        }

        const result = objectComparison(originalObject, updatedObject);
        validationResult.push(result);
    });

    if (validationResult.length === 0) {

        return false;
    }

    return validationResult.every(r => r === false);
}

function objectComparison(firstObject, secondObject) {

    // if both firstObject and secondObject are null or undefined and exactly the same
    if (firstObject === secondObject) {

        return true;
    }

    // if they are not strictly equal, they both need to be Objects
    if (!(firstObject instanceof Object) || !(secondObject instanceof Object)) {
        return false;
    }

    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.
    if (firstObject.constructor !== secondObject.constructor) {

        return false;
    }

    for (const p in firstObject) {

        // other properties were tested using firstObject.constructor === secondObject.constructor
        if (!Object.prototype.hasOwnProperty.call(firstObject, p)) {

            continue;
        }

        // allows to compare firstObject[ p ] and secondObject[ p ] when set to undefined
        if (!Object.prototype.hasOwnProperty.call(secondObject, p)) {

            return false;
        }

        // if they have the same strict value or identity then they are equal
        if (firstObject[p] === secondObject[p]) {

            continue;
        }

        // Numbers, Strings, Functions, Booleans must be strictly equal
        if (typeof (firstObject[p]) !== "object") {

            return false;
        }

        // Objects and Arrays must be tested recursively
        if (Array.isArray(firstObject[p]) && Array.isArray(secondObject[p])) {

            const firstSorted = firstObject[p].sort();
            const secondSorted = secondObject[p].sort();

            if (!objectComparison(firstSorted, secondSorted)) {

                return false;
            }
        }
        else if (!objectComparison(firstObject[p], secondObject[p])) {

            return false;
        }
    }

    // allows firstObject[ p ] to be set to undefined
    for (const p in secondObject) {

        if (Object.prototype.hasOwnProperty.call(secondObject, p) && !Object.prototype.hasOwnProperty.call(firstObject, p)) {

            return false;
        }
    }

    return true;
}

function getAdditionalRiskContentMarkup(additionalBeneficiaries, attachStampToAdditionalBeneficiaries) {

    const mappedBeneficiaries = additionalBeneficiaries.map(item => {
        item.riskCode = item.risk.code;
        item.riskName = item.risk.description;
        return item;
    });

    const groupedByRisk = groupBy(mappedBeneficiaries, "riskName");
    const additionalRiskTables = [];

    for (let index = 0; index < groupedByRisk.length; index++) {

        const stamp = index === groupedByRisk.length - 1 && attachStampToAdditionalBeneficiaries ? getAdditionalBeneficiariesStamp() : '';
        const riskContent = getAdditionalRiskContent(groupedByRisk[index].key, groupedByRisk[index].items, stamp);
        additionalRiskTables.push(riskContent);
    }

    let additionalRiskContentMarkup = '';
    additionalRiskContentMarkup = additionalRiskTables.join(' ');

    return additionalRiskContentMarkup;
}

function getAdditionalRiskContent(riskName, beneficiaries, stamp) {

    const beneficiariesContent = [];

    for (let index = 0; index < beneficiaries.length; index++) {

        const beneficiaryContent = getAdditionalRiskBeneficiaryContent(beneficiaries[index], index + 1);
        beneficiariesContent.push(beneficiaryContent);
    }

    const beneficiariesMarkup = beneficiariesContent.join(' ');

    return `<div class="change-container">

    <p class="text-with-indent">Дополнить раздел ВЫГОДОПРИОБРЕТАТЕЛИ НА СЛУЧАЙ СМЕРТИ ЗАСТРАХОВАННОГО
    разделом ВЫГОДОПРИОБРЕТАТЕЛИ НА СЛУЧАЙ РИСКА "${riskName?.toUpperCase() ?? 'РИСК НЕ УКАЗАН'}" в следующей редакции:</p>

    <div class="policy_item">
        ВЫГОДОПРИОБРЕТАТЕЛИ НА СЛУЧАЙ РИСКА "${riskName?.toUpperCase() ?? 'РИСК НЕ УКАЗАН'}"
    </div>

    <table class="person">
        <col class="col1">
        <col class="col2">
        <col class="col3">
        <col class="col4">
        <col class="col5">
        <col class="col6">
        <col class="col7">
        ${beneficiariesMarkup}
    </table>

    ${stamp}

    </div>`;
}

function getAdditionalRiskBeneficiaryContent(beneficiary, beneficiaryIndex) {

    return `
        <tr>
            <td class="tgrey" colspan=7>Выгодоприобретатель ${beneficiaryIndex}. Доля ${round(beneficiary.share * 100)}%</td>
        </tr>
        <tr>
            <td class="tgrey">Фамилия Имя Отчество, Дата рождения:</td>
            <td class="twhite" colspan=4>${beneficiary.partyFullName}, ${printoutsHelper.formatDatePrint(beneficiary.dateOfBirth ?? '')}</td>
            <td class="tgrey">Пол:</td>
            <td class="twhite  center">${beneficiary.personGender ? (beneficiary.personGender == 'Male' ? 'Мужской' : 'Женский') : ''}</td>
        </tr>`;
}

function getAdditionalBeneficiariesStamp() {

    return `

    <div id="stamp-container" class="extra-small-text">

        <div id="stamp-info-container">

            <span>Подпись Страховщика:</span>
            <span
                class='underline-span'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
            <span>/&nbsp&nbsp</span>
            <span class='underline-span'>Пушкарев Максим Сергеевич</span>
            <span>/&nbsp</span>
            <br>
            <p class='bottom-row-spacer'>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp(подпись)
            </p>
            <p>Первый заместитель Генерального директора, Директор партнерских продаж</p>
            <p>на основании доверенности № 192 от 29 декабря 2020 г.</p>
            <p class='bottom-row-spacer'>
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspмп
            </p>
        </div>

        <img id='signature-image' src='./img/stampAndSignature.png'>

    </div>`;
}

module.exports = {
    getNonFinAmendmentApplyResult,
    updateChangesRelatedData,
    getDefaultAmendmentDataForPolicy,
    getNonFinChangeMailMappingResult,
    getFinAmendmentApplyResult,
    objectComparison
};
