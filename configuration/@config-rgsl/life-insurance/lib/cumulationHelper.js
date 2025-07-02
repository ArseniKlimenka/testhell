'use strict';

const { translationUtils } = require('@adinsure/runtime');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { LocalDate } = require('@js-joda/core');
const currentDate = LocalDate.now().toString();
const { DateTimeFormatter, ZonedDateTime, ZoneOffset } = require('@js-joda/core');
const { cumulationTrigger, cumulationTriggerDescription } = require('@config-rgsl/life-insurance/lib/cumulationConstants');
const checkDateTime = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern(DateTimeUtils.DateFormats.ECMASCRIPT_DATETIME));

function startCumulation(input, sinkExchange) {

    let triggersGroup = [];

    const policyHolderCode = input.policyHolder.partyCode;
    const insuredPersonCode = input.insuredPerson.partyCode;
    const isOneInsuredObject = policyHolderCode == insuredPersonCode;

    startCumulationByPartyCode(triggersGroup, input, sinkExchange, isOneInsuredObject, false);
    if (!isOneInsuredObject) {
        startCumulationByPartyCode(triggersGroup, input, sinkExchange, isOneInsuredObject, true);
    }

    triggersGroup = filterTriggersGroup(triggersGroup);

    sinkExchange.cumulation = {
        checkDateTime,
        triggersGroup
    };

    return {
        cumulation: sinkExchange.cumulation
    };
}

function startCumulationByPartyCode(triggersGroup, input, sinkExchange, isOneInsuredObject, isPolicyHolder) {

    const insuredObjectData = filterByInsuredObject(input, sinkExchange, isOneInsuredObject, isPolicyHolder);

    const party = insuredObjectData.party;
    const partyCode = party.partyCode;
    const partyType = party.participantType;
    const partyAge = party.ageOnIssueDate;
    const quoteProductCode = input.productCode;

    const risks = insuredObjectData.risks;

    const cumulationContracts = insuredObjectData.cumulationContracts;
    const cumulationRules = sinkExchange.cumulationRules;

    const documentNumber = input.documentNumber;
    sinkExchange.cumulationContractsByPartyCode = getCumulationContractsPartyType(cumulationContracts, partyCode, documentNumber);
    if (sinkExchange.cumulationContractsByPartyCode.length == 0) {
        return;
    }

    const quoteRisks = getQuoteRisks(risks, partyType, isOneInsuredObject);
    const groupsForCumulation = getGroupsForCumulation(quoteRisks, cumulationRules);

    if (groupsForCumulation.length == 0) {
        return;
    }

    const cumulationContractsByGroup = [];

    const cumulationRulesRisks = [...new Set(getCumulationRulesRisks(cumulationRules))];
    const risksForCumulation = filterQuoteRisksForCumulation(quoteRisks, cumulationRulesRisks);
    const risksForCumulationWithInfo = risks.filter(r => risksForCumulation.includes(r.risk.riskCode));

    const cumulationRulesRiskGroups = [...new Set(getCumulationRulesRiskGroups(cumulationRules))];
    const riskGroupsForCumulation = filterQuoteRisksForCumulation(groupsForCumulation, cumulationRulesRiskGroups);

    getQuoteInsuredSumByCumulationRisks(input, sinkExchange, cumulationContractsByGroup, risksForCumulationWithInfo, partyCode, partyType, partyAge);
    getContractsInsuredSumByCumulationRisks(input, sinkExchange, cumulationContractsByGroup, riskGroupsForCumulation);
    updateCountRisksInGroupRisks(cumulationContractsByGroup, cumulationRules, quoteRisks);
    checkCumulationContractsWithRules(cumulationRules, cumulationContractsByGroup, riskGroupsForCumulation, partyCode, partyType, partyAge, triggersGroup, quoteProductCode);
}

