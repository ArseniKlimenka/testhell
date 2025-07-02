'use strict';

const { nullCheck } = require('@config-rgsl/infrastructure/lib/ObjectUtils');
const creditImportHelper = require('@config-rgsl/credit-life-insurance/lib/creditImportHelper');

module.exports = function resultMapping(input) {

    // called from route, but we need to provire RU translations
    this.applicationContext.locale = "ru-RU";

    const mapped = {
        lineNumber: input.lineNumber,
        regionName: input.regionName,
        creditDate: creditImportHelper.parseDate(input.creditDate),
        creditContractId: input.creditContractId,
        creditSum: creditImportHelper.creditSumCheck(input.creditSum),
        creditRate: creditImportHelper.creditRateCheck(input.creditRate),
        annuityPaymentSum: creditImportHelper.annuityPaymentCheck(input.annuityPaymentSum, input.creditSum),
        salesPointName: input.salesPointName,
        lastName: input.lastName,
        firstName: input.firstName,
        middleName: nullCheck(input.middleName),
        personGender: creditImportHelper.genderCheck(input.personGender, input.middleName),
        dateOfBirth: creditImportHelper.dateOfBirthCheck(creditImportHelper.parseDate(input.dateOfBirth), creditImportHelper.parseDate(input.creditDate)),
        birthPlace: input.birthPlace,
        mobilePhoneNumber: creditImportHelper.mobilePhoneNumberCheck(nullCheck(input.mobilePhoneNumber)),
        email: nullCheck(input.email),
        docSeries: input.docSeries,
        docNumber: input.docNumber,
        issuerName: input.issuerName,
        issuerCode: input.issuerCode,
        docIssueDate: creditImportHelper.parseDate(input.docIssueDate),
        citizenship: input.citizenship,
        rCity: nullCheck(input.rCity),
        rStreet: nullCheck(input.rStreet),
        rHouse: nullCheck(input.rHouse),
        rFlat: nullCheck(input.rFlat),
        rPostCode: nullCheck(input.rPostCode),
        fCity: nullCheck(input.fCity),
        fStreet: nullCheck(input.fStreet),
        fHouse: nullCheck(input.fHouse),
        fFlat: nullCheck(input.fFlat),
        fPostCode: nullCheck(input.fPostCode),
        inn: nullCheck(input.inn),
        snils: nullCheck(input.snils),
        policySeries: input.policySeries,
        policyNumber: input.policyNumber,
        issueDate: creditImportHelper.parseDate(input.issueDate),
        productName: input.productName,
        riskPremiumLife: +nullCheck(input.riskPremiumLife),
        commissionPercent: +input.commissionPercent,
        commissionSum: +input.commissionSum,
        startDate: creditImportHelper.parseDate(input.startDate),
        endDate: creditImportHelper.parseDate(nullCheck(input.endDate)),
        // creditProgramId: creditImportHelper.creditProgramCheck(nullCheck(input.creditProgramId)),
        creditProgramId: input.creditProgramId,
        riskPremiumDMS1: +nullCheck(input.riskPremiumDMS1),
        riskPremiumDMS2: +nullCheck(input.riskPremiumDMS2),
        insuredSumDMS1: +nullCheck(input.insuredSumDMS1),
        insuredSumDMS2: +nullCheck(input.insuredSumDMS2),
        externalContractId: input.externalContractId,
        sellerName: input.sellerName,
        sellerEmail: input.sellerEmail,
        rCountry: input.rCountry,
        fCountry: input.fCountry,
        creditContractNumber: nullCheck(input.creditContractNumber),
        creditEndDate:  creditImportHelper.parseDate(input.creditEndDate)
    };

    return {
        data: mapped,
        $recordKey: `${input.lineNumber}`
    };

};
