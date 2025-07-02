'use static';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.logMessages = [];

    if (input.accountingCertificateNumber) {
        sinkExchange.isCorrectionCreation = true;
        return;
    }

    const body = {
        typeOfRequest: {
            code: input.typeOfRequest?.code
        },
        accountingYear: {
            year: input.accountingYear?.year
        },
        contract: {
            type: {
                code: input.contract?.type?.code,
                description: input.contract?.type?.description,
            },
            number: input.contract?.number,
            isInsurerSendDataToFns: input.contract?.isInsurerSendDataToFns
        },
        paymentContract: {
            isManualCorrectionSum: input.paymentContract?.isManualCorrectionSum
        },
        taxPayerData: {
            partyCode: input.taxPayerData?.partyCode,
            isTaxPayerPolicyHolder: input.taxPayerData?.isTaxPayerPolicyHolder
        },
        insuredPersonData: {
            partyCode: input.insuredPersonData?.partyCode,
            isTaxPayerInsuredPerson: input.insuredPersonData?.isTaxPayerInsuredPerson
        },
        issueData: {},
        attachmentsPackage: [],
        technicalInformation: {},
        requestDate: input.requestDate,
        isApplicantPolicyHolder: input.isApplicantPolicyHolder,
        applicantFullName: input.applicantFullName,
        correctionNumber: 0,
        accountingCertificateEnrichments: {
            enrichFields: [
                "**/**"
            ]
        },
        accountingCertificateIncomeSource: input.accountingCertificateIncomeSource,
    };

    if (input.paymentContract?.isManualCorrectionSum) {
        body.paymentContract.amountOfPremiumsPaid = input.paymentContract?.amountOfPremiumsPaid;
    }

    const result = {
        body: body
    };

    return result;
};
