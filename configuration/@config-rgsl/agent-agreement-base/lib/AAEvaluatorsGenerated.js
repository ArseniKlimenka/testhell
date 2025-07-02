
/* eslint-disable */

module.exports = (function moduleDefinition() {


    /* eslint-disable */
    /**
     * Title
     *
     * @param  {object} input Expected input properties: dummy
     */
    function Evaluators(input) {
        // destructure input
        const {dummy} = input;

        // select outputs based on conditions
        const allOutputs = [
            {condition: true, outputs: {description: "Insurance product evaluator", type: "object", valueSchemaType: "MultiValueAttribute", inversionColumn: "PRODUCT_INVERSION", invertable: true, evalInDatabase: true, supportsMultipleValues: true, range: false, rangeBoundsInclusionColumns: undefined, columns: ["PRODUCT_VALUE_REF_ID"], dataSchemaProperties: ["insuranceProduct"], contextProperties: ["insuranceProduct"], massCalculationTableColumns: ["PRODUCT_CODE"], needsConsistencyCheck: true, valuesContainerPropertyName: "productsList", isSupportsNoValue: false, defaultValue: undefined}},
            {condition: true, outputs: {description: "Insurance year evaluator", type: "object", valueSchemaType: "IntegerRangeValueAttribute", inversionColumn: undefined, invertable: false, evalInDatabase: false, supportsMultipleValues: false, range: true, rangeBoundsInclusionColumns: ["INSURANCE_YEAR_INCLUDE_FROM", "INSURANCE_YEAR_INCLUDE_TO"], columns: ["INSURANCE_YEAR_FROM", "INSURANCE_YEAR_TO"], dataSchemaProperties: ["insuranceYear"], contextProperties: ["insuranceYear"], massCalculationTableColumns: [], needsConsistencyCheck: true, valuesContainerPropertyName: undefined, isSupportsNoValue: false, defaultValue: undefined}},
            {condition: true, outputs: {description: "Insurance currency", type: "object", valueSchemaType: "SingleValueAttribute", inversionColumn: "INSURANCE_CURRENCY_INVERSION", invertable: true, evalInDatabase: true, supportsMultipleValues: false, range: false, rangeBoundsInclusionColumns: undefined, columns: ["INSURANCE_CURRENCY"], dataSchemaProperties: ["insuranceCurrency"], contextProperties: ["insuranceCurrency"], massCalculationTableColumns: ["CURRENCY_CODE"], needsConsistencyCheck: true, valuesContainerPropertyName: "currenciesList", isSupportsNoValue: false, defaultValue: undefined}},
            {condition: true, outputs: {description: "Insurance term evaluator", type: "object", valueSchemaType: "IntegerRangeValueAttribute", inversionColumn: undefined, invertable: false, evalInDatabase: true, supportsMultipleValues: false, range: true, rangeBoundsInclusionColumns: ["INSURANCE_TERM_INCLUDE_FROM", "INSURANCE_TERM_INCLUDE_TO"], columns: ["INSURANCE_TERM_FROM", "INSURANCE_TERM_TO"], dataSchemaProperties: ["insuranceTerm"], contextProperties: ["insuranceTerm"], massCalculationTableColumns: ["INSURANCE_TERM"], needsConsistencyCheck: true, valuesContainerPropertyName: undefined, isSupportsNoValue: false, defaultValue: undefined}},
            {condition: true, outputs: {description: "Premium period evaluator", type: "object", valueSchemaType: "IntegerRangeValueAttribute", inversionColumn: undefined, invertable: false, evalInDatabase: true, supportsMultipleValues: false, range: true, rangeBoundsInclusionColumns: ["PREMIUM_PERIOD_INCLUDE_FROM", "PREMIUM_PERIOD_INCLUDE_TO"], columns: ["PREMIUM_PERIOD_FROM", "PREMIUM_PERIOD_TO"], dataSchemaProperties: ["premiumPeriod"], contextProperties: ["premiumPeriod"], massCalculationTableColumns: ["PREMIUM_PERIOD"], needsConsistencyCheck: true, valuesContainerPropertyName: undefined, isSupportsNoValue: false, defaultValue: undefined}},
            {condition: true, outputs: {description: "Premium type evaluator", type: "object", valueSchemaType: "MultiValueAttribute", inversionColumn: undefined, invertable: false, evalInDatabase: true, supportsMultipleValues: true, range: false, rangeBoundsInclusionColumns: undefined, columns: ["PREM_PERIOD_VALUE_REF_ID"], dataSchemaProperties: ["premiumPeriodType"], contextProperties: ["premiumPeriodType"], massCalculationTableColumns: ["PREMIUM_PERIOD_TYPE"], needsConsistencyCheck: true, valuesContainerPropertyName: undefined, isSupportsNoValue: false, defaultValue: undefined}},
            {condition: true, outputs: {description: "Credit program evaluator", type: "object", valueSchemaType: "MultiValueAttribute", inversionColumn: "CREDIT_PROGRAM_INVERSION", invertable: true, evalInDatabase: true, supportsMultipleValues: true, range: false, rangeBoundsInclusionColumns: undefined, columns: ["CREDIT_PROGRAM_VALUE_REF_ID"], dataSchemaProperties: ["creditProgram"], contextProperties: ["creditProgram"], massCalculationTableColumns: ["CREDIT_PROGRAM_ID"], needsConsistencyCheck: true, valuesContainerPropertyName: "creditProgramList", isSupportsNoValue: false, defaultValue: undefined}},
            {condition: true, outputs: {description: "Variant evaluator", type: "object", valueSchemaType: "MultiValueAttribute", inversionColumn: "VARIANT_INVERSION", invertable: true, evalInDatabase: true, supportsMultipleValues: true, range: false, rangeBoundsInclusionColumns: undefined, columns: ["VARIANT_VALUE_REF_ID"], dataSchemaProperties: ["variant"], contextProperties: ["variant"], massCalculationTableColumns: ["VARIANT_CODE"], needsConsistencyCheck: true, valuesContainerPropertyName: "variantsList", isSupportsNoValue: false, defaultValue: undefined}},
            {condition: true, outputs: {description: "Manual rule", type: "object", valueSchemaType: "StringSingleValueAttribute", inversionColumn: undefined, invertable: false, evalInDatabase: true, supportsMultipleValues: false, range: false, rangeBoundsInclusionColumns: undefined, columns: ["MANUAL_RULE"], dataSchemaProperties: ["manualRule"], contextProperties: ["manualRule"], massCalculationTableColumns: ["MANUAL_RULE"], needsConsistencyCheck: true, valuesContainerPropertyName: undefined, isSupportsNoValue: true, defaultValue: "NO_VALUE"}}
        ]
            .filter(r => r.condition)
            .map(r => r.outputs);

        if(allOutputs.length === 0) {
            return undefined;
        }

        // return outputs based on hit policy (COLLECT)
        return allOutputs;

    }


    // exported functions
    return {
        Evaluators: Evaluators
    };
})();
