
const { injuryPaymentNotes } = require('@config-rgsl/claim-base/lib/InjuryPaymentNotes');
const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const {
    insuredEventStates,
    insuredEventReasons,
    endowmentPaymentLinesGroups,
    endowmentPaymentLineWeight,
    endowmentPaymentLineType,
    defaultEndowmentBeneficiaryPaymentType,
    defaultEndowmentBeneficiaryReason,
    investmentProfitTypes,
    endowmentEventType,
    endowmentStates,
    claimPaymentLineType,
    claimStates } = require('@config-rgsl/claim-base/lib/claimConsts');
const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');
const { claimRisks } = require('@config-rgsl/claim-base/lib/ClaimRisks');
const { getPartyData } = require('@config-rgsl/life-insurance/lib/partyUtils');

function setClaimPaymentLines(body) {

    const selectedRisk = body.mainAttributes.selectedRisk;
    let currentPaymentLines = body.claimAmounts.paymentLines ?? [];
    const paymentLinesToSet = [];

    if (!selectedRisk) {

        currentPaymentLines = paymentLinesToSet;
    }

    const existingAmountPaymentLine = currentPaymentLines.find(line => line.lineType === claimPaymentLineType.mainAmount);
    const existingInvProfitPaymentLine = currentPaymentLines.find(line => line.lineType === claimPaymentLineType.invProfitSlp);

    paymentLinesToSet.push({
        lineType: claimPaymentLineType.mainAmount,
        lineAmountInContractCurrency: existingAmountPaymentLine?.lineAmountInContractCurrency ?? 0,
        lineAmountInRubCurrency: existingAmountPaymentLine?.lineAmountInRubCurrency ?? 0,
        weight: 1
    });

    const riskConf = claimRisks({ riskCode: selectedRisk.riskCode }) ?? {};

    if (riskConf?.isDeathRisk) {

        paymentLinesToSet.push({
            lineType: claimPaymentLineType.invProfitSlp,
            lineAmountInContractCurrency: existingInvProfitPaymentLine?.lineAmountInContractCurrency ?? 0,
            lineAmountInRubCurrency: existingInvProfitPaymentLine?.lineAmountInRubCurrency ?? 0,
            weight: 1
        });
    }

    body.claimAmounts.paymentLines = paymentLinesToSet;
}

function calculateClaimAmounts(body, claimState, investProfitRates, existingPaymentOrders) {

    updateClaimPaymentLinesRubCurrency(body);

    const percentage = body.claimAmounts.paymentPercentage;
    const selectedRisk = body.mainAttributes.selectedRisk;
    const eventDate = body.mainAttributes.insuredEvent.insuredEventDate;

    let riskAmount = 0;

    if (selectedRisk) {

        const riskPeriods = body.mainAttributes.risksInsuredSumByPeriod.find(item => item.riskCode === selectedRisk.riskCode);
        riskAmount = getRiskInsuredSumByPeriod(selectedRisk, eventDate, riskPeriods);
    }

    const currentPaymentLines = body.claimAmounts.paymentLines ?? [];
    const paymentLinesManualCorrection = body.claimAmounts.paymentLinesManualCorrection;
    const existingAmountPaymentLine = currentPaymentLines.find(line => line.lineType === claimPaymentLineType.mainAmount);
    const existingInvProfitPaymentLine = currentPaymentLines.find(line => line.lineType === claimPaymentLineType.invProfitSlp);

    if (existingAmountPaymentLine && !paymentLinesManualCorrection) {

        if ((percentage || percentage === 0) && riskAmount) {

            const useFixedExchangeRate = body.claimAmounts.useFixedExchangeRate ?? false;
            const exchangeRate = useFixedExchangeRate ?
                body.claimAmounts.fixedExchangeRate :
                body.claimAmounts.exchangeRate;

            const convertedRiskAmount = round(riskAmount * percentage);
            const amontInLocalCurrency = round(convertedRiskAmount * exchangeRate);
            existingAmountPaymentLine.lineAmountInContractCurrency = convertedRiskAmount;
            existingAmountPaymentLine.lineAmountInRubCurrency = amontInLocalCurrency;
        }
        else {

            existingAmountPaymentLine.lineAmountInContractCurrency = 0;
            existingAmountPaymentLine.lineAmountInRubCurrency = 0;
        }
    }

    if (existingInvProfitPaymentLine && claimState == claimStates.claimManagerApproval) {

        const rates = investProfitRates ?? [];

        if (rates.length === 1) {

            const useFixedExchangeRate = body.claimAmounts.useFixedExchangeRate ?? false;
            const exchangeRate = useFixedExchangeRate ?
                body.claimAmounts.fixedExchangeRate :
                body.claimAmounts.exchangeRate;

            const invProfitAmount = rates[0].Rate;
            const amontInLocalCurrency = round(invProfitAmount * exchangeRate);
            existingInvProfitPaymentLine.lineAmountInContractCurrency = invProfitAmount;
            existingInvProfitPaymentLine.lineAmountInRubCurrency = amontInLocalCurrency;
        }
        else {

            existingInvProfitPaymentLine.lineAmountInContractCurrency = 0;
            existingInvProfitPaymentLine.lineAmountInRubCurrency = 0;
        }
    }

    const totalAmount = calculateTotalClaimAmount(body);
    body.claimAmounts.requestedClaimAmount = totalAmount?.amountInRubCurrency ?? 0;

    if (!body.claimAmounts.rznu) {

        body.claimAmounts.rznu = body.claimAmounts.requestedClaimAmount ?? 0;
    }

    recalculateBeneficiariesAmount(body, existingPaymentOrders);
}

