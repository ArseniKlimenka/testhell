'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

function basicFilterByColumnName(input, columnName) {

    let filterResult = false;

    const filterValue = input.filterObj[columnName]?.toLowerCase();
    const dataAttribute = input.data[columnName];

    if (!filterValue || !dataAttribute) {

        filterResult = true;

    } else if (typeof dataAttribute == 'object') {

        Object.keys(dataAttribute).forEach(key => {

            if (typeof dataAttribute[key] != 'object') {

                if (dataAttribute[key]?.toString()?.toLowerCase().includes(filterValue)) {
                    filterResult = true;
                }
            }
        });

    } else if (DateTimeUtils.isDateValid(dataAttribute)) {

        const date = DateTimeUtils.formatDate(dataAttribute, DateTimeUtils.DateFormats.CALENDAR);

        if (date?.toString()?.toLowerCase().includes(filterValue)) {

            filterResult = true;
        }

    } else if (dataAttribute?.toString()?.toLowerCase().includes(filterValue)) {

        filterResult = true;
    }

    return filterResult;
}

module.exports = {
    basicFilterByColumnName
};
