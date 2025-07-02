'use strict';

const {
    getAtomicValueDimension,
    getSetValueDimension,
    getAnyValueDimension,
    getRuleDimension,
    getRangeValueDimension
} = require('@config-rgsl/agent-agreement-base/lib/AAConsistency');

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const { Evaluators } = require("@config-rgsl/agent-agreement-base/lib/AAEvaluatorsGenerated");
const evaluatorsWithConsitency = Evaluators({ returnEvaluators: true }).filter(x => x.needsConsistencyCheck);


function validateRules(commissionRules, codeTableValues) {

    const ruleDimensions = commissionRules.map(
        r => mapRuleToRuleDimension(r, codeTableValues)
    );

    const hasIntersectedRules = ruleDimensions.some(
        (r1, i) => ruleDimensions.slice(i + 1)
            .some(r2 => r1.intersect(r2))
    );

    if (hasIntersectedRules) {

        for (let i = 0; i < ruleDimensions.length; i++) {

            const r1 = ruleDimensions[i];

            const r2 = ruleDimensions.slice(i + 1).find(y => r1.intersect(y));

            if (r2) {
                return { hasIntersectedRules, intersection: { r1: r1.tag, r2: r2.tag } };
            }
        }
    }

    return { hasIntersectedRules };
}

function mapRuleToRuleDimension(commissionRule, fullValuesList) {

    const dimensions = evaluatorsWithConsitency.map(
        x => {
            if (x.supportsMultipleValues) {

                return mapToSetValueDimension(
                    commissionRule,
                    x.dataSchemaProperties[0],
                    x.valuesContainerPropertyName ? fullValuesList[x.valuesContainerPropertyName] : [],
                    x.valueSchemaType);
            }
            else if (x.range) {

                return mapToRangeValueDimension(
                    commissionRule,
                    x.dataSchemaProperties[0],
                    x.type,
                    x.valueSchemaType
                );
            }

            return mapToAtomicValueDimension(
                commissionRule,
                x.dataSchemaProperties[0],
                x.type,
                x.valueSchemaType,
                x.defaultValue
            );

        }
    );

    const startDate = commissionRule.startDate ? dateHelper.parseToLocalDate(commissionRule.startDate) : undefined;
    const endDate = commissionRule.endDate ? dateHelper.parseToLocalDate(commissionRule.endDate) : undefined;

    const rangeDimension = getRangeValueDimension(startDate, endDate, commissionRule.ruleNum + '_validity');
    dimensions.push(rangeDimension);

    return getRuleDimension(dimensions, commissionRule.ruleNum);
}

function mapToAtomicValueDimension(commissionRule, dataSchemaPath, type, valueSchemaType, defaultValue = null) {

    const valueContainer = getValue(commissionRule, dataSchemaPath);
    let value = getAttributeValue(valueContainer, valueSchemaType);

    if (!value && defaultValue) {
        value = defaultValue;
    }

    if (type === 'boolean' && !value) {

        value = false;
    }

    let atomicDimension;

    if (value !== undefined) {

        atomicDimension = getAtomicValueDimension(value, commissionRule.ruleNum + '_' + dataSchemaPath);
    }
    else {

        atomicDimension = getAnyValueDimension(commissionRule.ruleNum + '_' + dataSchemaPath);
    }

    if (valueContainer?.isInverted) {

        atomicDimension.setInversedValue(true);
    }
    else {
        atomicDimension.setInversedValue(false);
    }

    return atomicDimension;
}

function mapToRangeValueDimension(commissionRule, dataSchemaPath, type, valueSchemaType) {

    const valueContainer = getValue(commissionRule, dataSchemaPath);
    const value = getAttributeValue(valueContainer, valueSchemaType);

    if (value !== undefined && (value.from || value.to)) {

        return getRangeValueDimension(value.from, value.to, commissionRule.ruleNum + '_' + dataSchemaPath);
    }


    return getAnyValueDimension(commissionRule.ruleNum + '_' + dataSchemaPath);

}

function mapToSetValueDimension(commissionRule, dataSchemaPath, valuesList, valueSchemaType) {

    const valueContainer = getValue(commissionRule, dataSchemaPath);
    const values = getAttributeValue(valueContainer, valueSchemaType);

    if (!values || values.length === 0) {

        return getAnyValueDimension(commissionRule, dataSchemaPath);
    }

    let setValueDimension = getSetValueDimension(values, commissionRule.ruleNum + '_' + dataSchemaPath);

    if (valueContainer?.isInverted) {

        if (valuesList && valuesList.length !== 0) {

            setValueDimension = setValueDimension.inverse(getSetValueDimension(valuesList, commissionRule.ruleNum + '_' + dataSchemaPath));
        }
        else {

            setValueDimension.setInversedValue(true);
        }
    }

    return setValueDimension;
}

function getAttributeValue(valueContainer, valueSchemaType) {

    switch (valueSchemaType) {
        case "MultiValueAttribute":
            return getValue(valueContainer, "values", []).map(value => value.code);
        case "IntegerSingleValueAttribute":
            return getValue(valueContainer, "value");
        case "SingleValueAttribute":
            return getValue(valueContainer, "value.code");
        case "IntegerRangeValueAttribute":
            return getValue(valueContainer, "value");
        case "StringSingleValueAttribute":
            return valueContainer;
        default:
            break;
    }
}

module.exports = {
    mapRuleToRuleDimension,
    validateRules
};