async function calculateCollectiveClaimAmounts(body, claimNumber, ambientProperties) {

    const totalAmountRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/CollectiveClaimRecipientsSumDataSource',
        data: {
            data: {
                criteria: {
                    claimNumber: claimNumber
                }
            }
        }
    };

    const result = await ambientProperties.services.api.call(totalAmountRequest);
    const totalAmount = result.data?.totalAmount ?? 0;

    const useFixedExchangeRate = body.claimAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ?
        body.claimAmounts.fixedExchangeRate :
        body.claimAmounts.exchangeRate;

    body.claimAmounts.paymentAmountInDocCurrency = totalAmount;
    body.claimAmounts.paymentAmountInRubCurrency = round(totalAmount * exchangeRate);
}

function recalculateBeneficiariesAmount(body, existingPaymentOrders) {

    const beneficiaries = body.claimBeneficiaries ?? [];
    const useFixedExchangeRate = body.claimAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ?
        body.claimAmounts.fixedExchangeRate :
        body.claimAmounts.exchangeRate;

    beneficiaries.forEach(item => {

        const relatedPaymentOrder = existingPaymentOrders.find(po => po.beneficiaryCode === item.partyCode);

        if (relatedPaymentOrder) {

            return;
        }

        const requestedAmount = body.claimAmounts.requestedClaimAmount ?? 0;

        if (!item.isCalcFromAmountToPay) {

            const percentage = item.amountToPayPercetage;

            if ((percentage || percentage === 0) && requestedAmount) {

                const convertedAmount = round(requestedAmount * percentage);
                const amontInLocalCurrency = round(convertedAmount * exchangeRate);
                item.amountToPay = convertedAmount;
                item.amountToPayInRubCurrency = amontInLocalCurrency;
            }
            else {

                delete item.amountToPay;
                delete item.amountToPayInRubCurrency;
            }
        }
        else {

            const manualAmountToPay = item.amountToPay;

            if ((manualAmountToPay || manualAmountToPay === 0) && requestedAmount) {

                const percentage = manualAmountToPay / requestedAmount;
                item.amountToPayPercetage = percentage;
                const amontInLocalCurrency = round(manualAmountToPay * exchangeRate);
                item.amountToPayInRubCurrency = amontInLocalCurrency;
            }
            else {

                delete item.amountToPayPercetage;
                delete item.amountToPayInRubCurrency;
            }
        }
    });
}

function calculateTotalClaimAmount(body) {

    const paymentLines = body.claimAmounts.paymentLines ?? [];

    let totalAmount = paymentLines.reduce((previousValue, currentValue) => previousValue + currentValue.lineAmountInContractCurrency, 0);
    totalAmount = Math.max(0, totalAmount);

    let totalAmountRub = paymentLines.reduce((previousValue, currentValue) => previousValue + currentValue.lineAmountInRubCurrency, 0);
    totalAmountRub = Math.max(0, totalAmountRub);

    return {
        amountInContractCurrency: round(totalAmount),
        amountInRubCurrency: round(totalAmountRub)
    };
}

function updateClaimPaymentLinesRubCurrency(body) {

    const paymentLines = body.claimAmounts.paymentLines ?? [];

    paymentLines.forEach(line => {

        const lineAmount = line.lineAmountInContractCurrency;

        if (lineAmount) {

            const useFixedExchangeRate = body.claimAmounts.useFixedExchangeRate ?? false;
            const exchangeRate = useFixedExchangeRate ? body.claimAmounts.fixedExchangeRate : body.claimAmounts.exchangeRate;
            line.lineAmountInRubCurrency = round(lineAmount * exchangeRate);
        }
        else {

            line.lineAmountInRubCurrency = 0;
        }
    });
}

function getRiskInsuredSumByPeriod(risk, atDate, riskPeriods) {

    if (riskPeriods && riskPeriods.periods && riskPeriods.periods.length > 0) {

        if (!atDate) {

            return;
        }

        const period = riskPeriods.periods.find(period => period.startDate <= atDate && period.endDate >= atDate);
        return period ? period.insuredSum : undefined;
    }


    return risk.riskInsuredSum;

}

function fillInjuriesNotes(body, injuriesCodes) {

    if (!body.tempTechnicalData) {

        body.tempTechnicalData = {};
    }

    body.tempTechnicalData.injuriesNotes = [];

    injuriesCodes.forEach(code => {

        const notes = injuryPaymentNotes({ coefficientCode: code });

        if (notes && notes.length > 0) {

            notes.forEach(note => body.tempTechnicalData.injuriesNotes.push({ noteText: note.noteText }));
        }
    });
}

