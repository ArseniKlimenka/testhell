'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function commRulesSortingAction(input) {

    const direction = input.direction;
    const sortFieldName = input.sortFieldName;
    const data = input.data;

    const sortedData = data.sort((first, second) => {

        let firstValueToCompare = undefined;
        let secondValueToCompare = undefined;

        const firstArray = getValue(first, `${sortFieldName}.values`, []);
        const secondArray = getValue(second, `${sortFieldName}.values`, []);

        if (firstArray.length > 0) {

            firstValueToCompare = firstArray[0].description;
        }

        if (secondArray.length > 0) {

            secondValueToCompare = secondArray[0].description;
        }

        if (!firstValueToCompare && !secondValueToCompare) {

            const indexOfFrom = sortFieldName.indexOf('From');
            const indexOfTo = sortFieldName.indexOf('To');

            if (indexOfFrom > -1) {

                firstValueToCompare = getValue(first, `${sortFieldName.substring(0, indexOfFrom)}.value.from`);
                secondValueToCompare = getValue(second, `${sortFieldName.substring(0, indexOfFrom)}.value.from`);
            }
            else if (indexOfTo > -1) {

                firstValueToCompare = getValue(first, `${sortFieldName.substring(0, indexOfTo)}.value.to`);
                secondValueToCompare = getValue(second, `${sortFieldName.substring(0, indexOfTo)}.value.to`);
            }
        }

        if (!firstValueToCompare && !secondValueToCompare) {

            firstValueToCompare = getValue(first, `${sortFieldName}.value`);
            secondValueToCompare = getValue(second, `${sortFieldName}.value`);
        }

        if (!firstValueToCompare && !secondValueToCompare) {

            firstValueToCompare = first[sortFieldName];
            secondValueToCompare = second[sortFieldName];
        }

        if (!firstValueToCompare && secondValueToCompare) {

            return 1;
        }

        if (!secondValueToCompare && firstValueToCompare) {

            return -1;
        }

        if (firstValueToCompare < secondValueToCompare) {

            if (direction === 'desc') {

                return -1;
            }


            return 1;


        }

        if (firstValueToCompare > secondValueToCompare) {

            if (direction === 'desc') {

                return 1;
            }


            return -1;

        }

        return 0;
    });

    return sortedData;
};
