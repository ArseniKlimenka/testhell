'use strict';

/**
     * @deprecated A legacy feature. Use '?.' operator
     * @description
     * Checks that all props exist in object and returns result
     * @param {Object} object Object with properties
     * @param {String} path Path to result property starting from first prop in input
     * @param {any} [defaultValue] Dafult value, that returns if property doesn't exists
     * @example
     * let input = {prop1: {prop2: {result: 60}}};
     * getValue(input, 'prop1.prop2.result') //returns 60
     * getValue(input, 'prop1.prop2') //returns {result: 60} object
     * getValue(input, 'prop10.myProp.superProp') //returns undefined
     * @returns {any} Result or, if prop doesn't exist - undefined
     */
function getValue(object, path = '', defaultValue) {
    path = path.split('.');
    let result;
    path.forEach(level => {
        try {
            object = object[level];
            result = object == null ? defaultValue : object;
        } catch (error) {
            result = defaultValue;
        }
    });
    return result == undefined ? defaultValue : result;
}

/**
 * @description
 * Checks that all props exist in object and sets value
 * @param {Object} object Object with properties
 * @param {String} path Path to property starting from first prop in input
 * @param {any} [value] Value to be set
 * @example
 * let input = {prop1: {prop2: {result: 60}}};
 * setValue(input, 'prop1.prop2.result', 70) //returns {prop1: {prop2: {result: 70}}}
 * setValue(input, 'prop1.prop2.result', {data: 50}) //returns {prop1: {prop2: {result: {data: 50}}}}
 * setValue(input, 'prop1.prop2.result2', {data: 40}) //returns {prop1: {prop2: {result: {data: 50}, result2: {data: 50}}}}
 * setValue(input, 'prop1.prop3.result', {data: 50}) //returns {prop1: {prop2: {result: 60}}}
 */
function setValue(object, fullPath = '', value) {
    const path = fullPath.split('.');
    const pathToAtt = path.pop();
    let member = object;
    path.forEach(level => {
        try {
            member = member[level];
        } catch (error) { return; }
    });
    if (member != undefined) { member[pathToAtt] = value; }

    return object;
}

/**
 * @description
 * Replaces value of all properties with the given name
 * @param {Object} object Object with properties
 * @param {String} propertyName Name of the property which value need to be changed
 * @param {any} [newValue] Value to be set
 * @example
 * let input = {prop1: {prop2: {result: 60}}, result: 70};
 * replaceValue(input, 'result', 80) //returns {prop1: {prop2: {result: 80}}, result: 80}
 */
function replaceValue(object, propertyName = '', newValue) {
    const replacer = function (key, value) {
        // Filtering out properties
        if (key === propertyName) {
            value = newValue;
        }
        return value;
    };
    return JSON.parse(JSON.stringify(object, replacer));
}

/**
 * @description
 * Returns an array with unique elements. Objects are not counted
 * @param {Array} arr Array to iterate through
 */
function arrayUnication(arr) {
    const res = [];

    arr.forEach(e => {
        if (res.indexOf(e) == -1) {
            res.push(e);
        }
    }
    );

    return res;
}

/**
 * @description
 * @param {Array} arr Array with objects to iterate through
 * @returns Returns an array of unique objects.
 */
function getArrayOfUniqueObjects(arr) {
    let res = [];
    if (arr && arr.length > 0) {
        res = [...new Set(arr.map(JSON.stringify))].map(JSON.parse);
    }
    return res;
}

function objectComparison(x, y) {

    // if both x and y are null or undefined and exactly the same
    if (x === y) {

        return true;
    }

    // if they are not strictly equal, they both need to be Objects
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }

    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.
    if (x.constructor !== y.constructor) {

        return false;
    }

    for (const p in x) {

        // other properties were tested using x.constructor === y.constructor
        if (!Object.prototype.hasOwnProperty.call(x, p)) {

            continue;
        }

        // allows to compare x[ p ] and y[ p ] when set to undefined
        if (!Object.prototype.hasOwnProperty.call(y, p)) {

            return false;
        }

        // if they have the same strict value or identity then they are equal
        if (x[p] === y[p]) {

            continue;
        }

        // Numbers, Strings, Functions, Booleans must be strictly equal
        if (typeof (x[p]) !== "object") {

            return false;
        }

        // Objects and Arrays must be tested recursively
        if (!this.objectComparison(x[p], y[p])) {

            return false;
        }
    }

    // allows x[ p ] to be set to undefined
    for (const p in y) {

        if (Object.prototype.hasOwnProperty.call(y, p) && !Object.prototype.hasOwnProperty.call(x, p)) {

            return false;
        }
    }

    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}