async function checkIfInsuredEventActive(insuredEventCode, ambientProperties) {

    const inusredEventRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/InsuredEventSearchDataSource',
        data: {
            data: {
                criteria: {
                    documentCode: insuredEventCode,
                    documentState: insuredEventStates.confirmed
                }
            }
        }
    };

    let isInsuredEventActive = false;

    const result = await ambientProperties.services.api.call(inusredEventRequest);
    if (result && result.data && result.data.length > 0) {

        isInsuredEventActive = true;
    }
    return isInsuredEventActive;
}

function getDefaultEndowmentBody(body, eventTypeToSet, configurationCodeName, documentNumber) {

    const endowmentBody = {
        mainAttributes: {
            contract: {
                number: documentNumber,
                holder: body.policyHolder.partyData.partyFullName,
                configurationName: configurationCodeName
            },
            applicationInfo: {
                applicant: {
                    partyCode: body.insuredPerson.partyData.partyCode,
                    partyType: body.insuredPerson.partyData.partyType,
                    fullName: body.insuredPerson.partyData.partyFullName
                }
            },
            eventType: eventTypeToSet
        },
        endowmentBeneficiaries: [
            {
                partyCode: body.insuredPerson.partyData.partyCode,
                partyType: body.insuredPerson.partyData.partyType,
                fullName: body.insuredPerson.partyData.partyFullName,
                beneficiaryReason: defaultEndowmentBeneficiaryReason,
                beneficiaryPaymentType: defaultEndowmentBeneficiaryPaymentType,
                amountToPayPercetage: 1
            }
        ],
        endowmentAmounts: {
            paymentLines: [],
            fixedExchangeRate: body.basicConditions.exchangeRate,
            useFixedExchangeRate: !!body.basicConditions.exchangeRate
        },
        technicalData: {
            policyPaymentInfo: [],
            policyInfo: {
                startDate: body.policyTerms.startDate,
                endDate: body.policyTerms.endDate,
                policyHolder: {
                    name: body.policyHolder.partyData.partyFullName,
                    code: body.policyHolder.partyData.partyCode
                },
                insuredPerson: {
                    name: body.insuredPerson.partyData.partyFullName,
                    code: body.insuredPerson.partyData.partyCode
                }
            },
            cbRateInfo: []
        }
    };

    if (eventTypeToSet.code === endowmentEventType.code) {

        const paymentVariant = body.basicConditions.endowmentPaymentVariant;

        if (paymentVariant) {

            endowmentBody.endowmentPaymentVariant = {
                code: paymentVariant.endowmentPaymentVariantCode,
                description: paymentVariant.endowmentPaymentVariantDescription
            };
        }
    }

    const policyRisks = body.risks ?? [];

    endowmentBody.mainAttributes.availableRisks = policyRisks.map(r => {

        return {
            riskCode: r.risk.riskCode,
            riskShortDescription: r.risk.riskShortDescription,
            riskInsuredSum: r.riskInsuredSum,
            startDate: r.startDate,
            endDate: r.endDate
        };
    });

    const insuredSumByPeriod = policyRisks.map(r => {

        const periods = r.riskInsuredSumByPeriod?.map(p => {

            return {
                insuredSum: p.insuredSum,
                startDate: p.periodStartDate,
                endDate: p.periodEndDate
            };
        });

        const result = {
            riskCode: r.riskCode,
            periods: periods
        };

        return result;
    });

    endowmentBody.mainAttributes.risksInsuredSumByPeriod = insuredSumByPeriod;

    endowmentBody.endowmentAmounts.contractCurrency = body.basicConditions.currency.currencyCode;
    endowmentBody.endowmentAmounts.paymentLines = [];

    return endowmentBody;
}

function calculateEndowmentAmounts(body, previousEndowmentPayments, relatedPaymentOrders, installements, investProfitRates, partiesData, endowmentState) {

    updatePaymentLinesRubCurrency(body);

    const paymentLinesManualCorrection = body.endowmentAmounts.paymentLinesManualCorrection;

    if (!paymentLinesManualCorrection) {

        calculateMainAmount(body);
    }

    if (endowmentState === endowmentStates.operationsApproval) {

        setInvestProfit(body, investProfitRates ?? [], paymentLinesManualCorrection);
    }

    calculateDebt(body, installements);

    if (paymentLinesManualCorrection) {

        setPercentage(body, relatedPaymentOrders);
    }

    calculateBeneficiariesPit(body, previousEndowmentPayments, relatedPaymentOrders, partiesData);
    recalculateEndowmentBeneficiariesAmount(body, relatedPaymentOrders);

    if (!body.endowmentAmounts.manualRznu) {

        setRznu(body);
    }
}

function updatePaymentLinesRubCurrency(body) {

    const paymentLines = body.endowmentAmounts.paymentLines ?? [];

    paymentLines.forEach(line => {

        if (line.lineType !== endowmentPaymentLineType.PIT) {

            const lineAmount = line.lineAmountInContractCurrency;

            if (lineAmount) {

                const useFixedExchangeRate = body.endowmentAmounts.useFixedExchangeRate ?? false;
                const exchangeRate = useFixedExchangeRate ? body.endowmentAmounts.fixedExchangeRate : body.endowmentAmounts.exchangeRate;
                line.lineAmountInRubCurrency = round(lineAmount * exchangeRate);
            }
            else {

                line.lineAmountInRubCurrency = 0;
            }
        }
    });
}

