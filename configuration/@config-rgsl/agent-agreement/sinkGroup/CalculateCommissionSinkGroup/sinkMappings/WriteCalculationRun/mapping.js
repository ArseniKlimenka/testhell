'use strict';

const { DateTimeFormatter, ZonedDateTime, ZoneOffset } = require('@js-joda/core');
const { getBooleanValue, generateCalculationNumber } = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');

module.exports = function mapping(sinkInput, sinkExchange) {

    const currentUser = this?.applicationContext?.originatingUser;
    const executionId = sinkExchange.executionId;
    const executedAt = ZonedDateTime.now(ZoneOffset.UTC);
    const calculationNumber = generateCalculationNumber(executedAt);

    if (!getBooleanValue(sinkInput.loggingEnabled, x => x, true)) {
        return {
            'PAS_IMPL.COM_CALC_LINK': [],
            'PAS_IMPL.COM_CALC_SAT': [],
            'PAS_IMPL.COM_CALC_EXECUTION_STATUS': []
        };
    }

    const link = {
        AA_NUMBER: sinkExchange.amendmentNumber,
        SERVICE_PROVIDER_CODE: sinkInput.serviceProviderCode,
        CONTRACT_NUMBER: sinkInput.contractNumber,
        COM_CALC_NUMBER: calculationNumber,
        PARTICIPANT_NO: 0,
        ENTRY: sinkInput.contractNumber,
        VALID_ON: sinkInput.calculationDate,
        EXECUTION_ID: executionId,
    };

    return {
        'PAS_IMPL.COM_CALC_LINK': [
            link,
        ],
        'PAS_IMPL.COM_CALC_SAT': sinkExchange.result?.map(result => (
            {
                ...link,
                EXECUTION_ID: executionId,
                CALCULATION_CONTEXT: JSON.stringify(sinkInput.calculationContext),
                SUCCESS: sinkExchange.errorCode === undefined,
                RULE_NUM: result.ruleNum,
                START_DATE: result.validity?.start,
                END_DATE: result.validity.end,
                INSURANCE_YEAR: result.insuranceYear,
                REGISTRATOR_NUMBER: result.registrator,
                MIN_RATE: result.minRate,
                MAX_RATE: result.maxRate,
                MAX_RATE_LIMIT: result.maxRateLimit,
                RATE: result.rate,
                EXPENSES_RATE: result.expensesRate,
                NATURAL_PERSON_RATE: result.natuaralPersonRate,
                SOLE_PROPRIATOR_RATE: result.solePropriatorRate,
                AMOUNT: result.amount,
                DISABLE_DISCOUNT: result.disableDiscount,
                DISABLE_MANUAL_CORRECTION: result.disableManualCorrection,
                ALWAYS_USE_MAX_RATE: result.alwaysUseMaxRate,
            })) ?? [],
        'PAS_IMPL.COM_CALC_EXECUTION_STATUS': [
            {
                EXECUTION_ID: executionId,
                TIME: ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm:ss.n')),
                TRIGGERED_BY: currentUser?.id || "",
                STATUS: sinkExchange.status,
                TYPE: 'CommissionCalculation'
            }
        ]
    };
};
