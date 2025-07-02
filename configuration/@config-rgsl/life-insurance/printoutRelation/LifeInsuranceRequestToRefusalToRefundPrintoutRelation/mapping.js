'use strict';

const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const formatHelper = require('@config-rgsl/infrastructure/lib/FormatUtils');

module.exports = function mapping(input) {

    const policyHolderFullName = input.body.holder.fullName;
    const policyHolderPartyCode = input.body.holder.partyCode;
    const policyHolderFullNameArr = input.body.holder.fullName.split(' ');
    const policyHolderNamePatronymic = policyHolderFullNameArr[1] + ' ' + policyHolderFullNameArr[2];
    const requestIssueDate = formatHelper.formatDateTimeToString(input.body.issueDate);
    const contractIssueDate = formatHelper.formatDateTimeToString(input.body.contract.issueDate);
    const contractNumber = input.body.contract.number;
    const informationLetterNumber = input.body.informationLetterNumber;
    const insurerInfo = printoutsConstant.insurerInfo;

    const topLeftContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'top-left' + '{' +
        'content: url("CommonImageContainer/img/logoHeader.png");' +
        'transform: scale(.3);' +
        '}' +
        '}' +
        '</style>';

    const topRightContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'top-right' + '{' +
        'content: url("CommonImageContainer/img/eagleHeader.png");' +
        'transform: scale(.45);' +
        'margin-top: 40px;' +
        'margin-left: 390px;' +
        '}' +
        '}' +
        '</style>';

    const bottomLeftContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'bottom-left' + '{' +
        'margin-bottom: 80px;' +
        'margin-left: 40px;' +
        'color: gray;' +
        'font-size: 9pt;' +
        'white-space: pre-line;' +
        'content: "ООО СК «Росгосстрах Жизнь»\\A 119991, г. Москва-59, ул. Киевская, д. 7, к. 1.\\A Лицензия Банка России от 25.03.2021 г.: СЖ № 3879, СЛ № 3879\\A ИНН 7743504307. ОГРН 1037739821514";' +
        '}' +
        '}' +
        '</style>';

    const bottomRightContent =
        '<style>' +
        '@' + 'page' + '{' +
        '@' + 'bottom-right' + '{' +
        'margin-bottom: 60px;' +
        'margin-right: 40px;' +
        'color: IndianRed;' +
        'font-size: 12pt;' +
        'white-space: pre-line;' +
        'content: "RGSL.RU\\A 8-800-100-12-10";' +
        '}' +
        '}' +
        '</style>';

    return {
        policyHolderFullName,
        policyHolderPartyCode,
        policyHolderNamePatronymic,
        requestIssueDate,
        contractIssueDate,
        contractNumber,
        insurerInfo,
        informationLetterNumber,
        topLeftContent,
        topRightContent,
        bottomLeftContent,
        bottomRightContent
    };
};