function stuffNewData(object) {
    object = this.deepCopy(object);
    let ret = {
        identical: false
    };
    if (typeof object === 'object') {
        ret = {};
        for (const key in object) {
            const data = this.stuffNewData(object[key]);
            ret[key] = data;
        }
    } else {
        ret.valueSecond = object;
        ret.valueFirst = undefined;
    }
    return ret;
}

function getObjectsWithChanges(objects) {
    const objectsWithChanges = [];
    objects.forEach(elem => {
        const changed = {
            value: false
        };
        if (this.getFlagIdentical(elem, changed)) { objectsWithChanges.push(elem); }
    });
    return objectsWithChanges;
}

function checkObjectWithChanges(object) {
    return !this.getFlagIdentical(object, {
        value: false
    });
}

function getFlagIdentical(elem, changed) {
    elem = this.deepCopy(elem);
    for (const key in elem) {
        if (typeof elem[key] === 'object') {
            this.getFlagIdentical(elem[key], changed);
        }
        if (key && key === 'identical' && !elem[key]) {
            changed.value = true;
        }
    }
    return changed.value;
}

/**
 * returns a deep copy of the object
 * @param {*} object object to copy
 * @returns copied object or undefined if there is no object to copy.
 */
function deepCopy(object) { return object ? JSON.parse(JSON.stringify(object)) : undefined; }

function deepCopyAttributes(obj1, obj2) {

    Object.keys(obj2).forEach(key => {
        if (key in obj1) {
            obj1[key] = obj2[key];
        }
    });

    for (const key in obj2) {
        if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
            obj1[key] = obj2[key];
        }
    }

    return obj1;
}

function clearObject(obj) {
    if (!obj) {
        return;
    }

    for (const property of Object.keys(obj)) {
        if (Array.isArray(obj[property])) {
            obj[property] = [];
        } else if (typeof obj[property] === 'object') {
            this.clearObject(obj[property]);
        } else {
            delete obj[property];
        }
    }
}

function clearArray(arr) {
    if (!arr || !arr.length) {
        return;
    }

    arr.splice(0, arr.length);
}

function checkObjectNotEmpty(obj) {
    let sumOfValues;
    if (Object.values(obj).length > 0) {
        sumOfValues = Object.values(obj).filter(t => t != undefined).reduce((acc, v) => acc + v, 0);
    }

    const res = !(Object.keys(obj).length === 0 && obj.constructor === Object);
    const sumCheck = !!(typeof (sumOfValues) === 'number' && sumOfValues > 0 || typeof (sumOfValues) === 'string' && sumOfValues != "");
    return res && sumCheck;
}

function checkObjectHasValues(obj) {

    if (obj === null || obj === undefined) {
        return false;
    }

    if (Object.values(obj)?.length > 0) {
        return Object.values(obj).filter(t => t !== undefined)?.length > 0;
    }

    return false;
}

/**
 * @description Compares types of two variables
 * @param {Any} val1 First variable
 * @param {Any} val2 Second variable
 * @returns {Boolean} Are types equal?
 */
function areEqualTypes(val1, val2) {
    return (this.isTypeOf(val1, Object) && this.isTypeOf(val2, Object)) ||
        (Array.isArray(val1) && Array.isArray(val2)) ||
        (typeof val1 === typeof val2);
}

/**
 * @description Compares property structure and values of two objects
 * @param {Object<Any>} firstObject First object
 * @param {Object<Any>} secondObject Second object
 * @returns {Boolean} Are properties and its values equal?
 */
function isEqual(firstObject, secondObject) {
    if (!this.isTypeOf(firstObject, Object) || !this.isTypeOf(secondObject, Object)) { return false; }

    const keys1 = Object.keys(firstObject);
    const keys2 = Object.keys(secondObject);

    if (keys1.length !== keys2.length) { return false; }

    const res = true;

    for (let i = 0; i < keys1.length; i++) {
        const key = keys1[i];
        let prop1 = firstObject[key];

        if (!Object.prototype.hasOwnProperty.call(secondObject, key)) { return false; }

        let prop2 = secondObject[key];

        if (!this.areEqualTypes(prop1, prop2)) { return false; }

        if (this.isTypeOf(prop1, Array) && this.isTypeOf(prop2, Array)) {
            prop1 = Object.assign({}, prop1);
            prop2 = Object.assign({}, prop2);
        }

        if (this.isTypeOf(prop1, Object) && this.isTypeOf(prop2, Object)) {
            const res = this.isEqual(prop1, prop2);
            if (res != true) { return false; }
        } else if (prop1 !== prop2) { return false; }
    }

    return res;
}

