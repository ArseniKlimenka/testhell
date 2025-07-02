'use strict';

const currency = {
    defaultCurrency: 'RUB',
};

const partyType = {
    naturalPerson: 'NaturalPerson',
    legalEntity: 'LegalEntity',
    soleProprietor: 'SoleProprietor'
};

const documentEditMode = {
    mainDocument: 'MainDocument',
    changeAmendment: 'ChangeAmendment',
    cancellationAmendment: 'CancellationAmendment'
};

const agreementType = {
    agreement: "Agreement",
    changeAmendment: "ChangeAmendment",
    cancellationAmendment: "CancellationAmendment"
};

const dimensionEnum = {
    agentAgreementType: {
        dimension: "Agreement",
        configurationCodeName: "AgentAgreement",
        isAmendment: false
    },
    changeAmendmentType: {
        dimension: "ChangeAmendment",
        configurationCodeName: "AAChangeAmendment",
        isAmendment: true,
        dataPath: "changeAmendmentData"
    },
    cancellationAmendmentType: {
        dimension: "CancellationAmendment",
        configurationCodeName: "AACancellationAmendment",
        isAmendment: true,
        dataPath: "cancellationAmendmentData"
    }
};

const accPeriodStatus = {
    open: 1,
    inProcessOfClosing: 2,
    closed: 3
};

const configurationCodeNames = Object.keys(dimensionEnum).map(property => dimensionEnum[property].configurationCodeName);

const amendmentDimensions = Object.keys(dimensionEnum).filter(property => dimensionEnum[property].isAmendment).map(property => dimensionEnum[property].dimension);

module.exports = {
    currency,
    partyType,
    documentEditMode,
    agreementType,
    dimensionEnum,
    configurationCodeNames,
    amendmentDimensions,
    accPeriodStatus
};
