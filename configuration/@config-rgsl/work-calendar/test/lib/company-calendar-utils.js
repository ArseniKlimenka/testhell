'use strict';

const expect = require('chai').expect;
const rewire = require("rewire");
const companyCalendarUtils = rewire("@config-rgsl/work-calendar/lib/CompanyCalendarUtils");

describe('Company calendar utils', function() {

    it('should return result of getFollowingWorkingDay function', function () {
        const workCalendarAvailabilityMock = {
            getFollowingWorkingDay: function (calendarCode, startDate, numberOfWorkingDays) {
                return '2021-06-14';
            }
        };
        companyCalendarUtils.__set__('workCalendarAvailability', workCalendarAvailabilityMock);

        const result = companyCalendarUtils.calculateFollowingWorkingDayForCompany(1);

        expect(result).to.equal('2021-06-14');
    });

    it('should return undefined if no calendar is found by code', function () {
        const workCalendarAvailabilityMock = {
            getFollowingWorkingDay: function (calendarCode, startDate, numberOfWorkingDays) {
                throw new Error("ORG_0027");
            }
        };
        companyCalendarUtils.__set__('workCalendarAvailability', workCalendarAvailabilityMock);

        const result = companyCalendarUtils.calculateFollowingWorkingDayForCompany(1);

        expect(result).to.equal(undefined);
    });

    it('should throw error if any other error is thrown', function () {
        const workCalendarAvailabilityMock = {
            getFollowingWorkingDay: function (calendarCode, startDate, numberOfWorkingDays) {
                throw new Error('SomeOtherError');
            }
        };
        companyCalendarUtils.__set__('workCalendarAvailability', workCalendarAvailabilityMock);

        expect(() => companyCalendarUtils.calculateFollowingWorkingDayForCompany(1)).to.throw('SomeOtherError');
    });

});
