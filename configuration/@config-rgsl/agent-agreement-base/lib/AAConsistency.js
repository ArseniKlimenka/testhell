'use strict';

const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

function getAtomicValueDimension(value, dimensionTag) {

    const dimension = {
        value: value,
        inversed: false,
        setInversedValue: function (value) {
            this.inversed = value;
        },
        intersect: function (other) {

            return isAcceptsAnyValue(other) || ('value' in other && areAtomicValuesIntersected(this, other));
        },
        tag: dimensionTag
    };

    return dimension;
}

function getRangeValueDimension(start, end, dimensionTag) {
    return {
        start: start,
        end: end,
        intersect: function (other) {
            return isAcceptsAnyValue(other) ||
                (
                    ('start' in other) &&
                    ('end' in other) &&
                    (this.start === undefined ||
                        other.end === undefined ||
                        (typeof this.start == "object" && typeof other.end == "object" && dateHelper.isBeforeOrEqual(this.start, other.end)) ||
                        (typeof this.start != "object" && typeof other.end != "object" && this.start <= other.end)) &&
                    (this.end === undefined ||
                        other.start === undefined ||
                        (typeof this.end == "object" && typeof other.start == "object" && dateHelper.isAfterOrEqual(this.end, other.start)) ||
                        (typeof this.end != "object" && typeof other.start != "object" && this.end >= other.start))
                );
        },
        tag: dimensionTag
    };
}

function getSetValueDimension(array, dimensionTag) {

    return {
        set: new Set(array),
        inversed: false,
        setInversedValue: function (value) {
            this.inversed = value;
        },
        intersect: function (other) {
            return isAcceptsAnyValue(other) ||
                (
                    ('set' in other) &&
                    (this.inversed === other.inversed) &&
                    [...this.set].some(x => other.set.has(x))
                );
        },
        inverse: function (universal) {
            return {
                set: new Set([...universal.set].filter(x => !this.set.has(x))),
                intersect: this.intersect,
                inverse: this.inverse,
                inversed: this.inversed
            };
        },
        tag: dimensionTag
    };
}

function isAcceptsAnyValue(value) {

    return ('acceptsAnyValue' in value) && value.acceptsAnyValue;
}

function areAtomicValuesIntersected(first, second) {

    if ((first.value === second.value && !!first.inversed !== !!second.inversed) || (first.value !== second.value && !first.inversed && !second.inversed)) {

        return false;
    }


    return true;

}

function getAnyValueDimension(dimensionTag) {

    return {
        acceptsAnyValue: true,
        inversed: false,
        setInversedValue: function (value) {
            this.inversed = value;
        },
        intersect: function (other) {
            return true;
        },
        tag: dimensionTag
    };
}

function setWrapperTag(value, tag) {
    value.tag = tag;
    return value;
}

function getRuleDimension(dimensions, dimensionTag) {
    return {
        dimensions: dimensions,
        intersect: function (other) {
            return this.dimensions.every((x, i) => x.intersect(other.dimensions[i]));
        },
        tag: dimensionTag
    };
}

module.exports = {
    getAtomicValueDimension,
    getRangeValueDimension,
    getSetValueDimension,
    getRuleDimension,
    getAnyValueDimension,
    setWrapperTag
};
