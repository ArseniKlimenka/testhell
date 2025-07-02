'use strict';

const { expect } = require("chai");

const helper = require('@config-rgsl/agent-agreement-base/lib/AAEvalBase');

describe('Lib', function () {

    describe('Agent agreement commission calculation evaluator helper', function () {

        it('getSelectTerm should return select term', function () {

            const actual = helper.getSelectTerm(
                {
                    "type": "string",
                    "columns": ["SOME_COLUMN"],
                    "description": "Some evaluator",
                    "invertable": false,
                    "contextProperty": "property1",
                    "evalInDatabase": false
                },
                {
                    ruleTableAlias: 'tab',
                }
            );

            const expected = ',tab.SOME_COLUMN';

            expect(expected).to.deep.equal(actual);
        });

        it('getSelectTerm should return undefined', function () {

            const actual = helper.getSelectTerm(
                {
                    "type": "string",
                    "column": "HOLDER_PERSON_CODE",
                    "inversionColumn": "HOLDER_INVERSION",
                    "description": "Holder evaluator",
                    "invertable": true,
                    "contextProperty": "holderPersonCode",
                    "evalInDatabase": true,
                    "supportsMultipleValues": true
                },
                {
                    ruleTableAlias: 'tab',
                }
            );

            const expected = undefined;

            expect(expected).to.deep.equal(actual);
        });

        it('getWhereTerm should return undefined', function () {

            const actual = helper.getWhereTerm(
                {
                    "type": "string",
                    "columns": ["SOME_COLUMN"],
                    "description": "Some evaluator",
                    "invertable": false,
                    "contextProperty": "property1",
                    "evalInDatabase": false,
                    "supportsMultipleValues": true
                },
                {
                    ruleTableAlias: 'tab',
                }
            );

            const expected = undefined;

            expect(expected).to.deep.equal(actual);
        });

        it('getWhereTerm should return where term (invertable evaluator)', function () {

            const actual = helper.getWhereTerm(
                {
                    "type": "string",
                    "columns": ["HOLDER_PERSON_VALUE_REF_ID"],
                    "inversionColumn": "HOLDER_INVERSION",
                    "description": "Holder evaluator",
                    "invertable": true,
                    "contextProperties": ["holderPersonCode"],
                    "evalInDatabase": true,
                    "supportsMultipleValues": true
                },
                {
                    ruleTableAlias: 'tab',
                }
            );

            const expected = "AND (tab.HOLDER_PERSON_VALUE_REF_ID IS NULL OR ((COALESCE(tab.HOLDER_INVERSION, 0) = 0 AND @holderPersonCode IN (SELECT STRING_VALUE FROM PAS_IMPL.AA_EVAL_ATTR_VALUE WHERE VALUE_REF_ID = tab.HOLDER_PERSON_VALUE_REF_ID)) OR (COALESCE(tab.HOLDER_INVERSION, 0) = 1 AND @holderPersonCode NOT IN (SELECT STRING_VALUE FROM PAS_IMPL.AA_EVAL_ATTR_VALUE WHERE VALUE_REF_ID = tab.HOLDER_PERSON_VALUE_REF_ID))))";

            expect(expected).to.deep.equal(actual);
        });

        it('getWhereTerm should return where term (non-invertable evaluator)', function () {

            const actual = helper.getWhereTerm(
                {
                    "type": "string",
                    "columns": ["HOLDER_PERSON_VALUE_REF_ID"],
                    "description": "Holder evaluator",
                    "invertable": false,
                    "contextProperties": ["holderPersonCode"],
                    "evalInDatabase": true,
                    "supportsMultipleValues": true
                },
                {
                    ruleTableAlias: 'tab',
                }
            );

            const expected = "AND (tab.HOLDER_PERSON_VALUE_REF_ID IS NULL OR (@holderPersonCode IN (SELECT STRING_VALUE FROM PAS_IMPL.AA_EVAL_ATTR_VALUE WHERE VALUE_REF_ID = tab.HOLDER_PERSON_VALUE_REF_ID)))";

            expect(expected).to.deep.equal(actual);
        });

        it('getWhereTerm should return where term (multi-column evaluator)', function () {

            const actual = helper.getWhereTerm(
                {
                    "type": "object",
                    "columns": ["OBJECT_TYPE", "OBJECT_CODE"],
                    "description": "Object evaluator",
                    "invertable": false,
                    "contextProperties": ["insuredObjectType", "insuredObjectCode"],
                    "evalInDatabase": true
                },
                {
                    ruleTableAlias: 'tab',
                }
            );

            const expected = "AND (tab.OBJECT_TYPE IS NULL OR ((tab.OBJECT_TYPE = @insuredObjectType) AND (tab.OBJECT_CODE = @insuredObjectCode)))";

            expect(expected).to.deep.equal(actual);
        });

        it('getWhereTerm should return where term (range evaluator)', function () {

            const actual = helper.getWhereTerm(
                {
                    "type": "object",
                    "columns": ["INSURANCE_TERM_FROM", "INSURANCE_TERM_TO"],
                    "description": "Range evaluator",
                    "invertable": false,
                    "contextProperties": ["insuranceTerm"],
                    "evalInDatabase": true,
                    "range": true,
                    "rangeBoundsInclusionColumns": ["INSURANCE_TERM_INCLUDE_FROM", "INSURANCE_TERM_INCLUDE_TO"]
                },
                {
                    ruleTableAlias: 'tab',
                }
            );

            const expected = "AND ((tab.INSURANCE_TERM_FROM IS NULL OR ((COALESCE(tab.INSURANCE_TERM_INCLUDE_FROM, 0) = 1 and @insuranceTerm >= tab.INSURANCE_TERM_FROM) OR (COALESCE(tab.INSURANCE_TERM_INCLUDE_FROM, 0) = 0 and @insuranceTerm > tab.INSURANCE_TERM_FROM))) AND (tab.INSURANCE_TERM_TO IS NULL OR ((COALESCE(tab.INSURANCE_TERM_INCLUDE_TO, 0) = 1 and @insuranceTerm <= tab.INSURANCE_TERM_TO) OR (COALESCE(tab.INSURANCE_TERM_INCLUDE_TO, 0) = 0 and @insuranceTerm < tab.INSURANCE_TERM_TO))))";

            expect(expected).to.deep.equal(actual);
        });
    });
});
