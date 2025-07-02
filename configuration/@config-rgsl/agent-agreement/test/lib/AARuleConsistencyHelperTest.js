'use strict';

const { expect } = require("chai");
const codeTableValues = {
    productsList: ["Product1", "Product2", "Product3", "Product4"]
};
const {validateRules} = require('@config-rgsl/agent-agreement-base/lib/AARulesConsistencyHelper');

describe('Lib', function () {

    describe('Agent agreement rule consistency helper', function () {

        it('validateRules without inversion (duplicates)', function () {

            const commissionRules = [
                {
                    ruleNum: 1,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {
                        value: {code: "Currency"}
                    },
                    insuranceYear: {
                        value: 1
                    },
                    insuranceTerm: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriod: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriodType: {
                        value: {code: "Period1"}
                    }
                },
                {
                    ruleNum: 2,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {
                        value: {code: "Currency"}
                    },
                    insuranceYear: {
                        value: 1
                    },
                    insuranceTerm: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriod: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriodType: {
                        value: {code: "Period1"}
                    }
                }
            ];

            const actual = validateRules(commissionRules, codeTableValues);
            const expected = { hasIntersectedRules: true, intersection: { r1: commissionRules[0].ruleNum, r2: commissionRules[1].ruleNum } };
            expect(expected).to.deep.equal(actual);
        });

        it('validateRules without inversion (no intersection by product)', function () {

            const commissionRules = [
                {
                    ruleNum: 1,
                    insuranceProduct: {
                        values: [{code: "Product4"}, {code: "Product3"}]
                    },
                    insuranceCurrency: {
                        value: {code: "Currency"}
                    },
                    insuranceYear: {
                        value: 1
                    },
                    insuranceTerm: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriod: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriodType: {
                        value: {code: "Period1"}
                    }
                },
                {
                    ruleNum: 2,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {
                        value: {code: "Currency"}
                    },
                    insuranceYear: {
                        value: 1
                    },
                    insuranceTerm: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriod: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriodType: {
                        value: {code: "Period1"}
                    }
                }
            ];

            const actual = validateRules(commissionRules, codeTableValues);
            const expected = { hasIntersectedRules: false };
            expect(expected).to.deep.equal(actual);
        });

        it('validateRules without inversion (no intersection by currency)', function () {

            const commissionRules = [
                {
                    ruleNum: 1,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {
                        value: {code: "Currency"}
                    },
                    insuranceYear: {
                        value: 1
                    },
                    insuranceTerm: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriod: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriodType: {
                        value: {code: "Period1"}
                    }
                },
                {
                    ruleNum: 2,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {
                        value: {code: "Currency2"}
                    },
                    insuranceYear: {
                        value: 1
                    },
                    insuranceTerm: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriod: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriodType: {
                        value: {code: "Period1"}
                    }
                }
            ];

            const actual = validateRules(commissionRules, codeTableValues);
            const expected = { hasIntersectedRules: false };
            expect(expected).to.deep.equal(actual);
        });

        it('validateRules without inversion (no intersection by insurance term)', function () {

            const commissionRules = [
                {
                    ruleNum: 1,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {
                        value: {code: "Currency"}
                    },
                    insuranceYear: {
                        value: 1
                    },
                    insuranceTerm: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriod: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriodType: {
                        value: {code: "Period1"}
                    }
                },
                {
                    ruleNum: 2,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {
                        value: {code: "Currency"}
                    },
                    insuranceYear: {
                        value: 1
                    },
                    insuranceTerm: {
                        value: {
                            from: 3,
                            to: 4
                        }
                    },
                    premiumPeriod: {
                        value: {
                            from: 1,
                            to: 2
                        }
                    },
                    premiumPeriodType: {
                        value: {code: "Period1"}
                    }
                }
            ];

            const actual = validateRules(commissionRules, codeTableValues);
            const expected = { hasIntersectedRules: false };
            expect(expected).to.deep.equal(actual);
        });

        it('validateRules without inversion (duplicates with omitted values)', function () {

            const commissionRules = [
                {
                    ruleNum: 1,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {},
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                },
                {
                    ruleNum: 2,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {},
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                }
            ];

            const actual = validateRules(commissionRules, codeTableValues);
            const expected = { hasIntersectedRules: true, intersection: { r1: commissionRules[0].ruleNum, r2: commissionRules[1].ruleNum } };
            expect(expected).to.deep.equal(actual);
        });

        it('validateRules with inversion (duplicates set values)', function () {

            const commissionRules = [
                {
                    ruleNum: 1,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}],
                        isInverted: true
                    },
                    insuranceCurrency: {},
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                },
                {
                    ruleNum: 2,
                    insuranceProduct: {
                        values: [{code: "Product3"}, {code: "Product4"}]
                    },
                    insuranceCurrency: {},
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                }
            ];

            const actual = validateRules(commissionRules, codeTableValues);
            const expected = { hasIntersectedRules: true, intersection: { r1: commissionRules[0].ruleNum, r2: commissionRules[1].ruleNum } };
            expect(expected).to.deep.equal(actual);
        });

        it('validateRules with inversion (set values)', function () {

            const commissionRules = [
                {
                    ruleNum: 1,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}],
                        isInverted: true
                    },
                    insuranceCurrency: {},
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                },
                {
                    ruleNum: 2,
                    insuranceProduct: {
                        values: [{code: "Product1"}, {code: "Product2"}]
                    },
                    insuranceCurrency: {},
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                }
            ];

            const actual = validateRules(commissionRules, codeTableValues);
            const expected = { hasIntersectedRules: false };
            expect(expected).to.deep.equal(actual);
        });

        it('validateRules with inversion (duplicates single value)', function () {

            const commissionRules = [
                {
                    ruleNum: 1,
                    insuranceProduct: {},
                    insuranceCurrency: {
                        value: {code: "Currency1"},
                        isInverted: true
                    },
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                },
                {
                    ruleNum: 2,
                    insuranceProduct: {},
                    insuranceCurrency: {
                        value: {code: "Currency2"}
                    },
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                }
            ];

            const actual = validateRules(commissionRules, codeTableValues);
            const expected = { hasIntersectedRules: true, intersection: { r1: commissionRules[0].ruleNum, r2: commissionRules[1].ruleNum } };
            expect(expected).to.deep.equal(actual);
        });

        it('validateRules with inversion (single value)', function () {

            const commissionRules = [
                {
                    ruleNum: 1,
                    insuranceProduct: {},
                    insuranceCurrency: {
                        value: {code: "Currency1"},
                        isInverted: true
                    },
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                },
                {
                    ruleNum: 2,
                    insuranceProduct: {},
                    insuranceCurrency: {
                        value: {code: "Currency1"}
                    },
                    insuranceYear: {},
                    insuranceTerm: {},
                    premiumPeriod: {},
                    premiumPeriodType: {}
                }
            ];

            const actual = validateRules(commissionRules, codeTableValues);
            const expected = { hasIntersectedRules: false };
            expect(expected).to.deep.equal(actual);
        });
    });
});

