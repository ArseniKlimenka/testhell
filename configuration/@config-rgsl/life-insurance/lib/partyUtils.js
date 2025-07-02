"use strict";

const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

async function getPartyData(ambientProperties, that, partyCode) {

    const partyRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetPartyDataSource',
        data: {
            data: {
                criteria: {
                    partyCode: partyCode
                }
            }
        }
    };

    let result;
    try {
        that.view.startBlockingUI();
        result = await ambientProperties.services.api.call(partyRequest);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        that.view.stopBlockingUI();
    }

    if (result.data.length !== 0) {
        const party = result.data[0].resultData;
        return party;
    }
}

async function getPartiesData(ambientProperties, that, partyCodes) {

    const request = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/GetPartyDataSource',
        data: {
            data: {
                criteria: {
                    partyCodes: partyCodes,
                }
            }
        }
    };

    let result;
    try {
        that.view.startBlockingUI();
        result = await ambientProperties.services.api.call(request);
    }
    catch (err) {
        throwResponseError(err);
    }
    finally {
        that.view.stopBlockingUI();
    }

    if (result?.data?.length !== 0) {
        return result;
    }
}

function mapPartiesToBeneficiaryOwners(beneficiaryOwners, parties) {

    parties.data.forEach(partyData => {
        const matchedPerson = beneficiaryOwners.find(
            person => person.anotherNaturalPerson?.partyCode == partyData.resultData.partyCode
        );

        if (matchedPerson) {
            matchedPerson.anotherNaturalPerson.partyId = partyData.resultData.partyId;
            matchedPerson.anotherNaturalPerson.partyFullName = partyData.resultData.commonBody?.fullName;
            matchedPerson.anotherNaturalPerson.partyBody = partyData.resultData.body;
            matchedPerson.anotherNaturalPerson.partyType = partyData.resultData.partyType;
            matchedPerson.anotherNaturalPerson.dateOfBirth = partyData.resultData.body?.partyPersonData?.dateOfBirth;
            matchedPerson.anotherNaturalPerson.personGender = partyData.resultData.body?.partyPersonData?.personGender;
        }
    });
}

module.exports = {
    getPartyData,
    getPartiesData,
    mapPartiesToBeneficiaryOwners
};
