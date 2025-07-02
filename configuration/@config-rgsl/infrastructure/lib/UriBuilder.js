'use strict';

const { amendmentType } = require('@config-rgsl/life-insurance/lib/amendmentConstants');

module.exports = {

    /**
    * Creates party URI
    * Used for Link control with "targetType": "Entity" (opens in the same window).
    */
    getPartyEntityUri: function (partyType, partyCode) {
        return {
            path: '/edit',
            parametersData: {
                parameters: {
                    entity: "Party",
                    configurationCodeName: partyType,
                    version: "1",
                    code: partyCode
                }
            }
        };
    },

    /**
    * Creates document URI
    * Used for Link control with "targetType": "Entity" (opens in the same window).
    */

    getDocumentUri: function (entityType, configuration, businessNumber) {
        return {
            path: '/edit',
            parametersData: {
                parameters: {
                    entity: entityType,
                    configurationCodeName: configuration.name,
                    version: configuration.configurationVersion,
                    documentNumber: businessNumber
                }
            }
        };
    },

    /**
    * Creates contract URI
    */
    getContractUri: function (configurationName, configurationVersion, documentNumber) {

        const contractEntity = 'Contract';
        const encodedDocumentNumber = encodeURIComponent(documentNumber);

        return `edit;entity=${contractEntity};configurationCodeName=${configurationName};version=${configurationVersion};documentNumber=${encodedDocumentNumber}`;
    },

    /**
     * Function for creating entity targetType Url Uri
     *
     * @param {string} entity entity name
     * @param {string} configurationCodeName configurationCodeName name
     * @param {string} code code string
     */
    getEntityUri: function (entity, configurationCodeName, code) {

        return `edit;entity=${entity};configurationCodeName=${configurationCodeName};version=1;code=${code}`;

    },

    /**
     * Function for creating contract amendment targetType Url Uri
     *
     * @param {string} entity entity name
     * @param {string} configurationCodeName configurationCodeName name
     * @param {string} parentCode code string
     * @param {string} seqNumber seqNumber string
     */
    getContractAmendmentUri: function (entity, configurationCodeName, documentNumber) {

        const encodedDocumentNumber = encodeURIComponent(documentNumber);
        return `edit;entity=${entity};configurationCodeName=${configurationCodeName};documentNumber=${encodedDocumentNumber};version=1`;
    },

    /**
    * Creates party URI
    * Used for Link control with "targetType": "Url" (opens in new window).
    */
    getPartyUri: function (partyType, partyCode) {
        const partyEntity = 'Party';

        return this.getEntityUri(partyEntity, partyType, partyCode);
    },

    /**
    * Creates organisation unit URI
    * Used for Link control with "targetType": "Url" (opens in new window).
    */
    getOrganisationUnitUri: function (configurationCodeName, organisationUnitCode) {
        const organisationUnitEntity = 'OrganisationUnit';

        return this.getEntityUri(organisationUnitEntity, configurationCodeName, organisationUnitCode);
    },

    /**
     * Creates agent agreement URI
     */
    getAgentAgreementUri: function (documentNumber, configurationName) {

        const entity = 'AgentAgreement';
        const configurationVersion = '1';
        const encodedDocumentNumber = encodeURIComponent(documentNumber);

        return `edit;entity=${entity};configurationCodeName=${configurationName};version=${configurationVersion};documentNumber=${encodedDocumentNumber}`;
    },

    /**
    * Creates payment order URI
    */
    getPaymentOrderUri: function (documentNumber) {

        const encodedDocumentNumber = encodeURIComponent(documentNumber);
        return `edit;entity=PaymentOrder;configurationCodeName=PaymentOrder;version=1;documentNumber=${encodedDocumentNumber}`;
    },

    /**
     * Creates claim URI
     */
    getClaimUri: function (documentNumber) {

        const entity = 'Claim';
        const configurationName = 'Claim';
        const configurationVersion = '1';
        const encodedDocumentNumber = encodeURIComponent(documentNumber);

        return `edit;entity=${entity};configurationCodeName=${configurationName};version=${configurationVersion};documentNumber=${encodedDocumentNumber}`;
    },

    /**
     * Creates collective claim URI
     */
    getCollectiveClaimUri: function (documentNumber) {

        const entity = 'Claim';
        const configurationName = 'CollectiveClaim';
        const configurationVersion = '1';
        const encodedDocumentNumber = encodeURIComponent(documentNumber);

        return `edit;entity=${entity};configurationCodeName=${configurationName};version=${configurationVersion};documentNumber=${encodedDocumentNumber}`;
    },

    /**
     * Creates claim URI
     */
    getEndowmentUri: function (documentNumber) {

        const entity = 'UniversalDocument';
        const configurationName = 'Endowment';
        const configurationVersion = '1';
        const encodedDocumentNumber = encodeURIComponent(documentNumber);

        return `edit;entity=${entity};configurationCodeName=${configurationName};version=${configurationVersion};documentNumber=${encodedDocumentNumber}`;
    },

    /**
         * Creates universal document URI
         */
    getUniverslaDocumentUri: function (documentNumber, configurationName) {

        const entity = 'UniversalDocument';
        const configurationVersion = '1';
        const encodedDocumentNumber = encodeURIComponent(documentNumber);

        return `edit;entity=${entity};configurationCodeName=${configurationName};version=${configurationVersion};documentNumber=${encodedDocumentNumber}`;
    },

    /**
     * Function for creating ServiceProvider Url Uri
     *
     * @param {string} configurationCodeName configurationCodeName name
     * @param {string} code code string
     */
    getServiceProviderUri: function (configurationCodeName, code) {

        return `edit;entity=ServiceProvider;configurationCodeName=${configurationCodeName};version=1;code=${code}`;

    },

    getImportDocumentUri: function (documentNumber, configurationName) {

        const entity = 'ImportDocument';
        return `edit;configurationCodeName=${configurationName};documentNumber=${documentNumber};version=1;entity=ImportDocument;`;
    },

    getIntegrationServiceUri: function (configurationName) {

        return `api/core/shared/integration-services/${configurationName}/1`;
    },

    getDataSourceUri: function (configurationName) {

        return `api/entity-infrastructure/shared/datasource/${configurationName}/1`;
    },

    getConfCodeNameByDimension: function (dimProductGroup, dimAmendmentType, dimContractType) {

        let dimAmendmentTypeForConf = dimAmendmentType ?? dimContractType;

        if (dimAmendmentType == amendmentType.FinancialChange) {
            dimAmendmentTypeForConf = 'FinChange';
        }

        if (dimAmendmentType == amendmentType.NonFinancialChange) {
            dimAmendmentTypeForConf = 'NonFinChange';
        }

        if (dimAmendmentType == amendmentType.Technical) {
            dimAmendmentTypeForConf = 'TechnicalAmendment';
        }

        return `${dimProductGroup}LifeInsurance${dimAmendmentTypeForConf}`;
    }

};
