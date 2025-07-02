'use strict';

const { expect } = require("chai");

const helper = require('@config-rgsl/agent-agreement-base/lib/AAComCalculationIntegrationServiceHelper');

describe('Lib', function () {

    describe('Agent agreement commission calculation service helper', function () {

        it('getStringValue should return selector value', function () {

            const actual = helper.getStringValue({property:'Test'}, x => x.property, '');

            const expected = 'Test';

            expect(expected).to.deep.equal(actual);
        });

        it('getIntegerValue should return selector value', function () {

            const actual = helper.getIntegerValue({property:1}, x => x.property, 0);

            const expected = 1;

            expect(expected).to.deep.equal(actual);
        });

        it('getBooleanValue should return selector value', function () {

            const actual = helper.getBooleanValue({property:true}, x => x.property, false);

            const expected = true;

            expect(expected).to.deep.equal(actual);
        });

        it('getStringValue should return provided default value', function () {

            const actual = helper.getStringValue(undefined, x => x.property, '');
            const expected = '';

            expect(expected).to.deep.equal(actual);
        });

        it('getIntegerValue should return provided default value', function () {

            const actual = helper.getIntegerValue(undefined, x => x.property, 0);

            const expected = 0;

            expect(expected).to.deep.equal(actual);
        });

        it('getBooleanValue should return provided default value', function () {

            const actual = helper.getBooleanValue(undefined, x => x.property, false);

            const expected = false;

            expect(expected).to.deep.equal(actual);
        });
    });
});

