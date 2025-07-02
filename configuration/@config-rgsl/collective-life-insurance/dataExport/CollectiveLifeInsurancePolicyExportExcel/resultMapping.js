'use strict';

module.exports = function resultMapping(input) {

    const result = [];
    input.data.forEach(x => {

        const insured = {
            fullName: getValue(x.resultData.fullName),
            birthDay: getDateValue(x.resultData.birthDay),
            gender: getValue(x.resultData.gender),
            mobile: getValue(x.resultData.mobile),
            amount: getDecimalValue(x.resultData.amount),
            premium: getDecimalValue(x.resultData.premium)
        };

        result.push(insured);
    });

    return result;
};

function getValue(input) {

    return !input ? '' : input.toString();
}

function getDateValue(input) {

    if (!input) { return ''; }

    const date = new Date(input);

    let dd = date.getDate();
    if (dd < 10) { dd = '0' + dd; }

    let mm = date.getMonth() + 1;
    if (mm < 10) { mm = '0' + mm; }

    const yyyy = date.getFullYear();

    return dd + '.' + mm + '.' + yyyy;
}

function getDecimalValue(input) {

    return !input ? 0 : input;
}
