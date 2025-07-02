const dateUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { accCertificateIncomingSource } = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');

module.exports = function mapping(lineInput, sinkExchange) {

    const errors = validateFields(lineInput.data);

    if (errors && errors.length > 0) {

        throw new Error(errors.join(';'));
    }

    const body = {
        typeOfRequest: {
            code: "1"
        },
        accountingYear: {
            year: lineInput.data.accountingYear
        },
        contract: {
            type: {
                code: "life"
            },
            number: lineInput.data.policyNumber
        },
        taxPayerData: {
            isTaxPayerPolicyHolder: lineInput.data.isTaxPayerIsPolicyHolder
        },
        requestDate: lineInput.data.requestDate,
        correctionNumber: 0,
        issueData: {
            certificateIssueDate: lineInput.data.certificateIssueDate
        },
        insuredPersonData: {},
        paymentContract: {},
        technicalInformation: {},
        applicantFullName: lineInput.data.holderFullName,
        accountingCertificateEnrichments: {
            enrichFields: [
                "**/**"
            ]
        },
        accountingCertificateIncomeSource: accCertificateIncomingSource.Import
    };

    const result = {
        body: body,
        enrichFields: [
            "/accountingCertificateEnrichments"
        ]
    };

    return result;

};

function validateFields(data) {

    const validationErrors = [];

    if (!data.policyNumber) {

        validationErrors.push('Не заполнено значение НОМЕР ДОГОВОРА');
    }

    if (!data.holderFullName) {

        validationErrors.push('Не заполнено значение ФИО ЗАЯВИТЕЛЯ');
    }

    if (!data.requestDate) {

        validationErrors.push('Не заполнено значение ДАТА ОБРАЩЕНИЯ');
    }

    if (!data.accountingYear) {

        validationErrors.push('Не заполнено значение ОТЧЕТНЫЙ ГОД');
    }

    if (!data.correctionNumber) {

        validationErrors.push('Не заполнено значение НОМЕР КОРРЕКТИРОВКИ');
    }

    if (data.accountingYear && (data.accountingYear < 2015 || data.accountingYear > dateUtils.yearNow())) {

        validationErrors.push('Неверный формат отчетного года');
    }

    if (data.correctionNumber && data.correctionNumber != 0) {

        validationErrors.push('Запрещено создавать корректировки справок через загрузчик. Создайте ненулевую корректировку через интерфейс');
    }

    return validationErrors;
}
