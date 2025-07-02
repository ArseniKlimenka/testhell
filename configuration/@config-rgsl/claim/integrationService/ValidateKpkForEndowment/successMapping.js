'use strict';

const partyDocumentLib = require('@config-rgsl/party/component/PartyDocument/lib/partyDocumentLib');
const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');

module.exports = function mapping({ input, sinkExchange }) {

    const paticipantsData = sinkExchange.paticipantsData.map(i => i.resultData);
    let hasNonResident = false;

    const beneficaries = sinkExchange.endowment.body.endowmentBeneficiaries ?? [];
    beneficaries.forEach(item => {

        const paticipantData = paticipantsData.find(i => i.code === item.partyCode);

        if (paticipantData.isNonResident) {

            hasNonResident = true;
        }
    });

    const holder = sinkExchange.policyParties.holder;
    const insured = sinkExchange.policyParties.insuredPerson;

    const kpkServiceResult = sinkExchange.kpkValidationData.map(_ => _.resultData);
    for (const item of kpkServiceResult) {

        const participant = paticipantsData.find(p => p.code == item.ContractorPartyCode);
        item.participantPartyName = participant.fullName;

        if (item.ContractorPartyCode == holder.personCode) {

            item.participantTypeName = 'Страхователь';
        }
        else if (item.ContractorPartyCode == insured.personCode) {

            item.participantTypeName = 'Застрахованный';
        }
        else {

            item.participantTypeName = 'Выгодоприобретатель';
        }

        const passports = participant.identityDocuments.filter(doc => doc.identityDocumentType === 'passport');
        let latestPassport = passports.length > 0 && passports[0] || undefined;
        passports.forEach(function (pass) { latestPassport = new Date(pass.issueDate) > new Date(latestPassport.issueDate) ? pass : latestPassport; });

        if (latestPassport) {
            const passportValidationResult = partyDocumentLib.checkPassportAge(
                {
                    issueDate: latestPassport?.issueDate,
                    dateOfBirth: participant.dateOfBirth,
                    validationDate: DateTimeUtils.dateNow(),
                });

            item.passportExists = true;
            item.passportValidationResult = passportValidationResult;
        }
    }

    const successResponse = {
        kpkServiceResult: kpkServiceResult,
        hasNonResident: hasNonResident,
    };

    return successResponse;
};
