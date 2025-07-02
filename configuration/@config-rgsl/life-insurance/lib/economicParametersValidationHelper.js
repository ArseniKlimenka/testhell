'use strict';

const { excludeNonMappingAttributes, excludePolicyIssueDateAttributes, excludeSubObjectsAttributes } = require('@config-rgsl/life-insurance/lib/economicParametersHelper');

/**
 * @errorCode {errorCode} InsuranceRules
 * @errorCode {errorCode} DuplicateRules
 * @errorCode {errorCode} IntersectPeriods
 */

function validateMainDocumentData(input, that, validationErrors, excludeKeys) {

    validateMainAttributes(input, that, validationErrors, excludeKeys);
}

function validateMainAttributes(input, that, validationErrors, excludeKeys) {

    const economicParameters = input.economicParameters ?? [];

    for (let i = 0; i < economicParameters.length; i++) {

        const insuranceTermFromYearCode = economicParameters[i]?.insuranceTermFrom?.insuranceTermsYearCode;
        const insuranceTermToYearCode = economicParameters[i]?.insuranceTermTo?.insuranceTermsYearCode;

        if (+insuranceTermFromYearCode > +insuranceTermToYearCode) {

            validationErrors.push({
                errorCode: 'InsuranceRules',
                errorDataPath: `/economicParameters/${i}`,
                errorMessage: `E: Срок страхования с ${insuranceTermFromYearCode} должен быть меньше или равен сроку страхования по ${insuranceTermToYearCode}`,
                reference: {
                    insuranceTermFromYearCode: insuranceTermFromYearCode,
                    insuranceTermToYearCode: insuranceTermToYearCode
                }
            });
        }
    }

    const epDuplicates = findDuplicates(economicParameters, excludeNonMappingAttributes, excludeSubObjectsAttributes);

    for (let i = 0; i < epDuplicates.length; i++) {

        const epDuplicatesRuleNumbers = epDuplicates[i]?.ruleNumbers?.join(" и ");
        const duplicateIndex = economicParameters.findIndex(ep => ep.ruleNum == epDuplicates[i].ruleNumbers[1]);

        validationErrors.push({
            errorCode: 'DuplicateRules',
            errorDataPath: `/economicParameters/${duplicateIndex}`,
            errorMessage: `E: Строки с ID ${epDuplicatesRuleNumbers} дублируют друг друга`,
            reference: {
                epDuplicatesRuleNumbers: epDuplicatesRuleNumbers
            }
        });
    }

    const epDuplicatesWithoutPolicyIssueDate = findDuplicates(economicParameters, [...excludeNonMappingAttributes, ...excludePolicyIssueDateAttributes], excludeSubObjectsAttributes);

    for (let i = 0; i < epDuplicatesWithoutPolicyIssueDate.length; i++) {

        const intersectingRules = findIntersectingRules(epDuplicatesWithoutPolicyIssueDate[i]?.duplicates);
        const intersectingRulesNumbers = intersectingRules.join(" и ");
        const duplicateIndex = economicParameters.findIndex(ep => ep.ruleNum == epDuplicatesWithoutPolicyIssueDate[i].ruleNumbers[1]);

        if (intersectingRules?.length > 0) {

            validationErrors.push({
                errorCode: 'IntersectPeriods',
                errorDataPath: `/economicParameters/${duplicateIndex}`,
                errorMessage: `E: Строки с ID ${intersectingRulesNumbers} имеют пересечение периодов`,
                reference: {
                    intersectingRulesNumbers: intersectingRulesNumbers
                }
            });
        }
    }
}

function findDuplicates(arr, excludeKeys = [], excludeSubKeys = {}) {

    const areObjectsEqual = (obj1, obj2, excludeKeys) => {

        const compareValues = (objectKey, value1, value2) => {

            if (Array.isArray(value1) && Array.isArray(value2)) {
                if (value1.length !== value2.length) { return false; }
                return value1.every((item, index) => compareValues(index, item, value2[index]));
            }

            if (typeof value1 === 'object' && typeof value2 === 'object' && value1 !== null && value2 !== null) {

                let keys1 = Object.keys(value1).filter(key => !excludeKeys.includes(key));
                let keys2 = Object.keys(value2).filter(key => !excludeKeys.includes(key));

                if (Object.keys(excludeSubKeys).includes(objectKey)) {

                    keys1 = Object.keys(value2).filter(key => !excludeSubKeys[objectKey].includes(key));
                    keys2 = Object.keys(value2).filter(key => !excludeSubKeys[objectKey].includes(key));
                }

                if (keys1.length !== keys2.length) { return false; }

                return keys1.every(key =>
                    Object.prototype.hasOwnProperty.call(value2, key) && compareValues(key, value1[key], value2[key])
                );
            }

            return value1 === value2;
        };

        const keys = [...new Set([...Object.keys(obj1).filter(key => !excludeKeys.includes(key)), ...Object.keys(obj2).filter(key => !excludeKeys.includes(key))])];

        return keys.every(key =>
            Object.prototype.hasOwnProperty.call(obj1, key) && Object.prototype.hasOwnProperty.call(obj2, key) && compareValues(key, obj1[key], obj2[key])
        );
    };

    const duplicates = [];

    arr.forEach((currentObj, currentIndex) => {

        const matches = arr.slice(0, currentIndex).filter(prevObj =>
            areObjectsEqual(currentObj, prevObj, excludeKeys)
        );


        if (matches.length > 0) {

            const uniqueDuplicates = [...new Set([...matches, currentObj])];

            duplicates.push({
                original: matches[0],
                duplicates: uniqueDuplicates,
                ruleNumbers: uniqueDuplicates.map(i => i.ruleNum),
            });
        }
    });

    return duplicates;
}

function findIntersectingRules(objects) {

    const doPeriodsOverlap = (obj1, obj2) => {
        return new Date(obj1.policyIssueDateStart) <= new Date(obj2.policyIssueDateEnd) &&
               new Date(obj2.policyIssueDateStart) <= new Date(obj1.policyIssueDateEnd);
    };

    const overlaps = [];
    for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
            if (doPeriodsOverlap(objects[i], objects[j])) {
                overlaps.push([objects[i].ruleNum, objects[j].ruleNum]);
            }
        }
    }

    const result = [...new Set(overlaps.flat())];

    return result;
}

module.exports = {
    validateMainDocumentData
};
