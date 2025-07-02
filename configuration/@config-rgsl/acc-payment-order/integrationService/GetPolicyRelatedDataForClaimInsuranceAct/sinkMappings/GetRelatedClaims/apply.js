const formatUtils = require('@config-rgsl/infrastructure/lib/FormatUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { risksCodes, kzRisks, deathRisks, anyReasonDisabilityRisks, injuryRisks, risksWithPaidDays } = require('@config-rgsl/claim-base/lib/claimConsts');
const { getRiskInsuredSumByPeriod } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');

module.exports = function mapping(sinkResult, sinkInput, sinkExchange, additionalDataSourcesResults) {

    const serviceInput = sinkExchange.serviceInput;
    const claimRecord = sinkResult.data.find(claim => claim.metadata.code === serviceInput.claimNumber).resultData;
    const currentBenificiary = claimRecord.claimBeneficiaries.find(b => b.partyCode === serviceInput.recipientPartyCode);

    const riskPeriods = claimRecord.risksInsuredSumByPeriod.find(item => item.riskCode === claimRecord.risk.riskCode);
    const riskInsuredSum = getRiskInsuredSumByPeriod(claimRecord.risk, claimRecord.insuredEvent.insuredEventDate, riskPeriods);

    sinkExchange.claimData = {
        riskInsuredSum: riskInsuredSum,
        riskInsuredSumFormated: formatUtils.formatNumberToMoney(riskInsuredSum, null, 2, ',', '.'),
        riskDescription: claimRecord.risk.riskShortDescription,
        riskCode: claimRecord.risk.riskCode,
        diagnosisDescription: claimRecord.diagnosisNote ? claimRecord.diagnosisNote : claimRecord.diagnosis.description,
        insuredEventTypeDescription: claimRecord.insuredEvent.insuredEventType.description,
        insuredEventReasonDescription: claimRecord.insuredEvent.insuredEventReason.description,
        paymentType: getPaymentType(currentBenificiary, serviceInput),
        beneficiaryReason: currentBenificiary.beneficiaryReason.description,
        paymentDescription: getPaymentDescription(claimRecord, riskInsuredSum),
        relatedClaims: sinkResult.data.filter(claim => claim.metadata.code !== serviceInput.claimNumber) ?? []
    };
};

function getPaymentType(currentBenificiary, input) {

    const docs = input.nettedDocuments;

    if (!input.hasNetting || docs.length === 0) {

        return currentBenificiary.beneficiaryPaymentType.description;
    }

    if (input.isFullNetting && docs.length === 1) {

        return `Взаимозачёт в счёт оплаты договора ${docs[0].documentNo} в полном размере`;
    }

    const docsMessages = [];

    docs.forEach(item => {

        const message = `в счёт оплаты договора ${item.documentNo} в размере ${item.amount}`;
        docsMessages.push(message);
    });

    let bankPaymentMessage = '';

    if (!input.isFullNetting) {

        bankPaymentMessage = ` и на расчётный счёт ${input.paymentAmount}`;
    }

    return `Взаимозачёт ${docsMessages.join(", ")}${bankPaymentMessage}`;
}

function getPaymentDescription(claim, riskInsuredSum) {

    let message = "";
    const riskCode = claim.risk.riskCode;

    const riskAdditionalAttributes = claim.riskAdditionalAttributes;
    const paymentAmount = claim.paymentAmountInDocCurrency;
    const calculatedPaymentRiskPercetage = round(paymentAmount / (riskInsuredSum / 100), 2);
    const paymentRiskPercetage = calculatedPaymentRiskPercetage;
    const disabilityGroup = riskAdditionalAttributes.disabilityGroup;
    const numberOfPaidDays = riskAdditionalAttributes.numberOfPaidDays;

    if (kzRisks.includes(riskCode)) {

        message = `Критическое заболевание - ${paymentRiskPercetage}%`;
    }
    else if (deathRisks.includes(riskCode)) {

        message = `Смерть Застрахованного лица по любой причине – ${paymentRiskPercetage}%`;
    }
    else if (anyReasonDisabilityRisks.includes(riskCode)) {

        message = `Установление ${disabilityGroup} группы инвалидности по любой причине  -  ${paymentRiskPercetage}%`;
    }
    else if (riskCode === risksCodes.disabilityByAccident) {

        message = `Установление ${disabilityGroup} группы инвалидности в результате несчастного случая  -  ${paymentRiskPercetage}%`;
    }
    else if (riskCode === risksCodes.jobLoss) {

        message = `Страховая выплата за каждый подтвержденный месяц в статусе безработного в размере среднемесячного дохода Застрахованного, предшествующих дате расторжения трудового договора, но не более максимального лимита ежемесячной выплаты, указанного в Договоре страхования по данному риску. Утрата работы на ${numberOfPaidDays} дней.`;
    }
    else if (riskCode === risksCodes.accidentLossOfAbilityToWork || riskCode === risksCodes.unableToWorkAnyReason) {

        message = `Страховая выплата за каждый подтвержденный день нетрудоспособности  на протяжении ${numberOfPaidDays} дней.`;
    }
    else if (riskCode === risksCodes.hospitalizationDueToAccident) {

        message = `Страховая выплата за каждый подтвержденный день стационарного лечения на протяжении ${numberOfPaidDays} дней. `;
    }

    if (injuryRisks.includes(riskCode)) {

        const injuries = riskAdditionalAttributes.injuries;
        const itemsDescription = [];

        injuries.forEach(item => {

            const paymentPercentage = item.paymentInjuryPercentage * 100 * item.numberOfInjuries;
            const description = `П. ${item.injuryDetails.code} (${paymentPercentage}%)`;
            itemsDescription.push(description);
        });

        const totalPercentage = claim.totalPaymentPercentage * 100;
        message = `${itemsDescription.join()}. Итого ${totalPercentage}% таблицы страховых выплат по риску "Травма Застрахованного в результате несчастного случая"`;
    }

    return message;
}
