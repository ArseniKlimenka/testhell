'use strict';

const { expect } = require("chai");

const helper = require('@config-rgsl/agent-agreement-base/lib/AAASSHelper');

describe('Lib', function () {

    describe('Agent agreement ASS helper', function () {

        it('getMultiValueSetCount for two rules with multivalues', function () {

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "Надежный выбор",
                                    "code": "ERC"
                                },
                                {
                                    "description": "Надежный выбор Премиум",
                                    "code": "ERCP"
                                },
                                {
                                    "description": "Вектор здоровья Премиум",
                                    "code": "EHVP"
                                }
                            ]
                        }
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": [
                                {
                                    "description": "Драйвер. Классика (5 лет)",
                                    "code": "IDC5"
                                },
                                {
                                    "description": "Драйвер. Купонный",
                                    "code": "IDC"
                                },
                                {
                                    "description": "Страйк Премиум",
                                    "code": "ISP"
                                }
                            ]
                        }
                    }
                }
            ];

            const actual = helper.getMultiValueSetCount(commissionRules);

            const expected = 2;

            expect(expected).to.deep.equal(actual);
        });

        it('getMultiValueSetCount for two rules without multivalues', function () {

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "Надежный выбор",
                                    "code": "ERC"
                                },
                                {
                                    "description": "Надежный выбор Премиум",
                                    "code": "ERCP"
                                },
                                {
                                    "description": "Вектор здоровья Премиум",
                                    "code": "EHVP"
                                }
                            ]
                        }
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": []
                        }
                    }
                }
            ];

            const actual = helper.getMultiValueSetCount(commissionRules);

            const expected = 1;

            expect(expected).to.deep.equal(actual);
        });

        it('getMultiValueSetCount for two rules with only one rule with multivalues', function () {

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": []
                        }
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": []
                        }
                    }
                }
            ];

            const actual = helper.getMultiValueSetCount(commissionRules);

            const expected = 0;

            expect(expected).to.deep.equal(actual);
        });

        it('getSequenceMap for two rules with multivalues', function () {

            const sequence = [10, 20];

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "Надежный выбор",
                                    "code": "ERC"
                                },
                                {
                                    "description": "Надежный выбор Премиум",
                                    "code": "ERCP"
                                },
                                {
                                    "description": "Вектор здоровья Премиум",
                                    "code": "EHVP"
                                }
                            ]
                        },
                        "ruleNum": 1
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": [
                                {
                                    "description": "Драйвер. Классика (5 лет)",
                                    "code": "IDC5"
                                },
                                {
                                    "description": "Драйвер. Купонный",
                                    "code": "IDC"
                                },
                                {
                                    "description": "Страйк Премиум",
                                    "code": "ISP"
                                }
                            ]
                        },
                        "ruleNum": 2
                    }
                }
            ];

            const actual = helper.getSequenceMap(commissionRules, sequence);

            const expected = {
                1: [10],
                2: [20]
            };

            expect(expected).to.deep.equal(actual);
        });

        it('getSequenceMap for two rules with one rule has multivalues', function () {

            const sequence = [10, 20];

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": []
                        },
                        "ruleNum": 1
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": [
                                {
                                    "description": "Драйвер. Классика (5 лет)",
                                    "code": "IDC5"
                                },
                                {
                                    "description": "Драйвер. Купонный",
                                    "code": "IDC"
                                },
                                {
                                    "description": "Страйк Премиум",
                                    "code": "ISP"
                                }
                            ]
                        },
                        "ruleNum": 2
                    }
                }
            ];

            const actual = helper.getSequenceMap(commissionRules, sequence);

            const expected = {
                1: [],
                2: [10]
            };

            expect(expected).to.deep.equal(actual);
        });

        it('getSequenceMap for two rules without multivalues', function () {

            const sequence = [10, 20];

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": []
                        },
                        "ruleNum": 1
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": []
                        },
                        "ruleNum": 2
                    }
                }
            ];

            const actual = helper.getSequenceMap(commissionRules, sequence);

            const expected = {
                1: [],
                2: []
            };

            expect(expected).to.deep.equal(actual);
        });

        it('getValueSatellitesForRule for two rules with multivalues', function () {

            const sequenceMap = {
                1: [10],
                2: [20]
            };

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "Надежный выбор",
                                    "code": "ERC"
                                },
                                {
                                    "description": "Надежный выбор Премиум",
                                    "code": "ERCP"
                                },
                                {
                                    "description": "Вектор здоровья Премиум",
                                    "code": "EHVP"
                                }
                            ]
                        },
                        "ruleNum": 1
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": [
                                {
                                    "description": "Драйвер. Классика (5 лет)",
                                    "code": "IDC5"
                                },
                                {
                                    "description": "Драйвер. Купонный",
                                    "code": "IDC"
                                },
                                {
                                    "description": "Страйк Премиум",
                                    "code": "ISP"
                                }
                            ]
                        },
                        "ruleNum": 2
                    }
                }
            ];

            const actual = helper.getValueSatellitesForRule(commissionRules, sequenceMap);

            const expected = [
                {
                    VALUE_REF_ID: 10,
                    STRING_VALUE: "ERC"
                },
                {
                    VALUE_REF_ID: 10,
                    STRING_VALUE: "ERCP"
                },
                {
                    VALUE_REF_ID: 10,
                    STRING_VALUE: "EHVP"
                },
                {
                    VALUE_REF_ID: 20,
                    STRING_VALUE: "IDC5"
                },
                {
                    VALUE_REF_ID: 20,
                    STRING_VALUE: "IDC"
                },
                {
                    VALUE_REF_ID: 20,
                    STRING_VALUE: "ISP"
                }
            ];

            expect(expected).to.deep.equal(actual);
        });

        it('getValueSatellitesForRule for two rules with one rule has multivalues', function () {

            const sequenceMap = {
                1: [],
                2: [20]
            };

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": []
                        },
                        "ruleNum": 1
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": [
                                {
                                    "description": "Драйвер. Классика (5 лет)",
                                    "code": "IDC5"
                                },
                                {
                                    "description": "Драйвер. Купонный",
                                    "code": "IDC"
                                },
                                {
                                    "description": "Страйк Премиум",
                                    "code": "ISP"
                                }
                            ]
                        },
                        "ruleNum": 2
                    }
                }
            ];

            const actual = helper.getValueSatellitesForRule(commissionRules, sequenceMap);

            const expected = [
                {
                    VALUE_REF_ID: 20,
                    STRING_VALUE: "IDC5"
                },
                {
                    VALUE_REF_ID: 20,
                    STRING_VALUE: "IDC"
                },
                {
                    VALUE_REF_ID: 20,
                    STRING_VALUE: "ISP"
                }
            ];

            expect(expected).to.deep.equal(actual);
        });

        it('getValueSatellitesForRule for two rules without multivalues', function () {

            const sequenceMap = {
                1: [],
                2: []
            };

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": []
                        },
                        "ruleNum": 1
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "175",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": []
                        },
                        "ruleNum": 2
                    }
                }
            ];

            const actual = helper.getValueSatellitesForRule(commissionRules, sequenceMap);

            const expected = [];

            expect(expected).to.deep.equal(actual);
        });

        it('getSatelliteRecordForRule returns expected result for ASs table schema', function () {

            const number = "123";

            const sequenceMap = {
                1: [10, 20, 30, 110],
                2: [40, 50, 60, 120]
            };

            const commissionRules = [
                {
                    "attributes": {
                        "registratorNumber": "123",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "Надежный выбор",
                                    "code": "ERC"
                                },
                                {
                                    "description": "Надежный выбор Премиум",
                                    "code": "ERCP"
                                },
                                {
                                    "description": "Вектор здоровья Премиум",
                                    "code": "EHVP"
                                }
                            ]
                        },
                        "insuranceCurrency": {
                            "isInverted": false,
                            "value": {
                                "code": "AED"
                            }
                        },
                        "insuranceTerm": {
                            "isInverted": false,
                            "value": {
                                "fromIncluded": true,
                                "toIncluded": true,
                                "from": 1,
                                "to": 2
                            }
                        },
                        "premiumPeriod": {
                            "isInverted": false,
                            "value": {
                                "fromIncluded": true,
                                "toIncluded": true,
                                "from": 1,
                                "to": 2
                            }
                        },
                        "isManualCorrectionDisabled": true,
                        "alwaysUseMaxRate": true,
                        "isDiscountDisabled": true,
                        "insuranceYear": {
                            "isInverted": false,
                            "value": {
                                "fromIncluded": true,
                                "toIncluded": true,
                                "from": 1,
                                "to": 1
                            }
                        },
                        "premiumPeriodType": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "Единовременно",
                                    "code": "1"
                                }
                            ]
                        },
                        "rate": 1,
                        "ruleNum": 1,
                        "creditProgram": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "РЖ18",
                                    "code": "РЖ17"
                                },
                                {
                                    "description": "РЖ19",
                                    "code": "РЖ18"
                                },
                                {
                                    "description": "РЖ15",
                                    "code": "РЖ19"
                                }
                            ]
                        },
                        "variant": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "Вариант 1",
                                    "code": "VARIANT_1"
                                }
                            ]
                        }
                    }
                },
                {
                    "attributes": {
                        "registratorNumber": "123",
                        "startDate": "2021-12-13",
                        "endDate": "2021-12-18",
                        "insuranceProduct": {
                            "isInverted": true,
                            "values": [
                                {
                                    "description": "Драйвер. Классика (5 лет)",
                                    "code": "IDC5"
                                },
                                {
                                    "description": "Драйвер. Купонный",
                                    "code": "IDC"
                                },
                                {
                                    "description": "Страйк Премиум",
                                    "code": "ISP"
                                }
                            ]
                        },
                        "insuranceCurrency": {
                            "isInverted": true,
                            "value": {
                                "code": "AED"
                            }
                        },
                        "insuranceTerm": {
                            "isInverted": false,
                            "value": {
                                "fromIncluded": true,
                                "toIncluded": true,
                                "from": 1,
                                "to": 2
                            }
                        },
                        "premiumPeriod": {
                            "isInverted": false,
                            "value": {
                                "fromIncluded": true,
                                "toIncluded": true,
                                "from": 1,
                                "to": 2
                            }
                        },
                        "isManualCorrectionDisabled": true,
                        "alwaysUseMaxRate": true,
                        "isDiscountDisabled": true,
                        "insuranceYear": {
                            "isInverted": false,
                            "value": {
                                "fromIncluded": true,
                                "toIncluded": true,
                                "from": 1,
                                "to": 1
                            }
                        },
                        "premiumPeriodType": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "Раз в полгода",
                                    "code": "3"
                                }
                            ]
                        },
                        "rate": 4,
                        "ruleNum": 2,
                        "creditProgram": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "РЖ11",
                                    "code": "РЖ18"
                                },
                                {
                                    "description": "РЖ12",
                                    "code": "РЖ19"
                                },
                                {
                                    "description": "РЖ13",
                                    "code": "РЖ15"
                                }
                            ]
                        },
                        "variant": {
                            "isInverted": false,
                            "values": [
                                {
                                    "description": "Вариант 1",
                                    "code": "VARIANT_1"
                                }
                            ]
                        }
                    }
                }
            ];

            const actual = commissionRules.map(rule => helper.getSatelliteRecordForRule(number, sequenceMap, rule));

            const expected = [
                {
                    AA_NUMBER: "123",
                    COMMISSION_TYPE: 'base',
                    RULE_NUM: 1,
                    START_DATE: "2021-12-13",
                    END_DATE: "2021-12-18",
                    REGISTRATOR_NUMBER: "123",
                    MIN_RATE: undefined,
                    MAX_RATE: undefined,
                    MAX_RATE_LIMIT: undefined,
                    RATE: 1,
                    EXPENSES_RATE: undefined,
                    NATURAL_PERSON_RATE: undefined,
                    SOLE_PROPRIATOR_RATE: undefined,
                    AMOUNT: undefined,
                    DISABLE_DISCOUNT: true,
                    DISABLE_MANUAL_CORRECTION: true,
                    ALWAYS_USE_MAX_RATE: true,
                    PRODUCT_VALUE_REF_ID: 10,
                    PRODUCT_INVERSION: false,
                    INSURANCE_YEAR_FROM: 1,
                    INSURANCE_YEAR_INCLUDE_FROM: true,
                    INSURANCE_YEAR_INCLUDE_TO: true,
                    INSURANCE_YEAR_TO: 1,
                    INSURANCE_CURRENCY: "AED",
                    INSURANCE_CURRENCY_INVERSION: false,
                    INSURANCE_TERM_FROM: 1,
                    INSURANCE_TERM_INCLUDE_FROM: true,
                    INSURANCE_TERM_TO: 2,
                    INSURANCE_TERM_INCLUDE_TO: true,
                    PREMIUM_PERIOD_FROM: 1,
                    PREMIUM_PERIOD_INCLUDE_FROM: true,
                    PREMIUM_PERIOD_TO: 2,
                    PREMIUM_PERIOD_INCLUDE_TO: true,
                    PREM_PERIOD_VALUE_REF_ID: 20,
                    CREDIT_PROGRAM_VALUE_REF_ID: 30,
                    CREDIT_PROGRAM_INVERSION: false,
                    VARIANT_VALUE_REF_ID: 110,
                    VARIANT_INVERSION: false,
                    MANUAL_RULE: undefined,
                    MANUAL_RULE_DESCRIPTION: undefined
                },
                {
                    AA_NUMBER: "123",
                    COMMISSION_TYPE: 'base',
                    RULE_NUM: 2,
                    START_DATE: "2021-12-13",
                    END_DATE: "2021-12-18",
                    REGISTRATOR_NUMBER: "123",
                    MIN_RATE: undefined,
                    MAX_RATE: undefined,
                    MAX_RATE_LIMIT: undefined,
                    RATE: 4,
                    EXPENSES_RATE: undefined,
                    NATURAL_PERSON_RATE: undefined,
                    SOLE_PROPRIATOR_RATE: undefined,
                    AMOUNT: undefined,
                    DISABLE_DISCOUNT: true,
                    DISABLE_MANUAL_CORRECTION: true,
                    ALWAYS_USE_MAX_RATE: true,
                    PRODUCT_VALUE_REF_ID: 40,
                    PRODUCT_INVERSION: true,
                    INSURANCE_YEAR_FROM: 1,
                    INSURANCE_YEAR_INCLUDE_FROM: true,
                    INSURANCE_YEAR_INCLUDE_TO: true,
                    INSURANCE_YEAR_TO: 1,
                    INSURANCE_CURRENCY: "AED",
                    INSURANCE_CURRENCY_INVERSION: true,
                    INSURANCE_TERM_FROM: 1,
                    INSURANCE_TERM_INCLUDE_FROM: true,
                    INSURANCE_TERM_TO: 2,
                    INSURANCE_TERM_INCLUDE_TO: true,
                    PREMIUM_PERIOD_FROM: 1,
                    PREMIUM_PERIOD_INCLUDE_FROM: true,
                    PREMIUM_PERIOD_TO: 2,
                    PREMIUM_PERIOD_INCLUDE_TO: true,
                    PREM_PERIOD_VALUE_REF_ID: 50,
                    CREDIT_PROGRAM_VALUE_REF_ID: 60,
                    CREDIT_PROGRAM_INVERSION: false,
                    VARIANT_VALUE_REF_ID: 120,
                    VARIANT_INVERSION: false,
                    MANUAL_RULE: undefined,
                    MANUAL_RULE_DESCRIPTION: undefined
                }
            ];

            expect(expected).to.deep.equal(actual);
        });
    });
});