function filterByInsuredObject(input, sinkExchange, isOneInsuredObject, isPolicyHolder) {

    let party = input.insuredPerson;
    let risks = input.risks;
    let cumulationContracts = sinkExchange.cumulationContracts;

    if (!isOneInsuredObject) {

        if (isPolicyHolder) {

            party = input.policyHolder;
            risks = risks.filter(r => r.risk.riskPerson == "policyHolder");
            cumulationContracts = cumulationContracts.filter(cc => cc.riskPerson == "policyHolder");

        } else {

            risks = risks.filter(r => r.risk.riskPerson == "insuredPerson");
            cumulationContracts = cumulationContracts.filter(cc => cc.riskPerson == "insuredPerson");
        }
    }

    return {
        party,
        risks,
        cumulationContracts
    };
}

function checkCumulationContractsWithRules(cumulationRules, cumulationContractsByGroup, riskGroupsForCumulation, partyCode, partyType, partyAge, triggersGroup, quoteProductCode) {

    const cumulationRulesFiltered = cumulationRules.filter(cr =>
        riskGroupsForCumulation.includes(cr.riskGroupCode) &&
        (
            (cr.ageFrom && cr.ageTo && (partyAge >= cr.ageFrom && partyAge <= cr.ageTo)) ||
            (!cr.ageFrom && cr.ageTo && partyAge <= cr.ageTo) ||
            (!cr.ageTo && cr.ageFrom && partyAge >= cr.ageFrom) ||
            (!cr.ageFrom && !cr.ageTo)
        ) &&
        partyType == cr.riskPerson
    );
    const cumulationRulesToCheck = cumulationRulesFiltered.map(({ riskCode, productGroupCode, productCode, activeTo, activeFrom, groupCodeDescription, ...rest }) => rest);
    const cumulationRulesToCheckUnique = removeDuplicateObjects(cumulationRulesToCheck);

    cumulationContractsByGroup.forEach(cc => {

        const cumulationRulesToCheckUniqueByGroup = cumulationRulesToCheckUnique.filter(cr => cr.riskGroupCode == cc.riskGroupCode);

        cumulationRulesToCheckUniqueByGroup.forEach(rule => {

            let isLimitExceeded = false;
            const isApprovalNotRequired = rule.triggerCode == cumulationTrigger.ApprovalNotRequired;
            const maxRiskCount = rule.maxRiskCount;
            const maxRiskCountAlgorithm = rule.maxRiskCountAlgorithm;
            const maxRiskCountAlgorithmProductCodes = rule.maxRiskCountAlgorithmProductCodes;
            const isMaxRiskCountAlgorithm = maxRiskCountAlgorithm == "MAX_RISK_COUNT";
            const isPaymentFormAlgorithm = maxRiskCountAlgorithm == "PAYMENT_FORM";

            if (!isApprovalNotRequired) {

                // Исключение страховых сумм по рискам из расчёта на основании формы выплаты
                const isMaxRiskCountAlgorithmProduct = maxRiskCountAlgorithmProductCodes.length == 0 || maxRiskCountAlgorithmProductCodes.includes(quoteProductCode);
                const checkPaymentForm = maxRiskCount && isPaymentFormAlgorithm && isMaxRiskCountAlgorithmProduct;
                const checkMaxRiskCount = maxRiskCount && isMaxRiskCountAlgorithm && isMaxRiskCountAlgorithmProduct;

                if (checkPaymentForm) {

                    const contractsToCheckForExcludeInsSum = [...new Set(cc.groupRisks.filter(i => i.risksTotalCount > 1).map(i => i.contractNumber))];

                    contractsToCheckForExcludeInsSum.forEach(contractInGroupRisks => {

                        const contractRisks = cc.groupRisks.filter(i => i.contractNumber == contractInGroupRisks);
                        const contractRisksContainsWOPorSurrenderValues = contractRisks.some(i => i?.isWOP || i?.isSurrenderValues);
                        const contractRisksContainsInsuranceAmount = contractRisks.some(i => i?.isInsuranceAmount);

                        if (contractRisksContainsWOPorSurrenderValues && contractRisksContainsInsuranceAmount) {

                            cc.groupRisks.forEach((contractRisk, contractRiskIndex) => {
                                if (contractRisk.contractNumber == contractInGroupRisks && (!contractRisk?.isInsuranceAmount || !contractRisk?.riskPaymentForm)) {
                                    cc.groupRisks.splice(contractRiskIndex, 1);
                                }
                            });

                            const risksToExclude = contractRisks.filter(i => i?.isWOP || i?.isSurrenderValues);

                            const sumToExclude = risksToExclude.reduce((accumulator, obj) => {
                                return accumulator + obj.riskInsuredSumWithoutCashBack;
                            }, 0);

                            cc.riskGroupInsuredSum -= sumToExclude;
                            cc.riskGroupInsuredSumFixRate -= sumToExclude;
                        }
                    });

                    isLimitExceeded = checkIsAmountExceeded(rule, cc, isLimitExceeded);
                }

                if (checkMaxRiskCount && cc.cumulationContracts.length > maxRiskCount) {

                    isLimitExceeded = true;
                }

                if (!(checkPaymentForm || checkMaxRiskCount)) {

                    isLimitExceeded = checkIsAmountExceeded(rule, cc, isLimitExceeded);
                }
            }

            triggersGroup.push({
                ...cc,
                id: rule.id,
                ageCode: rule.ageCode,
                ageFrom: rule.ageFrom,
                ageTo: rule.ageTo,
                amountCode: rule.amountCode,
                amountFrom: rule.amountFrom,
                amountTo: rule.amountTo,
                activeCode: rule.activeCode,
                triggerCode: rule.triggerCode,
                triggerDescription: rule.triggerDescription,
                isLimitExceeded: isLimitExceeded
            });

        });
    });

}

