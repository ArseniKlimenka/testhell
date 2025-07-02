'use strict';

const { Exception } = require("handlebars");
const { getValue } = require("@config-rgsl/infrastructure/lib/ObjectUtils");
const { paymentFrequency } = require("@config-rgsl/infrastructure/lib/lifeInsuranceConstants");

module.exports = function applyData(input) {

    const body = this.businessContext.rootData;
    const issueDate = getValue(body, 'basicConditions.issueDate');
    const productCode = getValue(body, 'mainInsuranceConditions.insuranceProduct.productCode');

    const productConf = body?.productConfiguration;
    if (!productConf) {
        throw new Exception("E: Указанный продукт закрыт для продажи пользователю.");
    }

    let isWrongPaymentFrequencyDescription = true;
    const paymentFrequencyCode = getValue(body, 'basicConditions.paymentFrequency.paymentFrequencyCode');
    const paymentFrequencyDescription = getValue(body, 'basicConditions.paymentFrequency.paymentFrequencyDescription');
    for (const key in paymentFrequency) {
        if (paymentFrequency[key].description == paymentFrequencyDescription && paymentFrequency[key].code == paymentFrequencyCode) {
            isWrongPaymentFrequencyDescription = false;
        }
    }

    const availablePaymentFrequency = productConf.paymentFrequency;
    if (!availablePaymentFrequency.find(x => x == paymentFrequencyCode) || isWrongPaymentFrequencyDescription) {
        throw new Exception("E: Для данного продукта указана некорректная периодичность оплаты.");
    }

    const isAdmin = this.applicationContext.originatingUser.applicationRoles.some(x => x == "Administrator");
    if (isAdmin) {
        return;
    }

    const productGroupCreating = getValue(body, "mainInsuranceConditions.insuranceProduct.productGroup");
    const productGroupService = getValue(this, "businessContext.configurationDimensions.productGroup");
    if (productGroupCreating != productGroupService) {
        throw new Exception("E: Тип продукта не соответствует вызываемому сервису!");
    }

    const policyStartDate = getValue(body, 'policyTerms.startDate');
    if (issueDate && policyStartDate && productCode) {
        const activeTo = productConf.activeTo;
        if (policyStartDate > activeTo) {
            throw new Exception("E: Указанный продукт закрыт для продажи пользователю.");
        }
    }

    const beneficiaries = getValue(body, "beneficiaries.beneficiaries", []);
    if (beneficiaries.length > 0) {
        const uniqueBeneficiaries = new Set(beneficiaries.map(x => x.beneficiaryId));
        if (uniqueBeneficiaries.size != beneficiaries.length) {
            throw new Exception("E: В списке выгодоприобретателей есть записи с одинаковым id!");
        }
    }

    const issueFormCode = getValue(body, "issueForm.code.issueFormCode");
    const insuredPersonCode = getValue(body, "insuredPerson.partyData.partyCode");
    const policyHolderCode = getValue(body, "policyHolder.partyData.partyCode");
    if (issueFormCode == "ePolicy" && insuredPersonCode != policyHolderCode) {
        throw new Exception("E: при электронной форме выпуска Страхователь должен быть равен Застрахованному лицу.");
    }
};
