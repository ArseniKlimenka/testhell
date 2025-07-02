'use strict';

const { claimRisks } = require('@config-rgsl/claim-base/lib/ClaimRisks');
const printoutUtils = require('@config-rgsl/acc-payment-order/lib/printoutHelper');
const { printoutConsts } = require('@config-rgsl/claim-base/lib/claimConsts');


function setPolicyMappingForRejectionMail(input, dataSourceResponse) {

    input.policyHolderName = dataSourceResponse.data[0].resultData.policyHolderName;
    input.insuredPersonName = dataSourceResponse.data[0].resultData.insuredPersonName;

    const policyIssueDate = dataSourceResponse.data[0].resultData.issueDate;
    input.policyIssueDateFormated = policyIssueDate ? printoutUtils.formatDatePrint(policyIssueDate) : undefined;

    const insuranceRule = dataSourceResponse.data[0].resultData.insuranceRules;
    input.insuranceRuleName = insuranceRule ? insuranceRule.ruleDescription : undefined;
    input.insuranceRuleDateFormated = insuranceRule ? printoutUtils.formatDatePrint(insuranceRule.ruleDate) : undefined;

    const beneficiaries = dataSourceResponse.data[0].resultData.beneficiaries;
    const beneficiariesArray = beneficiaries.beneficiaries || [];

    const risksArray = dataSourceResponse.data[0].resultData.items[0].attributes.risks;
    const risks = risksArray.map(item => { return { riskCode: item.riskCode, riskName: item.riskFullDescription }; });

    input.riskTableItems = getRisksItems(risks, beneficiariesArray, input.insuredPersonName);
}

function setStateMappingForClaimMail(input, dataSourceResponse) {

    const states = dataSourceResponse.data.map(item => item.resultData);
    const currentSateCollection = states.filter(item => item.stateCode === input.claimState);

    if (currentSateCollection.length === 0) {

        return;
    }

    const currentLastState = currentSateCollection.reduce(function (a, b) { return a.validFromWithTime > b.validFromWithTime ? a : b; });
    input.stateExecutedBy = currentLastState.changedByParty;

    const stateDate = currentLastState.validFrom;
    input.stateDateFormated = stateDate ? printoutUtils.formatDatePrint(stateDate) : undefined;
}

function setApplicantMappingForClaimMail(input, party) {

    input.applicantFirstName = party?.body?.partyPersonData?.firstName ?? '';
    input.applicantMiddleName = party?.body?.partyPersonData?.middleName ?? '';

    const partyAddresses = party?.body?.partyAddresses ?? [];
    const filteredAddresses = partyAddresses.filter(address => address.addressType.addressTypeCode == 'F');

    if (filteredAddresses.length > 0) {

        input.applicantAddress = filteredAddresses[0].fullAddress.value;
        input.applicantPostalCode = filteredAddresses[0].postalCode;
    }
}

function setPolicyMappingForClientRequestMail(input, dataSourceResponse) {

    input.policyHolderName = dataSourceResponse.data[0].resultData.policyHolderName;

    const policyIssueDate = dataSourceResponse.data[0].resultData.issueDate;
    input.policyIssueDateFormated = policyIssueDate ? printoutUtils.formatDatePrint(policyIssueDate) : undefined;

    const insuranceRule = dataSourceResponse.data[0].resultData.insuranceRules;
    input.insuranceRuleName = insuranceRule ? insuranceRule.ruleDescription : undefined;
    input.insuranceRuleDateFormated = insuranceRule ? printoutUtils.formatDatePrint(insuranceRule.ruleDate) : undefined;
}

function getDataMappingForRejectionMail(input, claimNumber, claimState) {

    const sideContent = getSideContentForClaimMail();
    const applicantName = input.body.mainAttributes?.applicationInfo?.applicant?.fullName;
    const applicantPartyCode = input.body.mainAttributes?.applicationInfo?.applicant?.partyCode;
    const insuredEventDate = input.body.mainAttributes?.insuredEvent?.insuredEventDate;
    const insuredEventDateFormated = insuredEventDate ? printoutUtils.formatDatePrint(insuredEventDate) : undefined;
    const contractNumber = input.body.mainAttributes?.contract?.number ?? "Empty";
    const rejectionNote = input.body.mainAttributes?.rejectionNote;
    const rejectionNoteRows = rejectionNote.split(/\r?\n/);
    const markupRows = [];

    rejectionNoteRows.forEach(row => {
        markupRows.push(`<p>${row}</p>`);
    });

    const formatedRejectionNote = markupRows.join('');

    const mailSequence = input.body.claimMailSequence;
    const mailNumber = `${printoutConsts.cliamMailPrefix}/${mailSequence}`;

    const output = {
        sideContent,
        claimNumber,
        claimState,
        applicantName,
        applicantPartyCode,
        insuredEventDateFormated,
        contractNumber,
        formatedRejectionNote,
        mailNumber
    };

    return output;
}

