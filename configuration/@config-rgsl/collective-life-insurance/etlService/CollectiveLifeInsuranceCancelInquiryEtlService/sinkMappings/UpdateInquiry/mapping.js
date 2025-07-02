"use strict";

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input) {

    const body = input.body;
    body.inquiry.textOfComment = 'Автоматическая отмена при возврате договора в Проект';

    const result = {
        body,
        number: input.inquiryNumber
    };

    return result;
};
