'use strict';

function getSelectTerm(evaluator, settings) {

    if (!(evaluator.evalInDatabase ?? true)) {

        return `,${settings.ruleTableAlias}.${evaluator.columns}`;
    }
}

function getWhereTerm(evaluator, settings) {

    if (!(evaluator.evalInDatabase ?? true)) {

        return;
    }

    const columns = evaluator.columns ?? [];
    const contextProperties = evaluator.contextProperties ?? [];
    const massCalculationTableColumns = evaluator.massCalculationTableColumns ?? [];

    if (!checkEvalProperties(columns, contextProperties, evaluator)) {

        return;
    }

    const comparison = getComparison(evaluator, columns, contextProperties, massCalculationTableColumns, settings);
    return comparison;
}

function getComparison(evaluator, columns, contextProperties, massCalculationTableColumns, settings) {

    let comparison;

    if (evaluator.range) {

        comparison = compareRange(evaluator, columns, contextProperties, massCalculationTableColumns, settings);
    }
    else if (columns.length === 1) {

        comparison = compareSingleColumn(evaluator, columns, contextProperties, massCalculationTableColumns, settings);
    }
    else {

        comparison = compareMultiColumn(columns, contextProperties, settings.ruleTableAlias);
    }

    return comparison;
}

function checkEvalProperties(columns, contextProperties, evaluator) {

    if (evaluator.range && columns.length !== 2 && contextProperties.length !== 1 && (evaluator.rangeBoundsInclusionColumns ?? []) !== 2) {

        return false;
    }
    else if (!evaluator.range && (columns.length !== contextProperties.length || (columns.length === 0 || contextProperties.length === 0))) {

        return false;
    }

    return true;
}

function compareRange(evaluator, columns, contextProperties, massCalculationTableColumns, settings) {

    const ruleTableAlias = settings.ruleTableAlias;
    const valueToCompare = settings.useMassColumns ? settings.massTableAlias + '.' + massCalculationTableColumns[0] : '@' + contextProperties[0];

    const lowerInclusionColumn = evaluator.rangeBoundsInclusionColumns[0];
    const upperInclusionColumn = evaluator.rangeBoundsInclusionColumns[1];
    const lowerComparison = `(COALESCE(${ruleTableAlias}.${lowerInclusionColumn}, 0) = 1 and ${valueToCompare} >= ${ruleTableAlias}.${columns[0]}) OR (COALESCE(${ruleTableAlias}.${lowerInclusionColumn}, 0) = 0 and ${valueToCompare} > ${ruleTableAlias}.${columns[0]})`;
    const upperComparison = `(COALESCE(${ruleTableAlias}.${upperInclusionColumn}, 0) = 1 and ${valueToCompare} <= ${ruleTableAlias}.${columns[1]}) OR (COALESCE(${ruleTableAlias}.${upperInclusionColumn}, 0) = 0 and ${valueToCompare} < ${ruleTableAlias}.${columns[1]})`;

    return `AND ((${ruleTableAlias}.${columns[0]} IS NULL OR (${lowerComparison})) AND (${ruleTableAlias}.${columns[1]} IS NULL OR (${upperComparison})))`;
}

function compareSingleColumn(evaluator, columns, contextProperties, massCalculationTableColumns, settings) {

    let comparison = '';

    if (evaluator.supportsMultipleValues) {

        comparison = compareMultiValues(evaluator, columns, contextProperties, massCalculationTableColumns, settings);
    }
    else {

        comparison = compareSingleValue(evaluator, columns, contextProperties, massCalculationTableColumns, settings);
    }

    if (!evaluator.isSupportsNoValue) {

        return `AND (${settings.ruleTableAlias}.${columns[0]} IS NULL OR (${comparison}))`;
    }

    return `AND ${comparison}`;
}

function compareMultiColumn(columns, contextProperties, ruleTableAlias) {

    let comparison = '';

    for (let index = 0; index < columns.length; index++) {

        const column = columns[index];
        const contextProperty = contextProperties[index];
        comparison += `(${ruleTableAlias}.${column} = @${contextProperty}) AND `;
    }

    comparison = comparison.slice(0, -5);

    return `AND (${ruleTableAlias}.${columns[0]} IS NULL OR (${comparison}))`;
}

function compareMultiValues(evaluator, columns, contextProperties, massCalculationTableColumns, settings) {

    let comparison;
    const ruleTableAlias = settings.ruleTableAlias;
    const valueToCompare = settings.useMassColumns ? settings.massTableAlias + '.' + massCalculationTableColumns[0] : '@' + contextProperties[0];

    if (evaluator.invertable) {

        const notInverted = `COALESCE(${ruleTableAlias}.${evaluator.inversionColumn}, 0) = 0 AND ${valueToCompare} IN (SELECT STRING_VALUE FROM PAS_IMPL.AA_EVAL_ATTR_VALUE WHERE VALUE_REF_ID = ${ruleTableAlias}.${columns[0]})`;
        const inverted = `COALESCE(${ruleTableAlias}.${evaluator.inversionColumn}, 0) = 1 AND ${valueToCompare} NOT IN (SELECT STRING_VALUE FROM PAS_IMPL.AA_EVAL_ATTR_VALUE WHERE VALUE_REF_ID = ${ruleTableAlias}.${columns[0]})`;
        comparison = `(${notInverted}) OR (${inverted})`;
    }
    else {

        comparison = `${valueToCompare} IN (SELECT STRING_VALUE FROM PAS_IMPL.AA_EVAL_ATTR_VALUE WHERE VALUE_REF_ID = ${ruleTableAlias}.${columns[0]})`;
    }

    return comparison;
}

function compareSingleValue(evaluator, columns, contextProperties, massCalculationTableColumns, settings) {

    let comparison;
    const ruleTableAlias = settings.ruleTableAlias;
    const valueToCompare = settings.useMassColumns ? settings.massTableAlias + '.' + massCalculationTableColumns[0] : '@' + contextProperties[0];

    let positiveCondition = `${ruleTableAlias}.${columns[0]} = ${valueToCompare}`;
    let negativeCondition = `${ruleTableAlias}.${columns[0]} <> ${valueToCompare}`;

    if (evaluator.isSupportsNoValue) {
        positiveCondition = `ISNULL(${ruleTableAlias}.${columns[0]}, '${evaluator.defaultValue}') = ISNULL(${valueToCompare}, '${evaluator.defaultValue}')`;
        negativeCondition = `ISNULL(${ruleTableAlias}.${columns[0]}, '${evaluator.defaultValue}') <> ISNULL(${valueToCompare}, '${evaluator.defaultValue}')`;
    }

    if (evaluator.invertable) {

        const notInverted = `(COALESCE(${ruleTableAlias}.${evaluator.inversionColumn}, 0) = 0 AND ${positiveCondition})`;
        const inverted = `(COALESCE(${ruleTableAlias}.${evaluator.inversionColumn}, 0) = 1 AND ${negativeCondition})`;
        comparison = `(${notInverted}) OR (${inverted})`;
    }
    else {

        comparison = positiveCondition;
    }

    return comparison;
}

module.exports = {
    getWhereTerm,
    getSelectTerm
};
