'use strict';

const { taxAttachmentType } = require('@config-rgsl/accounting/lib/accountingCertificateHelper');

module.exports = function accountingCertificateMapping({
    id,
    number,
    originalDocumentNumber,
    state,
    sequenceNumber,
    body,
    commonBody,
    dimensions
}, sinkExchange) {

    const seqNumber = sequenceNumber;

    const typeOfRequestCode = body.typeOfRequest?.code;
    const applicantFullName = body.applicantFullName;
    const requestDate = body.requestDate;

    const contractNumber = body.contract?.number;
    const contractTypeCode = body.contract?.type?.code;
    const contractIssueDate = body.contract?.issueDate;
    const contractStartDate = body.contract?.startDate;
    const contractEndDate = body.contract?.endDate;

    const holderPartyCode = body.contract?.parties?.holder?.personCode;
    const holderPartyFullName = body.contract?.parties?.holder?.fullName;

    const insuredPartyCode = body.insuredPerson?.personCode;
    const insuredPartyFullName = body.insuredPerson?.fullName;
    const isTaxPayerInsuredPerson = body.insuredPersonData?.isTaxPayerInsuredPerson;

    const taxPayerPartyCode = body.taxPayerData?.partyCode;
    const taxPayerFullName = body.taxPayerData?.partyFullName;
    const isTaxPayerPolicyHolder = body.taxPayerData?.isTaxPayerPolicyHolder;

    const accountingYear = body.accountingYear?.year;
    const correctionNumber = body.correctionNumber;

    const amountOfPremiumsPaid = body.paymentContract?.amountOfPremiumsPaid;
    const isManualCorrectionSum = body.paymentContract?.isManualCorrectionSum;
    const certificateIssueDate = body.issueData?.certificateIssueDate;
    const employeePartyCode = body.issueData?.employeePartyCode;
    const isInsurerSendDataToFns = body.contract?.isInsurerSendDataToFns;
    const incomeSource = body.accountingCertificateIncomeSource;
    const taxCertificateFormat = body.issueData?.taxCertificateFormat;

    const result = {

        'ACC_IMPL.CRT_HUB': [{
            CERTIFICATE_NUMBER: number
        }],

        'ACC_IMPL.CRT_SAT': [{
            CERTIFICATE_NUMBER: number,
            STATE: undefined,
            ORIGINAL_DOCUMENT_NUMBER: originalDocumentNumber,
            SEQ_NUMBER: seqNumber,
            TYPE_OF_REQUEST_CODE: typeOfRequestCode,
            APPLICANT_FULL_NAME: applicantFullName,
            REQUEST_DATE: requestDate,
            CONTRACT_NUMBER: contractNumber,
            CONTRACT_TYPE_CODE: contractTypeCode,
            CONTRACT_ISSUE_DATE: contractIssueDate,
            CONTRACT_START_DATE: contractStartDate,
            CONTRACT_END_DATE: contractEndDate,
            HOLDER_PARTY_CODE: holderPartyCode,
            HOLDER_FULL_NAME: holderPartyFullName,
            INSURED_PARTY_CODE: insuredPartyCode,
            INSURED_FULL_NAME: insuredPartyFullName,
            IS_TAX_PAYER_INSURED_PERSON: isTaxPayerInsuredPerson,
            TAX_PAYER_PARTY_CODE: taxPayerPartyCode,
            TAX_PAYER_FULL_NAME: taxPayerFullName,
            IS_TAX_PAYER_POLICY_HOLDER: isTaxPayerPolicyHolder,
            ACCOUNTING_YEAR: accountingYear,
            CORRECTION_NUMBER: correctionNumber,
            AMOUNT_OF_PREMIUMS_PAID: amountOfPremiumsPaid,
            IS_MANUAL_CORRECTION_SUM: isManualCorrectionSum,
            CERTIFICATE_ISSUE_DATE: certificateIssueDate,
            IS_INSURER_SEND_DATA_TO_FNS: isInsurerSendDataToFns,
            INCOME_SOURCE: incomeSource,
            TAX_CERTIFICATE_FORMAT: taxCertificateFormat
        }],

        'ACC_IMPL.CRT_CONTRACT_LINK': contractNumber ? [
            {
                CERTIFICATE_NUMBER: number,
                CONTRACT_NUMBER: contractNumber
            }
        ] : [],

        'ACC_IMPL.CRT_HOLDER_LINK': holderPartyCode ? [
            {
                CERTIFICATE_NUMBER: number,
                PARTY_CODE: holderPartyCode
            }
        ] : [],

        'ACC_IMPL.CRT_INSURED_LINK': insuredPartyCode ? [
            {
                CERTIFICATE_NUMBER: number,
                PARTY_CODE: insuredPartyCode
            }
        ] : [],

        'ACC_IMPL.CRT_TAX_PAYER_LINK': taxPayerPartyCode ? [
            {
                CERTIFICATE_NUMBER: number,
                PARTY_CODE: taxPayerPartyCode
            }
        ] : [],

        'ACC_IMPL.CRT_EMPLOYEE_LINK': employeePartyCode ? [
            {
                CERTIFICATE_NUMBER: number,
                PARTY_CODE: employeePartyCode
            }
        ] : [],

    };

    return result;

};