function checkIsAmountExceeded(rule, cc, isLimitExceeded) {

    if (rule.amountFrom && rule.amountTo && (cc.riskGroupInsuredSumFixRate >= rule.amountFrom && cc.riskGroupInsuredSumFixRate <= rule.amountTo)) {
        isLimitExceeded = true;
    } else if (!rule.amountFrom && rule.amountTo && cc.riskGroupInsuredSumFixRate <= rule.amountTo) {
        isLimitExceeded = true;
    } else if (!rule.amountTo && rule.amountFrom && cc.riskGroupInsuredSumFixRate >= rule.amountFrom) {
        isLimitExceeded = true;
    } else if (!rule.amountFrom && !rule.amountTo) {
        isLimitExceeded = true;
    }

    return isLimitExceeded;
}

function filterTriggersGroup(triggersGroup) {
    const limitExceededGroupCodes = triggersGroup.filter(tg => tg.isLimitExceeded).map(tg => tg.riskGroupCode);
    return triggersGroup
        .filter(tg => (!limitExceededGroupCodes.includes(tg.riskGroupCode) && tg.triggerCode == cumulationTrigger.ApprovalNotRequired) ||
            (tg.isLimitExceeded && tg.triggerCode != cumulationTrigger.ApprovalNotRequired));
}

