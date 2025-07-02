const roundingUtils = require('@config-system/infrastructure/lib/RoundingUtils');
const objectUtils = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    clearArray: function (arr) {
        if (!arr) {
            return;
        }

        arr.splice(0, arr.length);
    },

    groupBy: function (list, keyGetter) {
        return list.reduce((groupBy, record) => {
            const key = keyGetter(record);
            let group = groupBy.get(key);
            if (!group) {
                group = [];
                groupBy.set(key, group);
            }
            group.push(record);
            return groupBy;
        }, new Map());
    },

    /**
     * @description
     * reduceGroupBy
     * @param  {array} x Array of objects
     * @param  {array} groupBy Names of the keys to group by
     * @param  {array} propName Name of the groupped properties Array
     * @param  {function} fun Reduce function
     * @returns {array} Array of objects - with value and keys
     */
    reduceGroupBy: function (x, groupBy, propName = '_', fun, initialValue) {
        if (typeof groupBy === "string") {
            groupBy = [groupBy];
        }
        const groups = x.reduce((obj, item) => {
            const key = groupBy.map(x => item[x]).join();
            if (obj[key]) {
                obj[key][propName].push(item);
            } else {
                obj[key] = {};
                groupBy.forEach(function (k) {
                    obj[key][k] = item[k];
                });
                obj[key][propName] = [item];
            }
            return obj;
        }, {});
        const res = Object.keys(groups).map(x => (groups[x]));
        if (fun) {
            res.forEach(function (x) {
                Object.assign(x, x[propName].reduce(fun, initialValue));
            });
        }
        return res;
    },

    /**
     * @description
     * Compare the object by parameter names
     * @param  {array} properties Array of parameters
     */
    compareByObjectProperties: function (properties) {
        return function (a, b) {
            for (const property of properties) {
                if (a[property] < b[property]) { return -1; }
                else if (a[property] > b[property]) { return 1; }
            }

            return 0;
        };
    },

    /**
     * @description
     * Distribute the amount by provided proportions
     * @param  {array<number>} proportions Array of proportions
     * @param {number} amountToDistribute amount to distribute
     */
    getDistribution: function (proportions, amountToDistribute) {

        amountToDistribute = round(amountToDistribute, 2);

        if (proportions.length === 0 && amountToDistribute !== 0) {
            throw 'Empty proportion array!';
        }

        let totalProportionAmountPos = proportions.filter(p => p > 0).reduce((acc, curr) => round(acc + curr, 2), 0);
        let totalProportionAmountNeg = proportions.filter(p => p < 0).reduce((acc, curr) => round(acc + curr, 2), 0);

        const payAmounts = new Array(proportions.length).fill(0);

        if (amountToDistribute === 0) {
            return payAmounts;
        }

        if (totalProportionAmountPos === 0 && totalProportionAmountNeg === 0) {
            for (let i = 0; i < proportions.length; i++) {
                proportions[i] = 1;
            }
            if (amountToDistribute > 0) {
                totalProportionAmountPos = proportions.length;
            }
            if (amountToDistribute < 0) {
                totalProportionAmountNeg = proportions.length;
            }
        }

        for (let i = 0; i < payAmounts.length; i++) {
            const proportion = proportions[i];
            const multiplier = proportion / (totalProportionAmountPos + totalProportionAmountNeg);
            let payAmount = round(amountToDistribute * multiplier, 2);

            if (proportion !== 0 && payAmount === 0) {
                payAmount = round(0.01 * Math.sign(proportion), 2);
            }

            payAmounts[i] = payAmount;
        }

        const totalPayAmountResult = payAmounts.reduce((acc, curr) => round(acc + curr, 2), 0);
        let payDiff = amountToDistribute - totalPayAmountResult;

        let cycleCount = 0;
        while (payDiff !== 0) {
            let maxValueIndex = -1;
            let maxValue = Number.MIN_VALUE;
            for (let i = 0; i < payAmounts.length; i++) {
                const value = Math.abs(payAmounts[i]);
                if (value > maxValue) {
                    maxValue = value;
                    maxValueIndex = i;
                }
            }

            const corrector = round(0.01 * Math.sign(payDiff), 2);
            payAmounts[maxValueIndex] = round(payAmounts[maxValueIndex] + corrector, 2);
            payDiff = round(payDiff - corrector, 2);

            if (++cycleCount > 100) {
                throw 'Maximum cycle count reached!';
            }
        }

        return payAmounts;
    },

    /**
     * @description
     * Checks if provided input is array of strings
     * @param {any} input
     */
    isStringArray: function (input) {
        return Boolean(input !== undefined
            && Array.isArray(input)
            && input.length > 0
            && !input.some(el => typeof (el) !== 'string'));
    },

    checkHasItemInArrayByKey: function (arr, key, value) {
        return arr ? arr.some(inp => [value].includes(inp[key])) : false;
    },

    getLastArrayItem: function (arr) {
        return arr[arr.length - 1];
    },

    getFirstArrayItem: function (arr) {
        return arr[0];
    },

    /**
   * transposeArray
   * Returns transposed array of arrays
   *
   * @param {number} a Array of arrays
   */
    transposeArray: function (a) {
        return a[0].map(function (_, colIndex) {
            return a.map(function (r) { return r[colIndex]; });
        });
    },


    /**
   * Randomize items in the array
   * Returns same array with shuffled items
   *
   * @param {Array} array An array
   */
    shuffle: function (array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    },

    /**
     * @description Returns elements of array1 that are not included to array2
     * @param {Array} array1
     * @param {Array} array2
     * @returns {Array} result array with diference
     */
    getArraysDifference: function (array1, array2) {
        if (!array1 || !array2) { return; }

        const array2Ids = array2.map(t => t.id);
        // exclude from array 1 elements that are not in array 2

        if (array2Ids && array2Ids.length > 0) { array1 = array1.filter(t => !array2Ids.includes(t.id)); }

        return array1;
    },

    /**
     * @description Flattens nested array, e.g. [1, [2,3], [4]] => [1, 2, 3, 4]
     * @param {Array} arr
     * @returns {Array} result flattened array
     */
    flattenArray: function (arr) {
        return arr.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? this.flattenArray(toFlatten) : toFlatten);
        }, []);
    },

    /**
    * @description Removes duplicates from an array, e.g. [1, 1, 2, 3, 4, 4] => [1, 2, 3, 4]
    * @param {Array} arr
    * @returns {Array} result flattened array
    */
    distinct: function (arr) {
        return Array.from(new Set(arr));
    },

    /**
    * @description Removes duplicates from an array of objects by several properties
    * e.g. [{ a: 1, b: 2}, { a: 1, b: 2}, { a: 3, b: 4}] => [{ a: 1, b: 2}, { a: 3, b: 4}]
    * @param {Array} arr
    * @returns {Array} result flattened array
    */
    distinctBy: function (arr, properties) {
        const result = [];

        for (const group of this.groupBy(arr, item => (properties.map(x => item[x]).join())).values()) {
            if (group.length) {
                result.push(group[0]);
            }
        }

        return result;
    },

    /**
    * @description Removes duplicates from an array, e.g. [1, 1, 2, 3, 4, 4] => [1, 2, 3, 4]
    * @param {string} key to sort array by
    * @param {string}  order of the results desc, asc
    * @returns {Array} result flattened array
    */
    sortArray: function (key, order = 'asc') {
        return function innerSort(a, b) {
            if (!Object.prototype.hasOwnProperty.call(a, key) || !Object.prototype.hasOwnProperty.call(b, key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    },

    isEqualArrays: function (firstArray, secondArray) {
        if (!objectUtils.isTypeOf(firstArray, Array) || !objectUtils.isTypeOf(secondArray, Array)) {
            return false;
        }

        if (firstArray.length !== secondArray.length) {
            return false;
        }

        return objectUtils.isEqual(
            Object.assign({}, firstArray),
            Object.assign({}, secondArray)
        );
    },

    /**
     * @description
     * Checks that some elements two arrays is equals
     * @param {Array} arr1
     * @param {Array} arr2
     * @example
     * let arr1 = [1, 3];
     * let arr2 = [2, 3];
     * checkAvailabilitySome(arr1, arr2) //returns true
     * let arr1 = [1, 3];
     * let arr2 = [2, 4];
     * checkAvailabilitySome(arr1, arr2) //returns false
     * @returns {Boolean} Result or, if prop doesn't exist - undefined
     */
    checkAvailabilitySome: function (arr1, arr2) {
        if (!arr1 || !arr2) { return undefined; }

        return arr1.some(e => arr2.some(function (v) { return e === v; }));
    },

    /**
     * @description
     * Return first item from two arrays if items are equal
     * @param {Array} arr1
     * @param {Array} arr2
     * @example
     * let arr1 = [1, 3];
     * let arr2 = [2, 3];
     * getFirstEqualItemFromArrays(arr1, arr2) //return 3
     * let arr1 = [1, 3];
     * let arr2 = [2, 4];
     * getFirstEqualItemFromArrays(arr1, arr2) //returns undefined
     * @returns First item if equal items are found or undefined if no equal items are found
     */
    getFirstEqualItemFromArrays: function (arr1, arr2) {

        for (let i = 0; i < arr1.length; i++) {
            if (arr2.includes(arr1[i])) {
                return arr1[i];
            }
        }

        return undefined;
    },

    /**
     * @description Groups objects from source by composite key
     * @param {array} source array to group
     * @param  {...function} keySelectors selectors of keys
     * @returns array contains groups (the group is array) of object
     * @example to find an example check out tests there:
     * \configuration\@config-raiff-life\CommonItems\test\lib\array-utils.js
     */
    groupByCompositeKey: function (source, ...keySelectors) {
        let result = [source];
        for (const keySelector of keySelectors) {
            const acc = [];
            for (const array of result) {
                for (const [, group] of this.groupBy(array, keySelector)) {
                    acc.push(group);
                }
            }
            result = acc;
        }
        return result;
    },

    /**
     * @description Checking for the complete occurrence of all elements of one array in another
     * @param {array} arr1 where find items
     * @param {array} arr2 what items need to find
     * @returns {boolean} are all elements of an array included in another
     * @example
     * let arr1 = [1, 2];
     * let arr2 = [2, 1];
     * checkFullContains(arr1, arr2) //returns true
     * let arr1 = [1, 3];
     * let arr2 = [1, 2];
     * checkFullContains(arr1, arr2) //returns false
     */
    checkFullContains: function (arr1, arr2) {
        for (let i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) { return false; }
        }
        return true;
    },

    /**
    * @description Removes duplicates from an array of objects
    * e.g. [{ a: 1, b: 2}, { a: 1, b: 2}, { a: 3, b: 4}] => [{ a: 1, b: 2}, { a: 3, b: 4}]
    * @param {Array} arr
    * @returns {Array} result array without duplicates
    */
    getArrayOfUniqueObjects: function (arr) {

        if (!arr || !arr[0]) {
            return [];
        }

        const allKeys = [...new Set(arr.flatMap(Object.keys))];

        const kvArray = arr.map(entry => {
            const key = allKeys.map(k => entry[k]).join("|");
            return [key, entry];
        });

        return Array.from(new Map(kvArray).values());
    }

};

function round(value, decimals = 2) {

    const result = roundingUtils.round(value, decimals);

    return result ? result : 0;
}