function calculateMainAmount(body) {

    const selectedRisk = body.mainAttributes.selectedRisk;
    const eventDate = body.mainAttributes.applicationInfo.eventDate;
    const currentPaymentLines = body.endowmentAmounts.paymentLines ?? [];
    const currentSurrenderValue = currentPaymentLines.find(item => item.lineType === endowmentPaymentLineType.surrenderValue);

    if (!selectedRisk) {

        if (currentSurrenderValue) {

            currentSurrenderValue.lineAmountInContractCurrency = 0;
        }

        return;
    }

    const riskPeriods = body.mainAttributes.risksInsuredSumByPeriod.find(item => item.riskCode === selectedRisk.riskCode);
    const riskInsuredSum = getRiskInsuredSumByPeriod(selectedRisk, eventDate, riskPeriods);

    if (currentSurrenderValue) {

        currentSurrenderValue.lineAmountInContractCurrency = riskInsuredSum;

        const useFixedExchangeRate = body.endowmentAmounts.useFixedExchangeRate ?? false;
        const exchangeRate = useFixedExchangeRate ? body.endowmentAmounts.fixedExchangeRate : body.endowmentAmounts.exchangeRate;

        currentSurrenderValue.lineAmountInRubCurrency = round(riskInsuredSum * exchangeRate);
    }
}

function calculateTotalEndowmentAmount(body) {

    const paymentLines = body.endowmentAmounts.paymentLines ?? [];

    const paymentLinesToAdd = paymentLines.filter(l => l.lineType !== endowmentPaymentLineType.debt && l.lineType !== endowmentPaymentLineType.PIT);
    const paymentLinesToAddRub = paymentLines.filter(l => l.lineType !== endowmentPaymentLineType.debt);

    const debt = paymentLines.find(l => l.lineType === endowmentPaymentLineType.debt)?.lineAmountInContractCurrency ?? 0;
    const debtRub = paymentLines.find(l => l.lineType === endowmentPaymentLineType.debt)?.lineAmountInRubCurrency ?? 0;

    const pit = paymentLines.find(l => l.lineType === endowmentPaymentLineType.PIT)?.lineAmountInRubCurrency ?? 0;

    let totalAmount = paymentLinesToAdd.reduce((previousValue, currentValue) => previousValue + currentValue.lineAmountInContractCurrency, 0) - debt;
    totalAmount = Math.max(0, totalAmount);

    let totalAmountRub = paymentLinesToAddRub.reduce((previousValue, currentValue) => previousValue + currentValue.lineAmountInRubCurrency, 0) - debtRub - pit;
    totalAmountRub = Math.max(0, totalAmountRub);

    return {
        amountInContractCurrency: round(totalAmount),
        amountInRubCurrency: round(totalAmountRub)
    };
}

