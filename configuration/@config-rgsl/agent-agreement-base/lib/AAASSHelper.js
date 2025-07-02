'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const {Evaluators} = require('@config-rgsl/agent-agreement-base/lib/AAEvaluatorsGenerated');
const { amendmentDimensions, dimensionEnum } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');

const valuesPath = '.values';
const valuePath = '.value';
const fromPath = '.from';
const fromIncludedPath = '.fromIncluded';
const toPath = '.to';
const toIncludedPath = '.toIncluded';
const isInvertedPath = '.isInverted';

const multiValueEvaluators = Evaluators({}).filter(r => r.supportsMultipleValues);
const rangeValueEvaluators = Evaluators({}).filter(r => r.range);
const commonEvaluators = Evaluators({}).filter(r => !r.supportsMultipleValues && !r.range);
const invertableEvaluators = Evaluators({}).filter(r => r.invertable);

function getMultiValueSetCount(rules) {

    const properties = multiValueEvaluators.map(r => r.dataSchemaProperties[0]);
    const rulesCount = properties.map(prop => countRulesWhithValues(rules, prop)).reduce((prev, cur) => prev + cur, 0);
    return rulesCount;
}

function getSequenceMap(rules, sequence) {

    const map = {};
    let start = 0;

    // Iterate through all rules
    rules.forEach(
        (rule) => {

            const ruleData = rule.attributes;

            map[ruleData.ruleNum] = [];

            // Count all set properties that have value for the rule
            const idCount = multiValueEvaluators
                .filter(r => ruleHasValue(ruleData, r.dataSchemaProperties[0]))
                .length;

            if (idCount > 0) {

                map[ruleData.ruleNum] = sequence.slice(start, start + idCount);
                start += idCount;
            }
        }
    );

    return map;
}

function getValueSatellitesForRule(rules, sequenceMap) {

    const mappedRules = rules
        .map(
            (rule) => {

                const ruleData = rule.attributes;
                const idSequence = sequenceMap[ruleData.ruleNum];
                let idIndex = 0;

                return multiValueEvaluators
                    .filter(r => ruleHasValue(ruleData, r.dataSchemaProperties[0]))
                    .map(
                        (r) => {
                            const sequenceNumber = idSequence[idIndex++];
                            return getValue(ruleData, r.dataSchemaProperties[0] + valuesPath)
                                .map(
                                    value => {
                                        return {
                                            VALUE_REF_ID: sequenceNumber,
                                            STRING_VALUE: value.code
                                        };
                                    });
                        })
                    .reduce(function (a, b) {
                        return a.concat(b);
                    }, []);
            })
        .reduce(function (a, b) {
            return a.concat(b);
        }, []);

    return mappedRules;
}

function getSatelliteRecordForRule(number, sequenceMap, rule) {

    const ruleData = rule.attributes;

    const sat = {
        AA_NUMBER: number,
        COMMISSION_TYPE: 'base',
        RULE_NUM: ruleData.ruleNum,
        START_DATE: ruleData.startDate,
        END_DATE: ruleData.endDate,
        REGISTRATOR_NUMBER: ruleData.registratorNumber,
        MIN_RATE: ruleData.minRate,
        MAX_RATE: ruleData.maxRate,
        MAX_RATE_LIMIT: ruleData.maxRateLimit,
        RATE: ruleData.rate,
        EXPENSES_RATE: ruleData.expensesRate,
        NATURAL_PERSON_RATE: ruleData.natuaralPersonRate,
        SOLE_PROPRIATOR_RATE: ruleData.solePropriatorRate,
        AMOUNT: ruleData.amount,
        DISABLE_DISCOUNT: ruleData.isDiscountDisabled,
        DISABLE_MANUAL_CORRECTION: ruleData.isManualCorrectionDisabled,
        ALWAYS_USE_MAX_RATE: ruleData.alwaysUseMaxRate,
        MANUAL_RULE: ruleData.manualRule,
        MANUAL_RULE_DESCRIPTION: ruleData.manualRuleDescription
    };

    setIsInvertedValueForRule(ruleData, sat);
    setSingleValueForRule(ruleData, sat);
    setMultiValuesForRule(ruleData, sat, sequenceMap);
    setRangeValuesForRule(ruleData, sat);

    return sat;
}

function countRulesWhithValues(rules, propertyPath) {

    const result = rules.filter(rule => ruleHasValue(rule.attributes, propertyPath)).length;
    return result;
}

