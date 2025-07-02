'use strict';

const expect = require('chai').expect;
const workCalendarUtils = require('@config-rgsl/work-calendar/lib/WorkCalendarUtilsImpl');

/**
 * Tests for the library WorkCalendarUtils.
 */
describe('Work calendar utils', function() {

    /**
     * Tests for the function isRuleInDateRange which checks if rule fall in to the search range.
     */
    describe('Checking if rule fall in the date range', function () {

        /**
         *                         |--------- rule ---------|
         * |--- range ---|
         */
        it('Date range outside (before) rule range should not be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-03-01', '2019-03-31');

            expect(isInRange).to.be.false;
        });

        /**
         *            |--------- rule ---------|
         * |--- range ---|
         */
        it('Date range overlapping rule (in beginning) should be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-04-01', '2019-05-15');

            expect(isInRange).to.be.true;
        });

        /**
         * |--------- rule ---------|
         *      |--- range ---|
         */
        it('Date range inside rule should be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-05-05', '2019-05-15');

            expect(isInRange).to.be.true;
        });

        /**
         * |--------- rule ---------|
         *                     |--- range ---|
         */
        it('Date range overlapping rule (at the end) should be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-05-15', '2019-06-15');

            expect(isInRange).to.be.true;
        });

        /**
         * |--------- rule ---------|
         *                                |--- range ---|
         */
        it('Date range outside (after) rule should not be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-07-01', '2019-07-15');

            expect(isInRange).to.be.false;
        });

        /**
         *        |--------- rule ---------|
         * <............. --- range --- .............>
         */
        it('Undefined date range should be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, undefined, undefined);

            expect(isInRange).to.be.true;
        });

        /**
         *           |--------- rule ---------|
         * |----------- range ..............................>
         */
        it('Defined only range dateFrom BEFORE rule should be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-04-01', undefined);

            expect(isInRange).to.be.true;
        });

        /**
         * |--------- rule ---------|
         *         |----------- range ............>
         */
        it('Defined only range dateFrom INSIDE rule should be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-05-15', undefined);

            expect(isInRange).to.be.true;
        });

        /**
         * |--------- rule ---------|
         *                               |------ range .......>
         */
        it('Defined only range dateFrom AFTER rule should not be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-07-01', undefined);

            expect(isInRange).to.be.false;
        });

        /**
         *                         |--------- rule ---------|
         * <........ range ----|
         */
        it('Defined only range dateTo BEFORE rule should not be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, undefined, '2019-04-01');

            expect(isInRange).to.be.false;
        });

        /**
         *              |--------- rule ---------|
         * <........ range ----|
         */
        it('Defined only range dateTo INSIDE rule should be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, undefined, '2019-05-15');

            expect(isInRange).to.be.true;
        });

        /**
         *        |--------- rule ---------|
         * <.................. range -------------------|
         */
        it('Defined only range dateTo AFTER rule should be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, undefined, '2019-08-01');

            expect(isInRange).to.be.true;
        });

        /**
         * |--------- rule ---------|
         *     ^
         *   range
         */
        it('Range defined in the same day inside rule should be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-05-01', '2019-05-01');

            expect(isInRange).to.be.true;
        });

        /**
         *          |--------- rule ---------|
         *     ^
         *   range
         */
        it('Range defined in the same day outside rule should not be in the range', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-04-01', '2019-04-01');

            expect(isInRange).to.be.false;
        });

        /**
         *              |--------- range ---------|
         * |--------- rule ---------|
         *     ^
         *    date
         */
        it('Yearly rule with date outside the search range should not be in the range', function () {
            const rule = {
                dateFrom: '2019-01-01',
                dateTo: '2019-12-31',
                repetition: {
                    pattern: 'yearly',
                    eventDate: '0001-02-01'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-06-01', '2020-06-01');

            expect(isInRange).to.be.false;
        });

        /**
         * |--------- range ---------|
         *             |--------- rule ---------|
         *                 ^
         *                date
         */
        it('Yearly rule with date inside the search range should be in the range', function () {
            const rule = {
                dateFrom: '2019-01-01',
                dateTo: '2019-12-31',
                repetition: {
                    pattern: 'yearly',
                    eventDate: '0001-02-01'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2018-06-01', '2019-06-01');

            expect(isInRange).to.be.true;
        });

        /**
         *          |--- range ---|
         * |--------- rule ---------|
         *     ^
         *    date
         */
        it('Yearly rule with date outside the short search range should not be in the range', function () {
            const rule = {
                dateFrom: '2019-01-01',
                dateTo: '2019-12-31',
                repetition: {
                    pattern: 'yearly',
                    eventDate: '0001-02-01'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-04-01', '2019-11-01');

            expect(isInRange).to.be.false;
        });

        /**
         *              |--------- range ---------|
         * |--------- rule ---------|------------------------|
         *     ^                        ^
         *    date                     date
         */
        it('Yearly rule (multi years) with date inside the search range should be in the range', function () {
            const rule = {
                dateFrom: '2019-01-01',
                dateTo: '2020-12-31',
                repetition: {
                    pattern: 'yearly',
                    eventDate: '0001-02-01'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-06-01', '2020-06-01');

            expect(isInRange).to.be.true;
        });

        /**
         *          |--- range ---|
         * |--------- rule ---------|------------------------|
         *     ^                        ^
         *    date                     date
         */
        it('Yearly rule (multi years) with search range between dates should not be in the range', function () {
            const rule = {
                dateFrom: '2019-01-01',
                dateTo: '2020-12-31',
                repetition: {
                    pattern: 'yearly',
                    eventDate: '0001-02-01'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-04-01', '2019-11-01');

            expect(isInRange).to.be.false;
        });

        /**
         * |----------------- range -----------|
         *  T F S S|M T W T F S S|M T W T F S S|
         *         |--- rule ----|
         *          M T W T F S S
         *            ^
         */
        it('Weekly rule inside search range should be in the range', function () {
            const rule = {
                dateFrom: '2019-09-02',
                dateTo: '2019-09-08',
                repetition: {
                    pattern: 'weekly',
                    dayOfWeek: 'tuesday'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-08-29', '2019-09-15');

            expect(isInRange).to.be.true;
        });

        /**
         *       |- range -|
         *        T F S S|M
         * |--- rule ----|-------------|
         *  M T W T F S S M T W T F S S
         *    ^             ^
         */
        it('Weekly rule with search range between weekdays should not be in the range', function () {
            const rule = {
                dateFrom: '2019-09-02',
                dateTo: '2019-09-15',
                repetition: {
                    pattern: 'weekly',
                    dayOfWeek: 'tuesday'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-09-05', '2019-09-09');

            expect(isInRange).to.be.false;
        });

        /**
         *       |------- range -------|
         *        T F S S|M T W T F S S|
         * |--- rule ----|
         *  M T W T F S S
         *    ^
         */
        it('Weekly rule with search range after rule weekday should not be in the range', function () {
            const rule = {
                dateFrom: '2019-09-02',
                dateTo: '2019-09-08',
                repetition: {
                    pattern: 'weekly',
                    dayOfWeek: 'tuesday'
                }
            };

            const isInRange = workCalendarUtils.isRuleInDateRange(rule, '2019-09-05', '2019-09-15');

            expect(isInRange).to.be.false;
        });
    });

    /**
     * Tests for the function getRepetitionMessage which return message based on rule repetition info.
     */
    describe('Rule repetition message', function () {

        const mockedAmbientProperties = {
            services: {
                'translate': {
                    getSync: (module, translationKey) => {
                        const parts = translationKey.split('@');
                        return parts.pop();
                    }
                }
            }
        };

        /**
         * Daily rule should return just message Daily.
         */
        it('Daily rule should return message Daily', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'daily'
                }
            };

            const msg = workCalendarUtils.getRepetitionMessage(rule, 'TEST', mockedAmbientProperties);

            expect(msg).to.equal('daily');
        });

        /**
         * Weekly rule should return name of the day in the week (e.g. Monday, Friday, ...).
         */
        it('Weekly rule should return name of the day in the week', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'weekly',
                    dayOfWeek: 'friday'
                }
            };

            const msg = workCalendarUtils.getRepetitionMessage(rule, 'TEST', mockedAmbientProperties);

            expect(msg).to.equal('friday');
        });

        /**
         * Yearly rules should return date of the event in the year, without year number (e.q. 01.05., 25.12., ...).
         */
        it('Yearly rule should return date of the event in the year', function () {
            const rule = {
                dateFrom: '2019-05-01',
                dateTo: '2019-05-31',
                repetition: {
                    pattern: 'yearly',
                    eventDate: '0001-05-15'
                }
            };

            const msg = workCalendarUtils.getRepetitionMessage(rule, 'TEST', mockedAmbientProperties);

            expect(msg).to.equal('15.05.');
        });
    });

    /**
     * Tests for the function getIsWorkdayIcon which return icon info based on workday flag.
     */
    describe('Rule is workday icon', function () {

        /**
         * Workday have check mark icon
         */
        it('Workday should have Check icon', function () {
            const iconInfo = workCalendarUtils.getIsWorkdayIcon(true);

            expect(iconInfo.name).to.equal('Check');
        });

        /**
         * Non working day has a cross icon
         */
        it('Non working day should not have icon', function () {
            const iconInfo = workCalendarUtils.getIsWorkdayIcon(false);

            expect(iconInfo).to.equal(undefined);
        });
    });

    /**
     * Tests for the function getTimeInMinutes which return number of minutes passed from 00:00 to the given time of the day.
     */
    describe('Time to minutes converter', function () {

        const testCases = [
            {
                scenarioDescription: 'Times with leading zeros (e.g. 07:05) should be calculated',
                time: '07:05',
                expectedMinutes: (7 * 60 + 5)
            },
            {
                scenarioDescription: 'Times without leading zeros (e.g. 7:8) should be calculated',
                time: '7:8',
                expectedMinutes: (7 * 60 + 8)
            }
        ];

        testCases.forEach(
            testCase => {
                it(testCase.scenarioDescription, function () {
                    const minutes = workCalendarUtils.getTimeInMinutes(testCase.time);

                    expect(minutes).to.equal(testCase.expectedMinutes);
                });
            }
        );
    });

    /**
     * Tests for the function calculateCapacity which return capacity in given period.
     */
    describe('Capacity calculator', function () {

        const testCases = [
            // If parameters 'from' or 'to' are not set then return capacity 0.
            {
                scenarioDescription: 'When \'from\' or \'to\' are not set should return 0',
                from: null,
                to: undefined,
                expectedCapacity: 0.00
            },
            // If parameter 'to' is before 'from' should return capacity 0
            {
                scenarioDescription: 'When \'to\' is before \'from\' should return capacity 0',
                from: '10:00',
                to: '07:00',
                expectedCapacity: 0.00
            },
            // Correct test cases
            {
                scenarioDescription: 'The same time for \'from\' and \'to\' should return 0 hours',
                from: '7:00',
                to: '7:00',
                expectedCapacity: 0.00
            },
            {
                scenarioDescription: 'Time range whole hour apart should return correct capacity',
                from: '7:00',
                to: '10:00',
                expectedCapacity: 3.00
            },
            {
                scenarioDescription: 'Time range in between hours should return correct capacity in hours with decimal places',
                from: '7:30',
                to: '10:00',
                expectedCapacity: 2.50
            }
        ];

        testCases.forEach(
            testCase => {
                it(testCase.scenarioDescription, function () {
                    const capacity = workCalendarUtils.calculateCapacity(testCase.from, testCase.to);

                    expect(capacity).to.equal(testCase.expectedCapacity);
                });
            }
        );
    });

    /**
     * Tests for the function fillRulesWithBaseCalendarRules which fills rules with rules from parent calendar.
     */
    describe('Filling rules with rules from parent calendar', function () {

        function mockApi(parentCalendarRules) {
            return {
                call: (request) => {
                    return new Promise((resolve) => {
                        resolve(parentCalendarRules);
                    });
                }
            };
        }

        /**
         * If parent calendar is not set then calendar rules should be unchanged.
         */
        it('Should keep calendar rules unchanged if parent calendar is not set', async function () {
            const body = {
                rules: [
                    {
                        description: 'TestRuleA'
                    },
                    {
                        description: 'TestRuleB'
                    }
                ]
            };

            await workCalendarUtils.fillRulesWithBaseCalendarRules(body, mockApi([]));

            const expectedRules = [
                {
                    description: 'TestRuleA'
                },
                {
                    description: 'TestRuleB'
                }
            ];

            expect(body.rules).to.deep.equal(expectedRules);
        });

        /**
         * If parent calendar is set then calendar rules should also include its rules.
         */
        it('Calendar rules should include parent rules if parent calendar is set', async function () {
            const body = {
                parentCalendarCode: 'parentCode',
                rules: [
                    {
                        description: 'TestRuleA'
                    },
                    {
                        description: 'TestRuleB'
                    }
                ]
            };

            const parentCalendarRules = [
                {
                    description: 'TestInheritedInheritedRule',
                    sourceCalendarCode: 'sourceCode'
                },
                {
                    description: 'TestInheritedRuleA'
                },
                {
                    description: 'TestInheritedRuleB'
                }
            ];

            await workCalendarUtils.fillRulesWithBaseCalendarRules(body, mockApi(parentCalendarRules));

            const expectedRules = [
                {
                    description: 'TestInheritedInheritedRule',
                    sourceCalendarCode: 'sourceCode'
                },
                {
                    description: 'TestInheritedRuleA',
                    sourceCalendarCode: 'parentCode'
                },
                {
                    description: 'TestInheritedRuleB',
                    sourceCalendarCode: 'parentCode'
                },
                {
                    description: 'TestRuleA'
                },
                {
                    description: 'TestRuleB'
                }
            ];

            expect(body.rules).to.deep.equal(expectedRules);
        });
    });
});
