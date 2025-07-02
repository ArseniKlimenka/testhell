const dateHelper = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function resultMapping(input) {
    return {
        name: input.NAME,
        login: input.LOGIN,
        lastLogin: lastLoginCheck(input.LAST_LOGIN),
        unit: input.UNIT,
        partner: input.PARTNER,
        role: roleCheck(input.ROLE),
        tabNumber: tabNumberCheck(input.TAB_NUMBER),
        unitCode: unitCodeCheck(input.UNIT_CODE)
    };
};

function lastLoginCheck(date) {
    let result;

    if (date == undefined) {
        result = 'Не авторизировался';
    } else {
        result = dateHelper.formatDate(date, dateHelper.DateFormats.CALENDAR);
    }

    return result;
}

function tabNumberCheck(tabNumber) {
    let result;

    if (tabNumber == undefined) {
        result = 'Не указан';
    } else {
        result = tabNumber;
    }

    return result;
}

function roleCheck(role) {
    let result;

    if (role == undefined) {
        result = 'Отсутствует';
    } else {
        result = role;
    }

    return result;
}

function unitCodeCheck(unitCode) {
    let result;

    if (unitCode == undefined) {
        result = 'Не указан';
    } else {
        result = unitCode;
    }

    return result;
}