function ruleHasValue(rule, propertyPath) {

    const ruleValue = getValue(rule, propertyPath + valuesPath);
    return ruleValue && ruleValue.length > 0;
}

function setIsInvertedValueForRule(rule, satelliteRecord) {

    invertableEvaluators.forEach(
        (r) => {

            satelliteRecord[r.inversionColumn] = getValue(rule, r.dataSchemaProperties[0] + isInvertedPath);
        });
}

function setSingleValueForRule(rule, satelliteRecord) {

    commonEvaluators.forEach(
        (r) => {
            r.columns.forEach((_, i) => {

                let value = getValue(rule, r.dataSchemaProperties[i] + valuePath);

                if (!value) {
                    value = getValue(rule, r.dataSchemaProperties[i]);
                }

                if (value && typeof value === 'object' && !Array.isArray(value)) {

                    value = getValue(value, 'code');
                }
                else if (Array.isArray(value)) {

                    value = undefined;
                }

                satelliteRecord[r.columns[i]] = value;
            });
        });
}

function setMultiValuesForRule(rule, satelliteRecord, sequenceMap) {
    // Get ids for the rule
    const idSequence = sequenceMap[rule.ruleNum];

    let idIndex = 0;

    multiValueEvaluators
        .filter(r => ruleHasValue(rule, r.dataSchemaProperties[0]))
        .forEach(
            (r) => {
                satelliteRecord[r.columns[0]] = idSequence[idIndex++];
            });
}

function setRangeValuesForRule(rule, satelliteRecord) {

    rangeValueEvaluators.forEach(
        (r) => {

            satelliteRecord[r.columns[0]] = getValue(rule, r.dataSchemaProperties[0] + valuePath + fromPath);
            satelliteRecord[r.columns[1]] = getValue(rule, r.dataSchemaProperties[0] + valuePath + toPath);

            satelliteRecord[r.rangeBoundsInclusionColumns[0]] = getValue(rule, r.dataSchemaProperties[0] + valuePath + fromIncludedPath);
            satelliteRecord[r.rangeBoundsInclusionColumns[1]] = getValue(rule, r.dataSchemaProperties[0] + valuePath + toIncludedPath);
        });
}

function setAmendmentSatellites(result, commonBody, agentAgreementType, originalDocumentNumber, number) {

    if (!isAmendment(agentAgreementType)) {

        return;
    }

    result['PAS_IMPL.AA_AMENDMENT_LINK'] = [
        {
            "AGREEMENT": originalDocumentNumber,
            "AMENDMENT": number
        }
    ];

    const data = getAmendmentData(commonBody, agentAgreementType);

    result['PAS_IMPL.AA_AMENDMENT_SAT'] = [
        {
            "AGREEMENT": originalDocumentNumber,
            "AMENDMENT": number,
            "MANUAL_NUMBER": data.manualDocumentNumber,
            "SHOULD_BE_SIGNED": data.shouldBeSigned,
            "AMENDMENT_TYPE": agentAgreementType
        }
    ];

    if (agentAgreementType === dimensionEnum.changeAmendmentType.dimension) {

        result['PAS_IMPL.AA_CHANGE_SAT'] = [
            {
                "AGREEMENT": originalDocumentNumber,
                "AMENDMENT": number,
                "CONCLUSION_DATE": data.validity.conclusionDate,
                "START_DATE": data.validity.startDate,
                "END_DATE": data.validity.endDate
            }
        ];
    }

    if (agentAgreementType === dimensionEnum.cancellationAmendmentType.dimension) {

        result['PAS_IMPL.AA_CANCELLATION_SAT'] = [
            {
                "AGREEMENT": originalDocumentNumber,
                "AMENDMENT": number,
                "CANCELLATION_DATE": data.cancellationDate
            }
        ];
    }
}

function isAmendment(agentAgreementType) {

    return amendmentDimensions.includes(agentAgreementType);
}

function getAmendmentData(commonBody, agentAgreementType) {

    const found = Object.keys(dimensionEnum)
        .filter(property => dimensionEnum[property].dimension === agentAgreementType)
        .map(property => dimensionEnum[property]);

    if (found[0]) {

        return getValue(commonBody, 'attributes.' + found[0].dataPath);
    }

    return undefined;
}

module.exports = {
    getMultiValueSetCount,
    getSequenceMap,
    getValueSatellitesForRule,
    getSatelliteRecordForRule,
    setAmendmentSatellites
};
