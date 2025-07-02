const { applicantType, reasonForRecipient } = require('@config-rgsl/life-insurance/lib/lifeInsuranceRequestConstants');

module.exports = function mapping(input, result) {
    const body = this.businessContext.rootData;
    const amendmentBeneficiaryData = body.technicalInformation.amendmentBeneficiaryData;
    const isBeneficiary = applicantType.beneficiary === body.applicantType;

    if (result.recipient) {
        body.recipient = result.recipient;

        return;
    }

    if (amendmentBeneficiaryData) {
        if (isBeneficiary) {
            const applicantPartyData = body.applicant.partyData;
            body.recipient.partyData = {
                partyCode: applicantPartyData.partyCode,
                partyFullName: applicantPartyData.partyFullName
            };
        }

        body.recipient.reasonForRecipient = reasonForRecipient.beneficiaryByEndowment;

        return;
    }

    if (result.insuredPerson) {
        body.recipient = {
            partyData: {
                partyCode: result.insuredPerson.personCode,
                partyFullName: result.insuredPerson.fullName
            },
            reasonForRecipient: reasonForRecipient.insuredPerson
        };

        return;
    }

    body.recipient = {};
};
