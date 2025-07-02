'use strict';

const { expect } = require("chai");

const {
    getAtomicValueDimension,
    getRangeValueDimension,
    getSetValueDimension,
    getAnyValueDimension,
    getRuleDimension
} = require('@config-rgsl/agent-agreement-base/lib/AAConsistency');

describe('Lib', function () {

    describe('Agent agreement consistency', function () {

        it('atomic intersect', function () {

            let actual = getAtomicValueDimension(1).intersect(getAtomicValueDimension(1));
            let expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getAtomicValueDimension('1').intersect(getAtomicValueDimension('2'));
            expected = false;
            expect(expected).to.deep.equal(actual);

            actual = getAtomicValueDimension(2).intersect(getAnyValueDimension());
            expected = true;
            expect(expected).to.deep.equal(actual);

            let dimension = getAtomicValueDimension('1');
            dimension.setInversedValue(true);
            actual = dimension.intersect(getAnyValueDimension());
            expected = true;
            expect(expected).to.deep.equal(actual);

            dimension = getAtomicValueDimension('1');
            dimension.setInversedValue(false);
            actual = dimension.intersect(getAnyValueDimension());
            expected = true;
            expect(expected).to.deep.equal(actual);

            let firstDimension = getAtomicValueDimension('1');
            firstDimension.setInversedValue(false);
            let secondDimension = getAtomicValueDimension('1');
            secondDimension.setInversedValue(false);
            actual = firstDimension.intersect(secondDimension);
            expected = true;
            expect(expected).to.deep.equal(actual);

            firstDimension = getAtomicValueDimension('2');
            firstDimension.setInversedValue(false);
            secondDimension = getAtomicValueDimension('1');
            secondDimension.setInversedValue(false);
            actual = firstDimension.intersect(secondDimension);
            expected = false;
            expect(expected).to.deep.equal(actual);

            firstDimension = getAtomicValueDimension('1');
            firstDimension.setInversedValue(true);
            secondDimension = getAtomicValueDimension('1');
            secondDimension.setInversedValue(true);
            actual = firstDimension.intersect(secondDimension);
            expected = true;
            expect(expected).to.deep.equal(actual);

            firstDimension = getAtomicValueDimension('1');
            firstDimension.setInversedValue(true);
            secondDimension = getAtomicValueDimension('2');
            secondDimension.setInversedValue(true);
            actual = firstDimension.intersect(secondDimension);
            expected = true;
            expect(expected).to.deep.equal(actual);

            firstDimension = getAtomicValueDimension('1');
            firstDimension.setInversedValue(true);
            secondDimension = getAtomicValueDimension('2');
            secondDimension.setInversedValue(false);
            actual = firstDimension.intersect(secondDimension);
            expected = true;
            expect(expected).to.deep.equal(actual);

            firstDimension = getAtomicValueDimension('1');
            firstDimension.setInversedValue(true);
            secondDimension = getAtomicValueDimension('1');
            secondDimension.setInversedValue(false);
            actual = firstDimension.intersect(secondDimension);
            expected = false;
            expect(expected).to.deep.equal(actual);
        });

        it('range intersect', function () {

            let actual = getRangeValueDimension(1, 2).intersect(getRangeValueDimension(2, 2));
            let expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getRangeValueDimension(1, 3).intersect(getRangeValueDimension(2, 6));
            expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getRangeValueDimension(undefined, 3).intersect(getRangeValueDimension(2, 6));
            expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getRangeValueDimension(undefined, 1).intersect(getRangeValueDimension(2, 6));
            expected = false;
            expect(expected).to.deep.equal(actual);

            actual = getRangeValueDimension(1, 3).intersect(getRangeValueDimension(4, 6));
            expected = false;
            expect(expected).to.deep.equal(actual);

            actual = getRangeValueDimension(1, 3).intersect(getRangeValueDimension(4, undefined));
            expected = false;
            expect(expected).to.deep.equal(actual);

            actual = getRangeValueDimension(1, 3).intersect(getRangeValueDimension(2, undefined));
            expected = true;
            expect(expected).to.deep.equal(actual);
        });

        it('set intersect', function () {

            let actual = getSetValueDimension([1, 2, 3, 4]).intersect(getSetValueDimension([2, 5, 6]));
            let expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getSetValueDimension([1, 2, 3, 4]).intersect(getSetValueDimension([7, 5, 6]));
            expected = false;
            expect(expected).to.deep.equal(actual);
        });

        it('set inverse', function () {

            const actual = getSetValueDimension([1]).inverse(getSetValueDimension([1, 2, 3])).set;
            const expected = getSetValueDimension([2, 3]).set;
            expect(expected).to.deep.equal(actual);
        });

        it('set inverse intersect', function () {

            let actual = getSetValueDimension([1]).inverse(getSetValueDimension([1, 2, 3])).intersect(getSetValueDimension([2]));
            let expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getSetValueDimension([1, 2]).inverse(getSetValueDimension([1, 2, 3, 4])).intersect(getSetValueDimension([2, 3]));
            expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getSetValueDimension([1, 2]).inverse(getSetValueDimension([1, 2, 3, 4])).intersect(getSetValueDimension([2]));
            expected = false;
            expect(expected).to.deep.equal(actual);
        });

        it('any intersect', function () {
            // set
            let actual = getSetValueDimension([1]).intersect(getAnyValueDimension());
            let expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getAnyValueDimension().intersect(getSetValueDimension([1]));
            expected = true;
            expect(expected).to.deep.equal(actual);

            // range
            actual = getRangeValueDimension(getAtomicValueDimension(1), getAtomicValueDimension(3)).intersect(getAnyValueDimension());
            expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getAnyValueDimension().intersect(getRangeValueDimension(getAtomicValueDimension(1), getAtomicValueDimension(3)));
            expected = true;
            expect(expected).to.deep.equal(actual);

            // atomic
            actual = getAtomicValueDimension(1).intersect(getAnyValueDimension());
            expected = true;
            expect(expected).to.deep.equal(actual);

            actual = getAnyValueDimension().intersect(getAtomicValueDimension(1));
            expected = true;
            expect(expected).to.deep.equal(actual);
        });

        it('rule intersect', function () {

            let r1 = getRuleDimension(
                [
                    getSetValueDimension([1, 2]),
                    getAnyValueDimension()
                ]
            );

            let r2 = getRuleDimension(
                [
                    getSetValueDimension([1]),
                    getSetValueDimension(['a', 'b'])
                ]
            );

            let actual = r1.intersect(r2);
            let expected = true;
            expect(expected).to.deep.equal(actual);

            actual = r2.intersect(r1);
            expected = true;
            expect(expected).to.deep.equal(actual);

            r1 = getRuleDimension(
                [
                    getSetValueDimension([1, 2]),
                    getSetValueDimension(['a', 'b'])
                ]
            );

            r2 = getRuleDimension(
                [
                    getSetValueDimension([2]),
                    getSetValueDimension(['c', 'b'])
                ]
            );

            actual = r1.intersect(r2);
            expected = true;
            expect(expected).to.deep.equal(actual);

            actual = r2.intersect(r1);
            expected = true;
            expect(expected).to.deep.equal(actual);
        });
    });
});

