const printoutsHelper = require("@config-rgsl/life-insurance/lib/printoutsHelper");
const printoutsConstant = require("@config-rgsl/life-insurance/lib/printoutsConstant");
const dateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping(input) {

    const numricConstants = {
        docLength: 12,
        nameLength: 36,
        insurerName: 160,
        INNLength: 10,
        KPPLength: 9,
        dayLength: 2,
        monthLength: 2,
        yearLength: 4,
        fullName: 60,
        amountPaid: 16,
        amountPaidDecimal: 2,
        contractNumberLength: 34,
        oneLetterLength: 1,
        seqNumberLength: 3,
        documentCodeLength: 2,
        docSeriesNumberLength: 20,
        zeroValue: 0,
        dashValue: '-',
        KNDCodeDisplayStartYear: 2024
    };

    let originalDocumentNumber = this.businessContext.originalDocumentNumber;
    originalDocumentNumber = originalDocumentNumber?.substring(originalDocumentNumber.lastIndexOf('-') + 1);
    const originalDocumentNumberTable = printoutsHelper.pushLetterTable(originalDocumentNumber, numricConstants.docLength);
    const seqNumber = this.businessContext.sequenceNumber;
    const seqNumberTable = printoutsHelper.pushLetterTable(seqNumber?.toString(), numricConstants.seqNumberLength, numricConstants.dashValue);
    const accountingYear = input.body.accountingYear.year;
    const accountingYearTable = printoutsHelper.pushLetterTable(accountingYear, numricConstants.yearLength);
    const isKNDCodeDisplayed = parseInt(accountingYear) >= numricConstants.KNDCodeDisplayStartYear;

    const taxPayerData = input.body.taxPayerData;
    taxPayerData.lastNameTable = printoutsHelper.pushLetterTable(taxPayerData.lastName, numricConstants.nameLength);
    taxPayerData.firstNameTable = printoutsHelper.pushLetterTable(taxPayerData.firstName, numricConstants.nameLength);
    taxPayerData.middleNameTable = printoutsHelper.pushLetterTable(taxPayerData.middleName, numricConstants.nameLength);
    taxPayerData.INNKIOTable = printoutsHelper.pushLetterTable(taxPayerData.INNKIO, numricConstants.docLength);
    const payerDateOfBirth = taxPayerData.dateOfBirth ? dateTimeUtils.getDay(taxPayerData.dateOfBirth)?.toString() : '';
    taxPayerData.dateOfBirthTable = printoutsHelper.unshiftLetterTable(payerDateOfBirth, numricConstants.dayLength, numricConstants.zeroValue);
    const payerMonthOfBirth = taxPayerData.dateOfBirth ? dateTimeUtils.getMonth(taxPayerData.dateOfBirth)?.toString() : '';
    taxPayerData.monthOfBirthTable = printoutsHelper.unshiftLetterTable(payerMonthOfBirth, numricConstants.monthLength, numricConstants.zeroValue);
    const payerYearOfBirth = taxPayerData.dateOfBirth ? dateTimeUtils.getYear(taxPayerData.dateOfBirth)?.toString() : '';
    taxPayerData.yearOfBirthTable = printoutsHelper.unshiftLetterTable(payerYearOfBirth, numricConstants.yearLength, numricConstants.zeroValue);
    taxPayerData.documentCodeViewTable = printoutsHelper.unshiftLetterTable(taxPayerData.documentCodeView?.toString(), numricConstants.documentCodeLength, numricConstants.zeroValue);
    taxPayerData.docSeriesNumberTable = printoutsHelper.pushLetterTable((taxPayerData.docSeries + taxPayerData.docNumber), numricConstants.docSeriesNumberLength);
    const payerDateOfIssueDate = taxPayerData.issueDate ? dateTimeUtils.getDay(taxPayerData.issueDate)?.toString() : '';
    taxPayerData.dateIssueDateTable = printoutsHelper.unshiftLetterTable(payerDateOfIssueDate, numricConstants.dayLength, numricConstants.zeroValue);
    const payerMonthOfissueDate = taxPayerData.issueDate ? dateTimeUtils.getMonth(taxPayerData.issueDate)?.toString() : '';
    taxPayerData.monthIssueDateTable = printoutsHelper.unshiftLetterTable(payerMonthOfissueDate, numricConstants.monthLength, numricConstants.zeroValue);
    const payerYearOfIssueDate = taxPayerData.issueDate ? dateTimeUtils.getYear(taxPayerData.issueDate)?.toString() : '';
    taxPayerData.yearIssueDateTable = printoutsHelper.unshiftLetterTable(payerYearOfIssueDate, numricConstants.yearLength, numricConstants.zeroValue);
    const isTaxPayerInsuredPerson = input.body.insuredPersonData.isTaxPayerInsuredPerson;
    const codeTaxPayerInsuredPersonTabel = printoutsHelper.pushLetterTable(((isTaxPayerInsuredPerson) ? "1" : "0"), numricConstants.oneLetterLength);
    taxPayerData.partyFullNameTable = printoutsHelper.pushLetterTable(taxPayerData.partyFullName, numricConstants.fullName);
    taxPayerData.partyFullNameTable1 = taxPayerData.partyFullNameTable.slice(0, 20);
    taxPayerData.partyFullNameTable2 = taxPayerData.partyFullNameTable.slice(20, 40);
    taxPayerData.partyFullNameTable3 = taxPayerData.partyFullNameTable.slice(40, 60);

    const contract = input.body.contract;
    const contractDayOfStartDate = contract.startDate ? dateTimeUtils.getDay(contract.startDate)?.toString() : '';
    contract.dateStartDateTable = printoutsHelper.unshiftLetterTable(contractDayOfStartDate, numricConstants.dayLength, numricConstants.zeroValue);
    const contractMonthOfStartDate = contract.startDate ? dateTimeUtils.getMonth(contract.startDate)?.toString() : '';
    contract.monthStartDateTable = printoutsHelper.unshiftLetterTable(contractMonthOfStartDate, numricConstants.monthLength, numricConstants.zeroValue);
    const contractYearOfStartDate = contract.startDate ? dateTimeUtils.getYear(contract.startDate)?.toString() : '';
    contract.yearStartDateTable = printoutsHelper.unshiftLetterTable(contractYearOfStartDate, numricConstants.yearLength, numricConstants.zeroValue);
    contract.numberTable = printoutsHelper.pushLetterTable(contract.number, numricConstants.contractNumberLength);
    contract.typeCodeOut = ( contract.type.code == "life" ) ? '3' : '0';
    const amountOfPremiumsPaid = input.body.paymentContract.amountOfPremiumsPaid;
    const amountOfPremiumsPaidTable = printoutsHelper.pushLetterTable(Math.floor(amountOfPremiumsPaid)?.toString(), numricConstants.amountPaid, numricConstants.dashValue);
    const amountOfPremiumsPaidDecTable = printoutsHelper.pushLetterTable(printoutsHelper.getDecimalValue(amountOfPremiumsPaid), numricConstants.amountPaidDecimal, numricConstants.zeroValue);
    const requestData = {};
    requestData.requestDate = input.body.requestDate;
    const requestDayOfRequestDate = requestData.requestDate ? dateTimeUtils.getDay(requestData.requestDate)?.toString() : '';
    requestData.dateRequestDate = printoutsHelper.unshiftLetterTable(requestDayOfRequestDate, numricConstants.dayLength, numricConstants.zeroValue);
    const requestMonthOfRequestDate = requestData.requestDate ? dateTimeUtils.getMonth(requestData.requestDate)?.toString() : '';
    requestData.monthRequestDate = printoutsHelper.unshiftLetterTable(requestMonthOfRequestDate, numricConstants.monthLength, numricConstants.zeroValue);
    const requestYearOfRequestDate = requestData.requestDate ? dateTimeUtils.getYear(requestData.requestDate)?.toString() : '';
    requestData.yearRequestDate = printoutsHelper.unshiftLetterTable(requestYearOfRequestDate, numricConstants.yearLength, numricConstants.zeroValue);

    const insurer = printoutsConstant.insurerInfo;
    insurer.nameTable = printoutsHelper.pushLetterTable(insurer.name, numricConstants.insurerName);
    insurer.nameTable1 = insurer.nameTable.slice(0, 40);
    insurer.nameTable2 = insurer.nameTable.slice(40, 80);
    insurer.nameTable3 = insurer.nameTable.slice(80, 120);
    insurer.nameTable4 = insurer.nameTable.slice(120, 160);
    insurer.INNTable = printoutsHelper.pushLetterTable(insurer.INN, numricConstants.INNLength);
    insurer.KPPTable = printoutsHelper.pushLetterTable(insurer.KPP, numricConstants.KPPLength);

    const insuredPersonData = input.body.insuredPersonData;
    insuredPersonData.lastNameTable = printoutsHelper.pushLetterTable(insuredPersonData.lastName, numricConstants.nameLength);
    insuredPersonData.firstNameTable = printoutsHelper.pushLetterTable(insuredPersonData.firstName, numricConstants.nameLength);
    insuredPersonData.middleNameTable = printoutsHelper.pushLetterTable(insuredPersonData.middleName, numricConstants.nameLength);
    insuredPersonData.INNKIOTable = printoutsHelper.pushLetterTable(insuredPersonData.INNKIO, numricConstants.docLength);
    const insuredDateOfBirth = insuredPersonData.dateOfBirth ? dateTimeUtils.getDay(insuredPersonData.dateOfBirth)?.toString() : '';
    insuredPersonData.dateOfBirthTable = printoutsHelper.unshiftLetterTable(insuredDateOfBirth, numricConstants.dayLength, numricConstants.zeroValue);
    const insuredMonthOfBirth = insuredPersonData.dateOfBirth ? dateTimeUtils.getMonth(insuredPersonData.dateOfBirth)?.toString() : '';
    insuredPersonData.monthOfBirthTable = printoutsHelper.unshiftLetterTable(insuredMonthOfBirth, numricConstants.monthLength, numricConstants.zeroValue);
    const insuredYearOfBirth = insuredPersonData.dateOfBirth ? dateTimeUtils.getYear(insuredPersonData.dateOfBirth)?.toString() : '';
    insuredPersonData.yearOfBirthTable = printoutsHelper.unshiftLetterTable(insuredYearOfBirth, numricConstants.yearLength, numricConstants.zeroValue);
    insuredPersonData.documentCodeViewTable = printoutsHelper.unshiftLetterTable(insuredPersonData?.documentCodeView?.toString(), numricConstants.documentCodeLength, numricConstants.zeroValue);
    insuredPersonData.docSeriesNumberTable = printoutsHelper.pushLetterTable((insuredPersonData.docSeries + insuredPersonData.docNumber), numricConstants.docSeriesNumberLength);
    const insuredDateOfIssueDate = insuredPersonData.issueDate ? dateTimeUtils.getDay(insuredPersonData.issueDate)?.toString() : '';
    insuredPersonData.dateIssueDateTable = printoutsHelper.unshiftLetterTable(insuredDateOfIssueDate, numricConstants.dayLength, numricConstants.zeroValue);
    const insuredMonthOfIssueDate = insuredPersonData.issueDate ? dateTimeUtils.getMonth(insuredPersonData.issueDate)?.toString() : '';
    insuredPersonData.monthIssueDateTable = printoutsHelper.unshiftLetterTable(insuredMonthOfIssueDate, numricConstants.monthLength, numricConstants.zeroValue);
    const insuredYearOfIssueDate = insuredPersonData.issueDate ? dateTimeUtils.getYear(insuredPersonData.issueDate)?.toString() : '';
    insuredPersonData.yearIssueDateTable = printoutsHelper.unshiftLetterTable(insuredYearOfIssueDate, numricConstants.yearLength, numricConstants.zeroValue);

    const certificatSigner = {};
    certificatSigner.FullName = "Кириллова Оксана    Артуровна";
    certificatSigner.FullNameTable = printoutsHelper.pushLetterTable(certificatSigner.FullName, numricConstants.fullName);
    certificatSigner.FullNameTable1 = certificatSigner.FullNameTable.slice(0, 20);
    certificatSigner.FullNameTable2 = certificatSigner.FullNameTable.slice(20, 40);
    certificatSigner.FullNameTable3 = certificatSigner.FullNameTable.slice(40, 60);
    certificatSigner.certificateIssueDate = input.body.issueData.certificateIssueDate;
    const certificateDayIssueDate = certificatSigner.certificateIssueDate ? dateTimeUtils.getDay(certificatSigner.certificateIssueDate)?.toString() : '';
    certificatSigner.dateIssueDateTable = printoutsHelper.unshiftLetterTable(certificateDayIssueDate, numricConstants.dayLength, numricConstants.zeroValue);
    const certificateMonthIssueDate = certificatSigner.certificateIssueDate ? dateTimeUtils.getMonth(certificatSigner.certificateIssueDate)?.toString() : '';
    certificatSigner.monthIssueDateTable = printoutsHelper.unshiftLetterTable(certificateMonthIssueDate, numricConstants.monthLength, numricConstants.zeroValue);
    const certificateYearIssueDate = certificatSigner.certificateIssueDate ? dateTimeUtils.getYear(certificatSigner.certificateIssueDate)?.toString() : '';
    certificatSigner.yearIssueDateTable = printoutsHelper.unshiftLetterTable(certificateYearIssueDate, numricConstants.yearLength, numricConstants.zeroValue);
    certificatSigner.certificateIssueDate = certificatSigner.certificateIssueDate ? dateTimeUtils.formatDate(certificatSigner.certificateIssueDate, dateTimeUtils.DateFormats.CALENDAR) : '';

    return {
        originalDocumentNumber,
        originalDocumentNumberTable,
        seqNumber,
        seqNumberTable,
        accountingYear,
        accountingYearTable,
        taxPayerData,
        insurer,
        codeTaxPayerInsuredPersonTabel,
        isTaxPayerInsuredPerson,
        contract,
        amountOfPremiumsPaidTable,
        amountOfPremiumsPaidDecTable,
        requestData,
        insuredPersonData,
        certificatSigner,
        isKNDCodeDisplayed
    };
};
