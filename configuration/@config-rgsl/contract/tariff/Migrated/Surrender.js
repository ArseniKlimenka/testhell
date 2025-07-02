'use strict';

module.exports = function surrender(input) {

    // just provide values from UI
    const surrenderValues = input.attributes.surrenderValues;

    return {
        table: surrenderValues.map((item, idx) => {
            return {
                year: idx + 1,
                surrenderValue: item.surrenderValue || 0,
                paidUpValue: item.periodSurrenderValue || 0,
                surrenderRate: 0,
                paidUpRate: 0
            };
        })
    };

};