/**
 * @description Checks if provided value is instance of provided type parameter
 * @param {*} value Any value
 * @param {ObjectConstructor | ArrayConstructor | StringConstructor | DateConstructor} type Type constructor
 */
function isTypeOf(value, type) {
    return value !== null &&
        value !== undefined &&
        Object.getPrototypeOf(value) === type.prototype;
}

/**
 * Checks if object properties are empty
 * @param {Object} object Object to be checked
 */
function isEmpty(object) {
    const props = Object.keys(object);

    if (props.length === 0) { return true; }

    for (let i = 0; i < props.length; i++) {
        const value = object[props[i]];

        if (this.isTypeOf(value, Array)) {
            if (value.length > 0) { return false; }
        } else if (this.isTypeOf(value, Object)) {
            const res = this.isEmpty(value);
            if (res != true) { return false; }
        } else if (value !== undefined) { return false; }
    }

    return true;
}

/**
 * @description Removes data, leaving object structure
 * @param {Object} target Object to be truncated
 * @returns {Object} Truncated object. Passed `target` is truncated by reference
 */
function truncate(target) {
    if (!target) { return; }

    const props = Object.keys(target);

    if (props.length === 0) { return {}; }

    for (let i = 0; i < props.length; i++) {
        const prop = props[i];

        if (this.isTypeOf(target[prop], Array)) { target[prop] = []; }

        else if (this.isTypeOf(target[prop], Object)) {
            const res = this.truncate(target[prop]);
            target[prop] = res;
        } else { delete target[prop]; }
    }

    return target;
}

/**
 * @description Return undefined if object doesn't have value (null) or undefined, otherwise return boolean value.
 * @param {Object} input Input object.
 */
function convertToBoolean(input, defaultValue = false) {
    input = nullCheck(input);

    if (typeof input === 'string') { return input === 'true'; }
    if (typeof input === 'number') { return input != 0; }

    return !!input;
}

/**
 * @description Return undefined if object doesn't have value (null), otherwise return same object back.
 * @param {Object} input Input object.
 */
function nullCheck(input) {

    return input == null ? undefined : input;
}

/**
 * @description Groups array objects by key.
 * @param {Array} array Input array.
 * @param {Object} key Key to use for group by.
 */
function groupBy(array, key) {

    return array.reduce(function (groups, item) {

        groups = Array.isArray(groups) ? groups : [];
        let group = groups.find(g => g.key === item[key]);

        if (!group) {

            group = {};
            group.key = item[key];
            group.items = [];
            groups.push(group);
        }

        group.items.push(item);
        return groups;
    }, {});
}

/**
 * @description Groups array objects by multiple keys.
 */
function groupByMultipleKeys(array, keys) {

    const grouped = {};

    array.forEach((item) => {

        keys.reduce((result, key, i) => {

            result[item[key]] = result[item[key]] || (i + 1 === keys.length ? [] : {});
            return result[item[key]];
        },
        grouped).push(item);
    });

    return grouped;
}

function getPropertyName(obj, expression) {

    const result = {};
    Object.keys(obj).map(k => { result[k] = () => k; });
    return expression(result)();
}

function addPrefixForEachPropertyName(o, prefix) {
    return Object.keys(o).reduce(
        (acc, v) => {
            if (typeof o[v] == 'object') { acc[prefix + v] = addPrefixForEachPropertyName(o[v], prefix); }
            else { acc[prefix + v] = o[v]; }
            return acc;
        }, {});
}

function getTestResult() {
    const test = [
        {
            "name": "TestLifePrintoutResources/memoPFP.pdf",
            "mode": "Append"
        }
    ];

    return test;
}

module.exports = {
    getValue,
    setValue,
    replaceValue,
    arrayUnication,
    getArrayOfUniqueObjects,
    objectComparison,
    isObject,
    stuffNewData,
    getObjectsWithChanges,
    checkObjectWithChanges,
    getFlagIdentical,
    deepCopy,
    deepCopyAttributes,
    clearObject,
    clearArray,
    checkObjectNotEmpty,
    checkObjectHasValues,
    areEqualTypes,
    isEqual,
    isTypeOf,
    isEmpty,
    truncate,
    convertToBoolean,
    nullCheck,
    groupBy,
    getPropertyName,
    addPrefixForEachPropertyName,
    groupByMultipleKeys,
    getTestResult
};