function removeDuplicateObjects(array) {

    if (Array.isArray(array)) {
        return Array.from(new Set(array.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
    }

    return [];
}

function getQuoteRisks(risks, partyType, isOneInsuredObject) {

    let quoteRisks = risks ?? [];

    if (partyType && !isOneInsuredObject) {

        quoteRisks = quoteRisks.filter(i => i.risk.riskPerson == partyType);

    }

    return quoteRisks.map(i => i.risk.riskCode);
}

function getGroupsForCumulation(quoteRisks, cumulationRules) {

    const quoteGroups = [];

    quoteRisks.forEach(currentRiskCode => {
        quoteGroups.push(findRiskGroupCodeByRiskCode(cumulationRules, currentRiskCode));
    });

    const groupsForCumulation = [...new Set(quoteGroups.filter(i => i != undefined))];

    return groupsForCumulation;
}

function getCumulationRulesRisks(cumulationRules) {

    cumulationRules = cumulationRules ?? [];

    return cumulationRules.map(i => i.riskCode);
}

function getCumulationRulesRiskGroups(cumulationRules) {

    cumulationRules = cumulationRules ?? [];

    return cumulationRules.map(i => i.riskGroupCode);
}

function filterQuoteRisksForCumulation(quoteRisks, cumulationRulesRisks) {

    return quoteRisks.filter(element => cumulationRulesRisks.includes(element));
}

function sumPremiumGroupByRiskGroupCode(cumulationContractsByGroup, riskGroupCode, insuredSumToAdd, contractNumber, currentRiskCode, currencyCode, currentCurrencyRate, riskCodeInfo) {

    cumulationContractsByGroup.forEach(item => {

        if (item.riskGroupCode === riskGroupCode) {

            if (!item.cumulationContracts.some(i => i.contractNumber == contractNumber)) {
                item.cumulationContracts.push({ contractNumber: contractNumber, currencyCode: currencyCode, currencyRate: currentCurrencyRate });
            }

            item.groupRisks.push({
                contractNumber: contractNumber,
                riskCode: currentRiskCode,
                riskInsuredSumWithoutCashBack: insuredSumToAdd,
                currencyCode: currencyCode,
                riskPaymentForm: riskCodeInfo?.riskPaymentForm,
                isInsuranceAmount: riskCodeInfo?.isInsuranceAmount,
                isSurrenderValues: riskCodeInfo?.isSurrenderValues,
                isWOP: riskCodeInfo?.isWOP,
            });
            item.riskGroupInsuredSum = +(item.riskGroupInsuredSum + insuredSumToAdd).toFixed(2);
            item.riskGroupInsuredSumFixRate = +(item.riskGroupInsuredSumFixRate + insuredSumToAdd * currentCurrencyRate).toFixed(2);
        }

        item.cumulationContracts = removeDuplicateObjects(item.cumulationContracts);
        item.groupRisks = removeDuplicateObjects(item.groupRisks);
    });
}

function getQuoteInsuredSumByCumulationRisks(input, sinkExchange, cumulationContractsByGroup, risksForCumulationWithInfo, partyCode, partyType, partyAge) {

    const documentNumber = input.documentNumber;
    const currencyCode = input.currencyCode;
    const cumulationRules = sinkExchange.cumulationRules;
    const cumulationCurrencyRates = sinkExchange.cumulationCurrencyRates;
    const riskCodesInfo = sinkExchange.riskCodesInfo;
    const currencyRate = getCurrencyRate(cumulationCurrencyRates, currencyCode);

    risksForCumulationWithInfo.forEach(r => {

        const currentRiskCode = r.risk.riskCode;
        const currentGroupCode = findRiskGroupCodeByRiskCode(cumulationRules, currentRiskCode);
        const isSumGroupExist = cumulationContractsByGroup.some(rg => rg.riskGroupCode == currentGroupCode);
        const riskInsuredSumWithoutCashBack = getInsuredSumFromRisk(r, riskCodesInfo);
        const riskCodeInfo = riskCodesInfo.find(r => r.riskCode == currentRiskCode);
        const notActualSurrenderValue = riskCodeInfo.isSurrenderValues && (new Date(input.endDate).getFullYear() != new Date(r.endDate).getFullYear());
        const notActualDate = !riskCodeInfo.isSurrenderValues && (currentDate < r.startDate || currentDate > r.endDate);

        if (!isSumGroupExist && !notActualSurrenderValue && !notActualDate) {
            cumulationContractsByGroup.push({
                riskGroupCode: findRiskGroupCodeByRiskCode(cumulationRules, currentRiskCode),
                riskGroupInsuredSum: +riskInsuredSumWithoutCashBack,
                riskGroupInsuredSumFixRate: +riskInsuredSumWithoutCashBack * currencyRate,
                groupRisks: [{
                    contractNumber: documentNumber,
                    riskCode: currentRiskCode,
                    riskInsuredSumWithoutCashBack: riskInsuredSumWithoutCashBack,
                    currencyCode: currencyCode,
                    riskPaymentForm: riskCodeInfo?.riskPaymentForm,
                    isInsuranceAmount: riskCodeInfo?.isInsuranceAmount,
                    isSurrenderValues: riskCodeInfo?.isSurrenderValues,
                    isWOP: riskCodeInfo?.isWOP,
                }],
                cumulationContracts: [{
                    contractNumber: documentNumber,
                    currencyCode: currencyCode,
                    currencyRate: currencyRate
                }],
                partyCode,
                partyType,
                partyAge
            });
        } else if (isSumGroupExist && !notActualSurrenderValue && !notActualDate) {
            sumPremiumGroupByRiskGroupCode(cumulationContractsByGroup, currentGroupCode, riskInsuredSumWithoutCashBack, documentNumber, currentRiskCode, currencyCode, currencyRate, riskCodeInfo);
        }
    });

}

function getContractsInsuredSumByCumulationRisks(input, sinkExchange, cumulationContractsByGroup, riskGroupsForCumulation) {

    const cumulationContractsByPartyCode = sinkExchange.cumulationContractsByPartyCode;
    const cumulationCurrencyRates = sinkExchange.cumulationCurrencyRates;
    const riskCodesInfo = sinkExchange.riskCodesInfo;

    riskGroupsForCumulation = riskGroupsForCumulation ?? [];

    const contractsRisksForCumulation = cumulationContractsByPartyCode.filter(i => riskGroupsForCumulation.includes(i.riskGroupCode));
    const contractsRisksForCumulationToCheck = contractsRisksForCumulation.map(({ riskPeriodInsuredSum, riskPeriodStartDate, riskPeriodEndDate, ...rest }) => rest);
    const contractsRisksForCumulationToCheckUnique = removeDuplicateObjects(contractsRisksForCumulationToCheck);

    contractsRisksForCumulationToCheckUnique.forEach(r => {

        const currentContractNumber = r.contractNumber;
        const currentCurrencyCode = r.currencyCode;
        const currentCurrencyRate = getCurrencyRate(cumulationCurrencyRates, currentCurrencyCode);
        const currentRiskCode = r.riskCode;
        const currentGroupCode = r.riskGroupCode;
        const isSumGroupExist = cumulationContractsByGroup.some(rg => rg.riskGroupCode == currentGroupCode);
        const riskCodeInfo = riskCodesInfo.find(r => r.riskCode == currentRiskCode);
        const isSurrenderValues = riskCodeInfo?.isSurrenderValues;
        const notActualSurrenderValue = isSurrenderValues && (new Date(r.contractEndDate).getFullYear() != new Date(r.riskEndDate).getFullYear());

        if (isSumGroupExist && !notActualSurrenderValue) {

            const riskInsuredSumWithoutCashBack = getInsuredSumFromRiskByContract(contractsRisksForCumulation, currentContractNumber, currentRiskCode, currentGroupCode, isSurrenderValues);
            sumPremiumGroupByRiskGroupCode(cumulationContractsByGroup, currentGroupCode, riskInsuredSumWithoutCashBack, currentContractNumber, currentRiskCode, currentCurrencyCode, currentCurrencyRate, riskCodeInfo);
        }
    });

}

function getCumulationContractsPartyType(cumulationContracts, partyCode, documentNumber) {

    if (partyCode) {

        cumulationContracts = cumulationContracts.filter(i => i.partyCode == partyCode && i.contractNumber != documentNumber);
    }

    return cumulationContracts;
}

function findRiskGroupCodeByRiskCode(cumulationRules, riskCode) {
    const item = cumulationRules.find(item => item.riskCode === riskCode);
    return item ? item.riskGroupCode : undefined;
}

function updateCountRisksInGroupRisks(cumulationContractsByGroup, cumulationRules, quoteRisks) {

    cumulationContractsByGroup.forEach(currentGroup => {
        currentGroup.groupRisks = updateRisksTotalCounts(currentGroup.groupRisks);
    });
}

function updateRisksTotalCounts(array) {

    const objectMap = new Map();

    array.forEach(item => {
        const contractNumber = item.contractNumber;
        if (!objectMap.has(contractNumber)) {
            objectMap.set(contractNumber, 0);
        }
        objectMap.set(contractNumber, objectMap.get(contractNumber) + 1);
    });

    array.forEach(item => {
        const contractNumber = item.contractNumber;
        item.risksTotalCount = objectMap.get(contractNumber);
    });

    return array;
}

function getInsuredSumFromRiskByContract(contractsRisksForCumulation, currentContractNumber, currentRiskCode, currentGroupCode, isSurrenderValues) {

    if (isSurrenderValues) {

        const contributionRefundInsuredSums = contractsRisksForCumulation.filter(
            r => r.contractNumber == currentContractNumber &&
                r.riskPeriodInsuredSum &&
                r.riskCode == currentRiskCode &&
                r.riskGroupCode == currentGroupCode
        );

        return contributionRefundInsuredSums[contributionRefundInsuredSums.length - 1]?.riskPeriodInsuredSum ?? 0;
    }

    const contractsRisksByPeriod = contractsRisksForCumulation.filter(
        r => r.riskPeriodInsuredSum &&
            r.contractNumber == currentContractNumber &&
            currentDate >= r.riskPeriodStartDate &&
            currentDate <= r.riskPeriodEndDate &&
            r.riskCode == currentRiskCode &&
            r.riskGroupCode == currentGroupCode
    );

    if (contractsRisksByPeriod?.length > 0) {
        return contractsRisksByPeriod.reduce((accumulator, obj) => {
            return accumulator + obj.riskPeriodInsuredSum;
        }, 0);
    }

    const contractsRisksNoPeriod = contractsRisksForCumulation
        .find(
            r => !r.riskPeriodInsuredSum &&
                r.contractNumber == currentContractNumber &&
                r.riskCode == currentRiskCode &&
                r.riskGroupCode == currentGroupCode
        );

    if (contractsRisksNoPeriod) {
        return contractsRisksNoPeriod.riskInsuredSumWithoutCashBack;
    }

}

function getInsuredSumFromRisk(risk, riskCodesInfo) {

    const currentRiskCode = risk?.risk?.riskCode;

    if (risk.riskInsuredSumByPeriod?.length > 0) {

        const currentDateRisk = risk.riskInsuredSumByPeriod.find(r => currentDate >= r.periodStartDate && currentDate <= r.periodEndDate);

        if (currentDateRisk) {

            const riskCodeInfo = riskCodesInfo.find(r => r.riskCode == currentRiskCode);
            const isSurrenderValues = riskCodeInfo?.isSurrenderValues;

            if (isSurrenderValues) {
                return risk.riskInsuredSumByPeriod[risk.riskInsuredSumByPeriod.length - 1]?.insuredSum ?? 0;
            }

            return currentDateRisk.insuredSum;
        }

        return 0;
    }

    const riskInCurrentDate = currentDate >= risk.startDate && currentDate <= risk.endDate;

    if (riskInCurrentDate) {

        return risk.riskInsuredSumWithoutCashBack;
    }

    return 0;
}

function getCurrencyRate(cumulationCurrencyRates, currencyCode) {

    return cumulationCurrencyRates.find(ccr => ccr.currencyCode == currencyCode)?.currencyRate ?? 1;
}

function isShowCumulationTriggers(body) {

    return body?.cumulation?.isLimitExceeded;
}

function setCumulationTriggers(body) {

    if (isShowCumulationTriggers(body)) {

        const department = 'underwriting';

        body.uwTriggers.push({
            objectName: 'Котировка',
            triggerName: 'Превышен лимит по кумуляции',
            departament: department,
            confirmationDepartment: translationUtils.getTranslation(`masterEntity/ApplicationUserGroup/1`, 'localized-field', 'name', department)
        });
    }
}

async function cleanCumulationResults(body) {

    if (body) {

        body.cumulation = {};
        body.cumulation.isLimitExceeded = false;
        body.cumulation.checkDateTime = checkDateTime;
    }
}

module.exports = {
    startCumulation,
    startCumulationByPartyCode,
    checkCumulationContractsWithRules,
    getQuoteRisks,
    getCumulationRulesRisks,
    filterQuoteRisksForCumulation,
    getQuoteInsuredSumByCumulationRisks,
    getContractsInsuredSumByCumulationRisks,
    setCumulationTriggers,
    isShowCumulationTriggers,
    cleanCumulationResults
};
