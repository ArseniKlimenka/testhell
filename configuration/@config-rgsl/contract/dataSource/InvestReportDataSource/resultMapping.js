const { round } = require('@config-system/infrastructure/lib/RoundingUtils');
const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');
const { memoryCommissionConfiguration } = require('@config-rgsl/life-insurance/lib/memoryCommissionConfiguration');

module.exports = function resultMapping(input) {

    const productCode = input.productCode;
    const issueDate = input.issueDate;
    const strategyCode = input.investmentStrategyCode;
    const barrier = input.barrier;
    const barrierAutoCall = input.barrierAutoCall;
    const partnerBusinessCode = input.partnerBusinessCode;
    const paymentFrequencyCode = input.paymentFrequencyCode;
    const couponPeriods = input.couponPeriods;
    const windowStartDate = input.windowStartDate;
    const windowEndDate = input.windowEndDate;
    const didBeginDate = input.didBeginDate;
    const didEndDate = input.didEndDate;
    const dischargeDate = input.dischargeDate;

    const couponPeriodsWithBarrier = couponPeriods &&
        JSON.parse(couponPeriods).map((item, idx) => {
            return {
                beginDate: formatHelper.formatDateTimeToString(item.beginDate),
                endDate: formatHelper.formatDateTimeToString(item.endDate),
                barrier: round(Number(barrier && barrier.split('; ').find((bItem, bIdx) => bIdx == idx)), 2),
                barrierAutoCall: round(Number(barrierAutoCall && barrierAutoCall.split('; ').find((bItem, bIdx) => bIdx == idx)), 2)
            };
        }) || [];

    let agentAgreementNumber;
    switch (partnerBusinessCode) {
        case '15':
            agentAgreementNumber = '94831';
            break;
        case '249411':
            agentAgreementNumber = '22521';
            break;
        case '999999':
            agentAgreementNumber = '999999';
            break;
        case '431120':
            agentAgreementNumber = '89309';
            break;
        case '112479':
            agentAgreementNumber = '99319';
            break;
        case '191127':
            agentAgreementNumber = '47060';
            break;
        case '107093':
            agentAgreementNumber = '107093';
            break;
        case '191130':
            agentAgreementNumber = '99316';
            break;
    }

    const memoryCommissionConf = memoryCommissionConfiguration({ productCode, paymentFrequencyCode, insuranceTerms: input.insuranceTerms, issueDate }) || {};

    return {
        contractNumber: input.contract_number,
        sysCreatedOn: formatHelper.formatDateTimeToString(input.sys_created_on),
        startDate: formatHelper.formatDateTimeToString(input.startDate),
        endDate: formatHelper.formatDateTimeToString(input.endDate),
        insuranceTerms: input.insuranceTerms,
        productDescription: input.productDescription?.split(' (')[0],
        investmentStrategyDescription: input.investmentStrategyDescription,
        baseActiveDescription: input.baseActiveDescription,
        windowStartDate: formatHelper.formatDateTimeToString(windowStartDate),
        windowEndDate: formatHelper.formatDateTimeToString(windowEndDate),
        purchaseDate: formatHelper.formatDateTimeToString(input.purchaseDate),
        didBeginDate: formatHelper.formatDateTimeToString(didBeginDate),
        didEndDate: formatHelper.formatDateTimeToString(didEndDate),
        currencyCode: input.currencyCode,
        couponPeriodWatchDate1: couponPeriodsWithBarrier[0] && couponPeriodsWithBarrier[0].beginDate,
        couponPeriodBeginDate1: couponPeriodsWithBarrier[0] && couponPeriodsWithBarrier[0].beginDate,
        couponPeriodEndDate1: couponPeriodsWithBarrier[0] && couponPeriodsWithBarrier[0].endDate,
        barrier1: couponPeriodsWithBarrier[0] && couponPeriodsWithBarrier[0].barrier,
        barrierAutoCall1: couponPeriodsWithBarrier[0] && couponPeriodsWithBarrier[0].barrierAutoCall,
        couponPeriodWatchDate2: couponPeriodsWithBarrier[1] && couponPeriodsWithBarrier[1].beginDate,
        couponPeriodBeginDate2: couponPeriodsWithBarrier[1] && couponPeriodsWithBarrier[1].beginDate,
        couponPeriodEndDate2: couponPeriodsWithBarrier[1] && couponPeriodsWithBarrier[1].endDate,
        barrier2: couponPeriodsWithBarrier[1] && couponPeriodsWithBarrier[1].barrier,
        barrierAutoCall2: couponPeriodsWithBarrier[1] && couponPeriodsWithBarrier[1].barrierAutoCall,
        couponPeriodWatchDate3: couponPeriodsWithBarrier[2] && couponPeriodsWithBarrier[2].beginDate,
        couponPeriodBeginDate3: couponPeriodsWithBarrier[2] && couponPeriodsWithBarrier[2].beginDate,
        couponPeriodEndDate3: couponPeriodsWithBarrier[2] && couponPeriodsWithBarrier[2].endDate,
        barrier3: couponPeriodsWithBarrier[2] && couponPeriodsWithBarrier[2].barrier,
        barrierAutoCall3: couponPeriodsWithBarrier[2] && couponPeriodsWithBarrier[2].barrierAutoCall,
        couponPeriodWatchDate4: couponPeriodsWithBarrier[3] && couponPeriodsWithBarrier[3].beginDate,
        couponPeriodBeginDate4: couponPeriodsWithBarrier[3] && couponPeriodsWithBarrier[3].beginDate,
        couponPeriodEndDate4: couponPeriodsWithBarrier[3] && couponPeriodsWithBarrier[3].endDate,
        barrier4: couponPeriodsWithBarrier[3] && couponPeriodsWithBarrier[3].barrier,
        barrierAutoCall4: couponPeriodsWithBarrier[3] && couponPeriodsWithBarrier[3].barrierAutoCall,
        couponPeriodWatchDate5: couponPeriodsWithBarrier[4] && couponPeriodsWithBarrier[4].beginDate,
        couponPeriodBeginDate5: couponPeriodsWithBarrier[4] && couponPeriodsWithBarrier[4].beginDate,
        couponPeriodEndDate5: couponPeriodsWithBarrier[4] && couponPeriodsWithBarrier[4].endDate,
        barrier5: couponPeriodsWithBarrier[4] && couponPeriodsWithBarrier[4].barrier,
        barrierAutoCall5: couponPeriodsWithBarrier[4] && couponPeriodsWithBarrier[4].barrierAutoCall,
        endowmentPercent: 0,
        dischargeDate: formatHelper.formatDateTimeToString(dischargeDate),
        participationCoeff: round(Number(input.participationCoeff) * 100, 2),
        strategyType: input.barrier ? 'Купон' : 'КУ',
        optionPrice: round(Number(input.optionPrice) * 100, 2),
        partnerDescription: input.partnerDescription,
        agentAgreementNumber: agentAgreementNumber,
        commission: round(Number(memoryCommissionConf.allIncome), 2),
        systemName: 'AdInsure',
        hedgeCost: round(Number(input.hedgeCost)),
        spreadBA: round(Number(input.spreadBA)),
        payOffShortDescription: input.payOffShortDescription,
        toolType: input.toolType,
        measureToolNominal: round(Number(input.measureToolNominal), 2),
        calculatingAgent: input.calculatingAgent,
        priceOfMeasureTool: round(Number(input.priceOfMeasureTool) * 100, 2),
        partOfPremiumForTool: round(Number(input.partOfPremiumForTool) * 100, 2)
    };

};
