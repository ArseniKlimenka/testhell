const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');
const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = {

    /**
     * @desc prepare input for data source GetPartyDuplicatesDataSource
     * @param {object} body party body
     * @param {string} partyType party configurationCodeName
     * @param {string} partyCode party code
     * @return {object} input for data source GetPartyDuplicatesDataSource
     */
    prepareInput: function (body, partyType, partyCode) {

        const lastName = getValue(body, 'partyPersonData.lastName');
        const firstName = getValue(body, 'partyPersonData.firstName');
        const middleName = getValue(body, 'partyPersonData.middleName');
        const dateOfBirth = getValue(body, 'partyPersonData.dateOfBirth');
        const OGRNOGRNIP = getValue(body, 'partyOrganisationData.partyOGRN.OGRNOGRNIP');

        const documents = JSON.stringify(getValue(body, 'partyDocuments', []));

        if (partyType == partyConstants.partyType.NaturalPerson) {
            if (!lastName || !firstName || !dateOfBirth) { return; }
        }
        else if (partyType == partyConstants.partyType.LegalEntity) {
            if (!OGRNOGRNIP) { return; }
        }
        else {
            return;
        }

        const output = {
            data: {
                criteria: {
                    partyType,
                    currentPartyCode: partyCode,
                    lastName,
                    firstName,
                    middleName,
                    dateOfBirth,
                    OGRNOGRNIP,
                    documents
                }
            }
        };

        return output;

    },

    /**
     * @desc counts quantity of potential duplicates
     * @param {object} body party body
     * @param {string} partyType party configurationCodeName
     * @param {string} partyCode party code
     * @param {object} ambientProperties ambientProperties
     * @return {integer} quantity of potential duplicates
     */
    getDuplicatesCount: async function (body, partyType, partyCode, ambientProperties) {

        let duplicatesCount = 0;

        const dataSourceInput = this.prepareInput(body, partyType, partyCode);

        if (dataSourceInput) {

            const request = {
                method: 'POST',
                url: 'api/entity-infrastructure/shared/datasource/GetPartyDuplicatesDataSource',
                data: dataSourceInput
            };

            const result = await ambientProperties.services.api.call(request);
            if (result.data && result.data.duplicatesCount) {
                duplicatesCount = result.data.duplicatesCount;
            }
        }

        return duplicatesCount;

    }

};
