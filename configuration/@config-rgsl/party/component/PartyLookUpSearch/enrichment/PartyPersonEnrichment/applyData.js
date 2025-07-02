module.exports = function applyData(input, dataSourceResponse) {


    if (dataSourceResponse?.data?.length === 0) {

        return;
    }

    const party = dataSourceResponse.data[0].resultData;

    input.partyId = party.partyId;
    input.partyFullName = (party.commonBody && party.commonBody.fullName) ? party.commonBody.fullName : undefined;
    input.partyBody = party.body ? party.body : {};
    input.partyType = party.partyType;
    input.dateOfBirth = party.body.partyPersonData?.dateOfBirth;
    input.personGender = party.body.partyPersonData?.personGender;

    // fill phone and e-mail for ePolicy
    const dataPath = this.businessContext.dataPath;
    const issueFormCode = this.businessContext.rootData.issueForm?.code?.issueFormCode;
    const isPaper = issueFormCode == 'paper';

    if (dataPath == '/policyHolder/partyData') {

        if (!isPaper) {

            const partyPhones = party.body.partyPhones ?? [];
            const selectedPartyPhone = partyPhones && partyPhones.find(item => item.isPreferable) || partyPhones[0];
            const fullNumber = selectedPartyPhone.fullNumber;

            const currentPhoneNumber = this.businessContext.rootData.issueForm?.phoneNumber;
            if (!currentPhoneNumber) {
                const countryPhoneCode = selectedPartyPhone?.countryCode?.countryPhoneCode;
                this.businessContext.rootData.issueForm.phoneNumber = `${countryPhoneCode}${fullNumber}`;
            }

            const partyEmails = party.body.partyEmails ?? [];
            const selectedPartyEmail = partyEmails && partyEmails.find(item => item.isPreferable) || partyEmails[0];
            const email = selectedPartyEmail?.email;

            const currentEMail = this.businessContext.rootData.issueForm?.email;
            if (!currentEMail) {
                this.businessContext.rootData.issueForm.email = email;
            }

        }
    }

};

