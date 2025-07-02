'use strict';

const assert = require('chai').assert;
const rewire = require('rewire');
const clientAction = rewire('@config-rgsl/work-calendar/view/MyCalendarView/UI/ClientAction/retrieveCalendarRulesForMonth');
/**
 * Tests for the client action which determines display data for the calendar:
 */
describe('WorkCalendarEdit: retrieval of calendar rules for a specific month', function () {
    const RuleLevelGeneral = 'general';
    const RuleLevelException = 'exception';
    const GeneralNonWorkDayColor = 'silver';
    const GeneralWorkDayColor = 'black';
    const ExceptionWorkDayColor = 'blue';
    const ExceptionNonWorkDayColor = 'red';

    /**
     * Tests for the function which handles the actual conversion from the retrieved availability data to calendar display data.
     */
    describe('Tests for convertAvailabilityToCalendarRules function', function () {
        const convertAvailabilityToCalendarRules = clientAction.__get__('convertAvailabilityToCalendarRules');
        const Year = 2019;
        const Month = 7;
        const NumberOfDaysInMonth = new Date(Year, Month + 1, 0).getDate();

        /**
         * Test that if we don't have any availability data, we default to the correct color without tooltip for all dates.
         */
        it('Unconfigured as non-work days', function () {
            // Arrange:
            const availabilityByDate = [];

            // Act:
            const output = convertAvailabilityToCalendarRules(availabilityByDate, Year, Month);

            // Assert:
            assert.equal(output.length, NumberOfDaysInMonth, 'The function outputed the wrong number of days!');
            output.forEach((dateElement) => {
                assertUnconfiguredDateData(dateElement);
            });
        });

        /**
         * Test that if a day is configured as a general non-workday, we handle it properly.
         */
        [0.0, undefined].forEach((workHours) => {
            it(`General rule with ${workHours} work hours`, function () {
                // Arrange:
                const TestDateString = '2019-08-05';
                const TestDescription = 'Normal non-work day.';
                const availabilityByDate = [
                    {
                        date: TestDateString,
                        description: TestDescription,
                        numberOfWorkHours: workHours,
                        ruleLevel: RuleLevelGeneral
                    }
                ];

                // Act:
                const output = convertAvailabilityToCalendarRules(availabilityByDate, Year, Month);

                // Assert:
                const configuredDateElementResult = findAndAssertDateData(output, TestDateString);
                assertConfiguredDateData(configuredDateElementResult, GeneralNonWorkDayColor, TestDescription);
            });
        });

        /**
         * Test that if a day is configured as a general work day, we handle it properly.
         */
        it('General rule with positive work hours', function () {
            // Arrange:
            const TestDateString = '2019-08-01';
            const TestDescription = 'Normal work day.';
            const availabilityByDate = [
                {
                    date: TestDateString,
                    description: TestDescription,
                    numberOfWorkHours: 8.0,
                    ruleLevel: RuleLevelGeneral
                }
            ];

            // Act:
            const output = convertAvailabilityToCalendarRules(availabilityByDate, Year, Month);

            // Assert:
            const configuredDateElementResult = findAndAssertDateData(output, TestDateString);
            assertConfiguredDateData(configuredDateElementResult, GeneralWorkDayColor, TestDescription);
        });

        /**
         * Test that if a day is configured as an exception non-work day, we handle it properly.
         */
        [0.0, undefined].forEach((workHours) => {
            it(`Exception with ${workHours} work hours`, function () {
                // Arrange:
                const TestDateString = '2019-08-14';
                const TestDescription = 'Exception non-work day.';
                const availabilityByDate = [
                    {
                        date: TestDateString,
                        description: TestDescription,
                        numberOfWorkHours: workHours,
                        ruleLevel: RuleLevelException
                    }
                ];

                // Act:
                const output = convertAvailabilityToCalendarRules(availabilityByDate, Year, Month);

                // Assert:
                const configuredDateElementResult = findAndAssertDateData(output, TestDateString);
                assertConfiguredDateData(configuredDateElementResult, ExceptionNonWorkDayColor, TestDescription);
            });
        });

        /**
         * Test that if a day is configured as an exception work day, we handle it properly.
         */
        it('Exception rule with positive work hours', function () {
            // Arrange:
            const TestDateString = '2019-08-22';
            const TestDescription = 'Exception work day.';
            const availabilityByDate = [
                {
                    date: TestDateString,
                    description: TestDescription,
                    numberOfWorkHours: 8.0,
                    ruleLevel: RuleLevelException
                }
            ];

            // Act:
            const output = convertAvailabilityToCalendarRules(availabilityByDate, Year, Month);

            // Assert:
            const configuredDateElementResult = findAndAssertDateData(output, TestDateString);
            assertConfiguredDateData(configuredDateElementResult, ExceptionWorkDayColor, TestDescription);
        });

        /**
         * Test that configured availabilities rules properly override default rules (everything unconfigured is a non-work day).
         */
        it(`Availability rules are merged with default rules properly`, function () {
            // Arrange:
            const TestDateString1 = '2019-08-07';
            const TestDateString2 = '2019-08-28';
            const TestDescription1 = 'Test description 1.';
            const TestDescription2 = 'Test description 2.';
            const availabilityByDate = [
                {
                    date: TestDateString1,
                    description: TestDescription1,
                    numberOfWorkHours: 8.0,
                    ruleLevel: RuleLevelException
                },
                {
                    date: TestDateString2,
                    description: TestDescription2,
                    numberOfWorkHours: 0.0,
                    ruleLevel: RuleLevelException
                }
            ];

            // Act:
            const output = convertAvailabilityToCalendarRules(availabilityByDate, Year, Month);

            // Assert:
            assert.equal(output.length, NumberOfDaysInMonth, 'The function outputed the wrong number of days!');
            assertAllDatesAreCovered(output);

            const configuredDate1ElementResult = findAndAssertDateData(output, TestDateString1);
            assertConfiguredDateData(configuredDate1ElementResult, ExceptionWorkDayColor, TestDescription1);

            const configuredDate2ElementResult = findAndAssertDateData(output, TestDateString2);
            assertConfiguredDateData(configuredDate2ElementResult, ExceptionNonWorkDayColor, TestDescription2);

            output.forEach((dateElement) => {
                if (dateElement.date !== TestDateString1 && dateElement.date !== TestDateString2) {
                    assertUnconfiguredDateData(dateElement);
                }
            });
        });

        /**
         * Assert that unconfigured dates default to the correct color and do not have a description set.
         *
         * @param {Object} dateElement - Calendar display data for a date.
         */
        function assertUnconfiguredDateData(dateElement) {
            assert.equal(dateElement.color, GeneralNonWorkDayColor, `Date element for ${dateElement.date} was not colored properly!`);
            assert.notProperty(dateElement, 'description', 'Unconfigured elements should not have a description set.');
        }

        /**
         * Find the correct calendar display data for a date, assert that it's unique by the date and return it.
         *
         * @param {Array} dateElements - All resulting calendar display data.
         * @param {string} dateString - Date string, e.g. "2000-12-31"
         */
        function findAndAssertDateData(dateElements, dateString) {
            const configuredDateElementResults = dateElements.filter((dateElement) => dateElement.date === dateString);
            assert.equal(configuredDateElementResults.length, 1, 'There should be exactly one result for one configured date!');
            return configuredDateElementResults[0];
        }

        /**
         * Assert that both color and description of the date element are correctly set.
         *
         * @param {Object} dateElement - Calendar display data for a date.
         * @param {string} expectedColor - What the result should have been colored.
         * @param {string} expectedDescription - What tooltip we expect for the date.
         */
        function assertConfiguredDateData(dateElement, expectedColor, expectedDescription) {
            assert.equal(dateElement.color, expectedColor, 'The configured date was not colored properly!');
            assert.equal(dateElement.description, expectedDescription, 'The configured date did not have the availability description propagated!');
        }

        /**
         * Assert that all dates have a resulting element from the retrieval.
         *
         * @param {Array} dateElements - All resulting calendar display data.
         */
        function assertAllDatesAreCovered(dateElements) {
            for (let date = 1; date <= NumberOfDaysInMonth; date++) {
                const dateString = `2019-08-${(date < 10 ? '0' : '') + date}`;
                const dateElementResults = dateElements.filter(dateElement => dateElement.date === dateString);
                assert.equal(dateElementResults.length, 1, 'Each date in the month should have exactly one resulting entry!');
            }
        }
    });
});
