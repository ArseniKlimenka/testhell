'use strict';

const { expect } = require("chai");

const helper = require('@config-rgsl/agent-agreement-base/lib/AAEvalDataProviderHelper');

describe('Lib', function () {

    describe('Agent agreement commission calculation data provider helper', function () {

        it('fillDataProviderParameters should assign to parameters context properties', function () {

            const actual = helper.fillDataProviderParameters(
                {},
                {
                    property1: 1,
                    property2: 2
                },
                {
                    ruleTableAlias: "tab",
                    evaluators: []
                }
            );

            const expected = {
                ruleTableAlias: "tab",
                selectTerms: [],
                whereTerms: [],
                property1: 1,
                property2: 2
            };

            expect(expected).to.deep.equal(actual);
        });

        it('fillDataProviderParameters should set where term', function () {

            const actual = helper.fillDataProviderParameters(
                {},
                {
                    holderPersonCode: 1,
                    property2: 2
                },
                {
                    ruleTableAlias: "tab",
                    evaluators: [
                        {
                            "type": "string",
                            "columns": ["HOLDER_PERSON_VALUE_REF_ID"],
                            "inversionColumn": "HOLDER_INVERSION",
                            "description": "Holder evaluator",
                            "invertable": true,
                            "contextProperties": ["holderPersonCode"],
                            "evalInDatabase": true,
                            "supportsMultipleValues": true
                        }
                    ]
                }
            );

            const expected = {
                ruleTableAlias: "tab",
                selectTerms: [],
                whereTerms: ["AND (tab.HOLDER_PERSON_VALUE_REF_ID IS NULL OR ((COALESCE(tab.HOLDER_INVERSION, 0) = 0 AND @holderPersonCode IN (SELECT STRING_VALUE FROM PAS_IMPL.AA_EVAL_ATTR_VALUE WHERE VALUE_REF_ID = tab.HOLDER_PERSON_VALUE_REF_ID)) OR (COALESCE(tab.HOLDER_INVERSION, 0) = 1 AND @holderPersonCode NOT IN (SELECT STRING_VALUE FROM PAS_IMPL.AA_EVAL_ATTR_VALUE WHERE VALUE_REF_ID = tab.HOLDER_PERSON_VALUE_REF_ID))))"],
                holderPersonCode: 1,
                property2: 2
            };

            expect(expected).to.deep.equal(actual);
        });

        it('fillDataProviderParameters should set select term', function () {

            const actual = helper.fillDataProviderParameters(
                {},
                {
                    property1: 1,
                    property2: 2
                },
                {
                    ruleTableAlias: "tab",
                    evaluators: [
                        {
                            "type": "string",
                            "columns": ["SOME_COLUMN"],
                            "description": "Some evaluator",
                            "invertable": false,
                            "contextProperty": "property1",
                            "evalInDatabase": false
                        }
                    ]
                }
            );

            const expected = {
                ruleTableAlias: "tab",
                selectTerms: [",tab.SOME_COLUMN"],
                whereTerms: [],
                property1: 1,
                property2: 2
            };

            expect(expected).to.deep.equal(actual);
        });
    });
});