function setPercentage(body, existingPaymentOrders) {

    const paymentLines = body.endowmentAmounts.paymentLines ?? [];
    const pitAmount = paymentLines.find(l => l.lineType === endowmentPaymentLineType.PIT)?.lineAmountInContractCurrency ?? 0;
    let requestedAmount = calculateTotalEndowmentAmount(body).amountInContractCurrency;
    requestedAmount = requestedAmount - pitAmount;
    const beneficiaries = body.endowmentBeneficiaries ?? [];

    beneficiaries.forEach(item => {

        const relatedPaymentOrder = existingPaymentOrders.find(po => po.beneficiaryCode === item.partyCode && po.paymentOrderSubType === 'Endowment');
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
}

function recalculateEndowmentBeneficiariesAmount(body, existingPaymentOrders) {

    const paymentLines = body.endowmentAmounts.paymentLines ?? [];
    const pitAmount = paymentLines.find(l => l.lineType === endowmentPaymentLineType.PIT)?.lineAmountInRubCurrency ?? 0;
    let requestedAmount = calculateTotalEndowmentAmount(body)?.amountInRubCurrency ?? 0;
    requestedAmount = requestedAmount - pitAmount;

    const useFixedExchangeRate = body.endowmentAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ? body.endowmentAmounts.fixedExchangeRate : body.endowmentAmounts.exchangeRate;

    const beneficiaries = body.endowmentBeneficiaries ?? [];

    beneficiaries.forEach(item => {

        const relatedPaymentOrder = existingPaymentOrders.find(po => po.beneficiaryCode === item.partyCode &&
            po.paymentOrderSubType === 'Endowment' &&
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
}

function setRznu(body) {

    const calculatedTotalAmount = calculateTotalEndowmentAmount(body).amountInContractCurrency;
    body.endowmentAmounts.rznu = calculatedTotalAmount;
}

function setInvestProfit(body, investProfitRates, paymentLinesManualCorrection) {

    const currentPaymentLines = body.endowmentAmounts.paymentLines ?? [];
    const calculatedItems = investProfitRates ?? [];

    if (calculatedItems.length === 0) {

        currentPaymentLines.forEach(element => {

            if (element.lineType === endowmentPaymentLineType.investProfit ||
                element.lineType === endowmentPaymentLineType.investProfitCoupon ||
                element.lineType === endowmentPaymentLineType.investProfitAnnual ||
                (element.lineType === endowmentPaymentLineType.dividends && !paymentLinesManualCorrection)) {

                element.lineAmountInContractCurrency = 0;
                element.lineAmountInRubCurrency = 0;
            }
        });

        return;
    }

    calculatedItems.forEach(element => {

        let paymentLine;

        switch (element.PaymentType) {
            case investmentProfitTypes.investProfit.code:
                paymentLine = currentPaymentLines.find(l => l.lineType === endowmentPaymentLineType.investProfit);
                setPaymentLineValue(body, paymentLine, element.Rate ?? 0);
                break;
            case investmentProfitTypes.investProfitCoupon.code:
                paymentLine = currentPaymentLines.find(l => l.lineType === endowmentPaymentLineType.investProfitCoupon);
                setPaymentLineValue(body, paymentLine, element.Rate ?? 0);
                break;
            case investmentProfitTypes.investProfitAnnual.code:
                paymentLine = currentPaymentLines.find(l => l.lineType === endowmentPaymentLineType.investProfitAnnual);
                setPaymentLineValue(body, paymentLine, element.Rate ?? 0);
                break;
            case investmentProfitTypes.dividends.code:
                paymentLine = currentPaymentLines.find(l => l.lineType === endowmentPaymentLineType.dividends);
                setPaymentLineValue(body, paymentLine, element.Rate ?? 0);
                break;
        }
    });
}

function setPaymentLineValue(body, paymentLine, profitRate) {

    paymentLine.lineAmountInContractCurrency = profitRate;
    const useFixedExchangeRate = body.endowmentAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ? body.endowmentAmounts.fixedExchangeRate : body.endowmentAmounts.exchangeRate;
    paymentLine.lineAmountInRubCurrency = round(profitRate * exchangeRate);
}

async function calculateDebt(body, installements) {

    const currentPaymentLines = body.endowmentAmounts.paymentLines ?? [];
    const eventDate = body.mainAttributes.applicationInfo?.eventDate;
    const debtPaymentLine = currentPaymentLines.find(l => l.lineType === endowmentPaymentLineType.debt);

    if (!eventDate || !debtPaymentLine) {

        return;
    }

    installements = installements.filter(i => i.dueDate <= eventDate);

    const debt = installements.reduce((previousValue, currentValue) => previousValue + currentValue.underpaymentSum, 0);
    debtPaymentLine.lineAmountInContractCurrency = debt;

    const useFixedExchangeRate = body.endowmentAmounts.useFixedExchangeRate ?? false;
    const exchangeRate = useFixedExchangeRate ? body.endowmentAmounts.fixedExchangeRate : body.endowmentAmounts.exchangeRate;

    debtPaymentLine.lineAmountInRubCurrency = round(debt * exchangeRate);
}

function calculateBeneficiariesPit(body, previousEndowmentPayments, existingPaymentOrders, partiesData) {

    const paymentLines = body.endowmentAmounts.paymentLines ?? [];
    const pitLine = paymentLines.find(item => item.lineType === endowmentPaymentLineType.PIT);
    const beneficiaries = body.endowmentBeneficiaries ?? [];
    const paymentInfo = body.technicalData?.policyPaymentInfo ?? [];
    const eventDate = body.mainAttributes.applicationInfo.eventDate;
    const policyHolderCode = body.technicalData.policyInfo.policyHolder.code;

    if (!eventDate || paymentInfo.length === 0 || !pitLine) {

        beneficiaries.forEach(item => {

            delete item.pitAmount;
            delete item.pitAmountInRubCurrency;
            delete item.isManualPit;
        });

        return;
    }

    pitLine.lineAmountInContractCurrency = 0;
    pitLine.lineAmountInRubCurrency = 0;

    const policyPeriodsInfo = getPolicyPeriodsInfo(body, paymentInfo);
    const holderData = partiesData.find(item => item.code === policyHolderCode);
    const calcData = getTaxableAmountCalcData(holderData, paymentInfo, policyPeriodsInfo, body);

    beneficiaries.forEach(item => {

        const relatedPaymentOrder = existingPaymentOrders.find(po => po.beneficiaryCode === item.partyCode &&
            po.paymentOrderSubType === 'EndowmentPIT' &&
            po.paymentOrderNumber === item.assignedPitPaymentOrderNumber);
        const isManulaPit = item.isManualPit ?? false;

        const percentage = item.amountToPayPercetage ?? 0;
        const beneficiaryEndowmentAmount = calcData.endowmentAmountRub * percentage;

        if (!relatedPaymentOrder && !isManulaPit) {

            const beneficiaryData = partiesData.find(data => data.code === item.partyCode);
            const beneficiaryTaxResidencies = beneficiaryData.partyTaxResidencies ?? [];

            const periodsEndDate = dateUtils.substractDays(eventDate, 1);
            const periodsStartDate = dateUtils.substractYears(periodsEndDate, 1);

            const otherCountriesPeriods = beneficiaryTaxResidencies.filter(item =>
                item.startDate <= periodsEndDate &&
                item.endDate >= periodsStartDate &&
                item.residenceCountry.countryCode !== partyConstants.countryRussia.countryCode);

            const totalOtherCountriesDays = otherCountriesPeriods.reduce((sum, current) => {

                const periodStartDate = periodsStartDate > current.startDate ? periodsStartDate : current.startDate;
                const periodEndDate = periodsEndDate < current.endDate ? periodsEndDate : current.endDate;
                const days = dateUtils.getDayDifference(periodStartDate, periodEndDate);
                return sum + days;
            }, 0) ?? 0;

            let pit = 0;
            let beneficiaryTaxableAmount = 0;
            const previousPaymentsSum = previousEndowmentPayments.find(i => i.partyCode === item.partyCode)?.sumRubCurrency ?? 0;

            if (beneficiaryEndowmentAmount > calcData.policyPayment) {

                const calculatedTaxableAmount = round(((beneficiaryEndowmentAmount + previousPaymentsSum) - calcData.policyPayment) + calcData.thirdPartyPaymentsSum);
                beneficiaryTaxableAmount = Math.max(0, calculatedTaxableAmount);
            }

            if (calcData.endowmentAmount > 0 && (percentage ?? 0) > 0) {

                if (totalOtherCountriesDays < 183) {

                    if (beneficiaryTaxableAmount < 5000000) {

                        pit = beneficiaryTaxableAmount * 0.13;
                    }
                    else {

                        pit = beneficiaryTaxableAmount * 0.15;
                    }
                }
                else {

                    pit = beneficiaryTaxableAmount * 0.3;
                }
            }

            item.pitAmount = undefined;
            item.pitAmountInRubCurrency = round(pit, 0);
        }
    });

    const totalPit = beneficiaries.reduce((sum, current) => sum + (current?.pitAmountInRubCurrency ?? 0), 0);

    pitLine.lineAmountInContractCurrency = undefined;
    pitLine.lineAmountInRubCurrency = totalPit;
}

function getPolicyPeriodsInfo(body, paymentInfo) {

    const cbRateInfo = body?.technicalData?.cbRateInfo || [];
    const policyStartDate = body.technicalData.policyInfo.startDate;
    const policyEndDate = body.technicalData.policyInfo.endDate;
    const policyPeriods = dateUtils.getPeriodsTable(policyStartDate, policyEndDate);
    const lastFullPeriod = policyPeriods[policyPeriods.length - 1];

    if (lastFullPeriod.periodEndDate !== policyEndDate) {

        lastFullPeriod.periodEndDate = policyEndDate;
    }

    const polcyPeriodsInfo = policyPeriods.map(item => {

        const payments = paymentInfo.filter(p => p.paymentDate >= item.periodStartDate && p.paymentDate <= item.periodEndDate);
        let rateCheckDates = [];
        const yearRates = [];

        rateCheckDates = dateUtils.getFirstDayOfEachMonthInPeriod(item.periodStartDate, item.periodEndDate);

        rateCheckDates.forEach(rateDate => {

            const filteredRates = cbRateInfo.filter(r => r.cbRateDate <= rateDate);
            const sortedRates = filteredRates.sort(function (a, b) { return new Date(b.cbRateDate) - new Date(a.cbRateDate); });

            if (sortedRates.length > 0) {

                yearRates.push(sortedRates[0].cbRate);
            }
        });

        const periodPaymentsAmounts = payments.reduce((sum, current) => sum + (current.payAmount * current.payRate), 0);
        const averageCbRate = yearRates.reduce((sum, current) => sum + current, 0) / rateCheckDates.length;
        const correctedAmount = (periodPaymentsAmounts / 100) * averageCbRate;

        return {
            year: item.year,
            periodStartDate: item.periodStartDate,
            periodEndDate: item.periodEndDate,
            periodPayments: payments,
            periodPaymentsAmounts: periodPaymentsAmounts,
            averageCbRate: averageCbRate,
            correctedAmount: correctedAmount
        };
    });

    return polcyPeriodsInfo;
}

function getTaxableAmountCalcData(holderData, paymentInfo, policyPeriodsInfo, body) {

    if (!holderData) {

        throw 'no holder data provided!';
    }

    const partyExcludedPersons = holderData.partyExcludedPersons ?? [];
    const partyExcludedPersonsNames = partyExcludedPersons.map(item => item.excludedPersonName);

    const thirdPartyPayments = paymentInfo.filter(item => item.payerName !== holderData.fullName && !partyExcludedPersonsNames.includes(item.payerName));
    const thirdPartyPaymentsSum = thirdPartyPayments.reduce((sum, current) => sum + (current.payAmount * current.payRate), 0);

    const correctedAmountSum = policyPeriodsInfo.reduce((sum, current) => sum + current.correctedAmount, 0);
    const amountSum = policyPeriodsInfo.reduce((sum, current) => sum + current.periodPaymentsAmounts, 0);
    const policyPayment = amountSum + correctedAmountSum;

    const endowmentAmount = calculateTotalEndowmentAmount(body);

    return {
        endowmentAmount: endowmentAmount?.amountInContractCurrency ?? 0,
        endowmentAmountRub: endowmentAmount?.amountInRubCurrency ?? 0,
        policyPayment: policyPayment,
        thirdPartyPaymentsSum: thirdPartyPaymentsSum
    };
}

function getKPKRequestData(body, partiesData, documentId, documentNumber) {

    const holder = body.tempTechnicalData.policyParties.holder;
    const insured = body.tempTechnicalData.policyParties.insuredPerson;

    const kpkRequestData = [];

    partiesData.forEach(item => {

        const output = {};
        output.Contractor = {};

        if (item.resultData.partyType === 'LegalEntity') {

            output.Contractor.JuridicalSection = {};
            output.Contractor.JuridicalSection.Group = '';
            output.Contractor.JuridicalSection.Name = item.resultData.shortName;
            output.Contractor.JuridicalSection.FullName = item.resultData.fullName;
            output.Contractor.JuridicalSection.INN = item.resultData.INNKIO;
            output.Contractor.JuridicalSection.KPP = item.resultData.KPP;
            output.Contractor.JuridicalSection.OGRN = item.resultData.OGRNOGRNIP;
        }

        if (item.resultData.partyType === 'NaturalPerson') {

            output.Contractor.PhisicalSection = {};
            output.Contractor.PhisicalSection.Group = '';
            output.Contractor.PhisicalSection.FullName = item.resultData.fullName;
            output.Contractor.PhisicalSection.Birthday = item.resultData.dateOfBirth;
            output.Contractor.PhisicalSection.Name = item.resultData.firstName;
            output.Contractor.PhisicalSection.Surname = item.resultData.lastName;
            output.Contractor.PhisicalSection.MiddleName = item.resultData.middleName;
            output.Contractor.PhisicalSection.Sex = item.resultData.personGender;

            const citizenship = item.resultData.citizenship || [];
            const Nationality = citizenship.length > 0 && citizenship[0].countryShortName || undefined;
            output.Contractor.PhisicalSection.Nationality = Nationality;

            const passports = item.resultData.identityDocuments.filter(doc => doc.identityDocumentType === 'passport');
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

            output.Contractor.PhisicalSection.BirthPlace = item.resultData.birthPlace;
            output.Contractor.PhisicalSection.INN = item.resultData.INNKIO;

            const Entrepreneur = item.resultData.naturalPersonCategory == 'soleProprietor' ? 1 : 0;
            output.Contractor.PhisicalSection.Entrepreneur = Entrepreneur;

            let SNILS = item.resultData.SNILS;

            if (SNILS) {

                SNILS = SNILS.replace(/ /gi, '').replace(/-/gi, '');
            }

            const PDL = item.resultData.isPublicOfficial ? 1 : 0;
            const PDLRelative = ((PDL === 1) && item.resultData.executivePerson?.executivePersonDesc === 'Родственник ПДЛ') ? 1 : 0;
            const PDLRelativeDegree = (PDLRelative === 1) && item.resultData.relationType;
            const IPDL = ((PDL == 1) && item.resultData.executivePerson?.executivePersonDesc == 'Иностранное ПДЛ') ? 1 : 0;

            output.Contractor.PhisicalSection.PDL = PDL;
            output.Contractor.PhisicalSection.PDLRelative = PDLRelative;
            output.Contractor.PhisicalSection.PDLRelativeDegree = PDLRelativeDegree;
            output.Contractor.PhisicalSection.IPDL = IPDL;
        }

        output.Contractor.NonResident = item.resultData.isNonResident;

        const partyEmails = item.resultData.partyEmails || [];
        const preferableEmails = partyEmails.filter(e => e.isPreferable);
        const Email = preferableEmails.length > 0 ? preferableEmails[0].email : (partyEmails.length > 0 ? partyEmails[0].email : undefined);

        if (Email) {

            if (!output.Contractor.Contacts) {

                output.Contractor.Contacts = {};
            }

            output.Contractor.Contacts.Email = Email;
        }

        const partyPhones = item.resultData.partyPhones || [];
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

        output.Contractor.OuterID = item.resultData.partyId;

        if (item.resultData.code === holder.personCode) {

            output.Contractor.Role = 'Клиент';
        }
        else if (item.resultData.code === insured.personCode) {

            output.Contractor.Role = 'Иное';
        }
        else {

            output.Contractor.Role = 'Выгодоприобретатель';
        }

        const partyBankAccounts = item.resultData.bankAccounts ?? [];
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

        if (holder.personCode === item.resultData.code || insured.personCode === item.resultData.code) {

            output.Contractor.RelationshipEndDate = body.tempTechnicalData?.policyEndDate;
            output.Contractor.RelationshipBeginDate = body.tempTechnicalData?.policyIssueDate;
        }
        else {

            output.Contractor.RelationshipEndDate = body.mainAttributes?.applicationInfo?.statementReceivedDate;
            output.Contractor.RelationshipBeginDate = body.mainAttributes?.applicationInfo?.statementReceivedDate;
        }

        output.Document = {
            DocumentUID: documentId,
            DocumentNumber: documentNumber,
            Representation: 'Дожитие/ДИД ' + documentNumber,
            TypeOperation: 'Расход',
            Summ: 0,
            CheckAgreement: 0,
            BatchUpload: 0
        };

        output.BaseID = 'ADINSURE';

        const request = {
            itemCode: item.resultData.code,
            itemData: output
        };

        kpkRequestData.push(request);
    });

    return kpkRequestData;
}

function setEndowmentPaymentLines(body) {

    const eventType = body.mainAttributes.eventType?.code;
    const eventReason = body.mainAttributes.eventReason?.code;

    if (!eventType || !eventReason) {

        body.endowmentAmounts.paymentLines = [];
        return;
    }

    const currentPaymentLines = body.endowmentAmounts.paymentLines ?? [];
    const paymentLinesTypesToSet = endowmentPaymentLinesGroups[eventType][eventReason] ?? [];
    const paymentLinesToSet = [];

    paymentLinesTypesToSet.forEach(item => {

        const lineWeight = endowmentPaymentLineWeight[item];
        const existingPaymentLine = currentPaymentLines.find(line => line.lineType === item);

        const line = {
            lineType: item,
            lineAmountInContractCurrency: existingPaymentLine ? existingPaymentLine.lineAmountInContractCurrency : 0,
            lineAmountInRubCurrency: existingPaymentLine ? existingPaymentLine.lineAmountInRubCurrency : 0,
            weight: lineWeight
        };

        paymentLinesToSet.push(line);
    });

    body.endowmentAmounts.paymentLines = paymentLinesToSet;
}

function getRootEndowmentBody(body, configurationCodeName, number) {
    const endowmentBody = getDefaultEndowmentBody(body, endowmentEventType, configurationCodeName, number);
    endowmentBody.mainAttributes.eventReason = insuredEventReasons.contractEnd;
    setEndowmentPaymentLines(endowmentBody);

    return {
        businessNumber: number,
        body: endowmentBody,
    };
}

/**
 * @translationKey {translationKey} NoEndowmentSelected
 * @translationKey {translationKey} EndowmentStatusChanged
 * @translationKey {translationKey} EndowmentStatusChangingFinishedWithErrors
 */
async function changeEndowmentStatus(transitionName, currentView, ambientProperties) {
    const config = ambientProperties.configurationCodeName.toUpperCase();
    const translate = ambientProperties.services.translate.getSync;

    const selected = currentView.getSelection();

    if (!selected || selected.length === 0) {
        ambientProperties.services.confirmationDialog.showConfirmation(config + '.NoEndowmentSelected', 'OK', 'OK', 2);
        return;
    }

    const requestData = selected.map(e => {
        return {
            number: e.resultData.endowmentNumber,
            state: e.resultData.documentStateCode
        };
    });

    const request = {
        method: 'post',
        url: `api/core/shared/integration-services/ChangeEndowmentStatus/1`,
        data: {
            data: {
                transitionName: transitionName,
                endowments: requestData
            }
        }
    };

    let result;
    try {
        currentView.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        currentView.stopBlockingUI();
    }

    let transitionResults = [];
    if (result) {
        transitionResults = result.data?.endowments || [];
    }

    const failedResults = transitionResults.filter(_ => !_.isStatusChanged);

    if (transitionResults.length > 0 && failedResults.length === 0) {
        ambientProperties.services.confirmationDialog.showConfirmation(config + '.EndowmentStatusChanged', 'OK', 'OK', 2);
    } else {
        const numbers = [];

        const failedEndowments = failedResults.map(_ => _.endowmentNumber);
        if (failedEndowments && failedEndowments.length > 0) {
            failedEndowments.forEach(_ => { numbers.push(_); });
        }

        const skippedEndowments = requestData.map(_ => _.number).filter(_ => !transitionResults.includes(_));
        if (skippedEndowments && skippedEndowments.length > 0) {
            skippedEndowments.forEach(_ => { numbers.push(_); });
        }

        let message;
        if (numbers.length > 0) {
            message = translate(config, 'EndowmentStatusChangingFinishedWithErrors', { documents: numbers.join(' ,') });
        } else {
            message = 'Unknown error';
        }

        ambientProperties.services.confirmationDialog.showConfirmation(message, 'OK', 'OK', 2);
    }

    currentView.search();
}

async function getPartyBankAccount(claimBeneficiary, ambientProperties, that) {

    const partyCode = claimBeneficiary.partyCode;
    const partyData = await getPartyData(ambientProperties, that, partyCode);
    const bankAccounts = partyData.body.partyBankAccounts[0];

    return bankAccounts;
}

module.exports = {
    getRiskInsuredSumByPeriod,
    calculateClaimAmounts,
    fillInjuriesNotes,
    recalculateBeneficiariesAmount,
    checkIfInsuredEventActive,
    getDefaultEndowmentBody,
    calculateDebt,
    calculateTotalEndowmentAmount,
    calculateMainAmount,
    calculateEndowmentAmounts,
    setRznu,
    getKPKRequestData,
    setEndowmentPaymentLines,
    getRootEndowmentBody,
    changeEndowmentStatus,
    calculateCollectiveClaimAmounts,
    calculateTotalClaimAmount,
    setClaimPaymentLines,
    getPartyBankAccount
};