function getDataMappingForRequestToClientMail(input, claimNumber, claimState) {

    const sideContent = getSideContentForClaimMail();
    const applicantName = input.body.mainAttributes?.applicationInfo?.applicant?.fullName;
    const applicantPartyCode = input.body.mainAttributes?.applicationInfo?.applicant?.partyCode;
    const insuredEventDate = input.body.mainAttributes?.insuredEvent?.insuredEventDate;
    const insuredEventDateFormated = insuredEventDate ? printoutUtils.formatDatePrint(insuredEventDate) : undefined;
    const contractNumber = input.body.mainAttributes?.contract?.number ?? "Empty";
    const riskCode = input.body.mainAttributes?.selectedRisk?.riskCode;
    const mailSequence = input.body.claimMailSequence;
    const mailNumber = `${printoutConsts.cliamMailPrefix}/${mailSequence}`;

    const requestReason = input.body.requestReasons?.requestToClientReason;
    const requestReasonRows = requestReason.split(/\r?\n/);
    const markupRows = [];

    requestReasonRows.forEach(row => {
        markupRows.push(`<p>${row}</p>`);
    });

    const formatedRequestReason = markupRows.join('');

    const output = {
        sideContent,
        applicantPartyCode,
        applicantName,
        insuredEventDateFormated,
        contractNumber,
        riskCode,
        requestReason,
        claimNumber,
        claimState,
        mailNumber,
        formatedRequestReason
    };

    return output;
}

function getSideContentForClaimMail() {

    return `<style>
    @page {
    @top-left {
        margin-top: 40;
        content: url("./img/logoHeader.png");
    }
    @top-right {
        margin-top: 40;
        content: url("./img/logoHeader2.png");
    }
    @bottom-left {
        margin-bottom: 80px;
        color: gray;
        font-size: 8pt;
        white-space: pre-line;
        content: "ООО СК «Росгосстрах Жизнь»\\A 119991, г. Москва-59, ул. Киевская, д. 7, к. 1.\\A Лицензия Банка России от 25.03.2021 г.: СЖ № 3879, СЛ № 3879\\A ИНН 7743504307. ОГРН 1037739821514";
    }
    @bottom-right {
        margin-bottom: 60px;
        margin-right: 13mm;
        color: crimson;
        font-size: 10pt;
        white-space: pre-line;
        content: "RGSL.RU\\A 8-800-100-12-10";
    }
   }
   </style>`;
}

function getRisksItems(risks, beneficiaries, insuredPerson) {

    const tableItems = [];

    risks.forEach(risk => {

        const riskConf = claimRisks({ riskCode: risk.riskCode }) || {};

        if (riskConf?.isDeathRisk) {

            if (beneficiaries && beneficiaries.length > 0) {

                let isRiskSet = false;
                const totalShare = beneficiaries.reduce((previousBeneficiary, currentBeneficiary) => (previousBeneficiary.share * 100) + (currentBeneficiary.share * 100));
                const unclaimedShare = 100 - totalShare;
                let rowSpan = beneficiaries.length;

                if (unclaimedShare > 0) {

                    rowSpan++;
                }

                beneficiaries.forEach(beneficiary => {

                    if (isRiskSet) {

                        tableItems.push(`<tr><td>${beneficiary.partyFullName} ${beneficiary.share * 100}%</td></tr>`);
                    }
                    else {

                        tableItems.push(`<tr><td rowspan='${rowSpan}'>${risk.riskName}</td><td>${beneficiary.partyFullName} ${beneficiary.share * 100}%</td></tr>`);
                        isRiskSet = true;
                    }
                });

                if (unclaimedShare > 0 && isRiskSet) {

                    tableItems.push(`<tr><td>Наследники застрахованного лица по закону ${unclaimedShare}%</td></tr>`);
                }
                else if (unclaimedShare > 0 && !isRiskSet) {

                    tableItems.push(`<tr><td>${risk.riskName}</td><td>Наследники застрахованного лица по закону ${unclaimedShare}%</td></tr>`);
                }
            }
            else {

                tableItems.push(`<tr><td>${risk.riskName}</td><td>Наследники застрахованного лица по закону</td></tr>`);
            }
        }
        else {

            tableItems.push(`<tr><td>${risk.riskName}</td><td>${insuredPerson}</td></tr>`);
        }
    });

    return tableItems.join('');
}

module.exports = {
    setPolicyMappingForRejectionMail,
    setStateMappingForClaimMail,
    setApplicantMappingForClaimMail,
    setPolicyMappingForClientRequestMail,
    getDataMappingForRejectionMail,
    getDataMappingForRequestToClientMail
};
