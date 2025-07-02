'use strict';

module.exports = (() => {

    /**
     * Calls data source from client action
     * @param {object} ambientProperties ambientProperties from client action input
     * @param {string} dataSourceConfigName data source configuration name
     * @param {object} request data source request
     * @returns {Promise} promise for call to data source api
     */
    const callDataSource = (ambientProperties, dataSourceConfigName, request) => {

        return ambientProperties.services.api.call({
            method: 'post',
            url: `api/entity-infrastructure/shared/datasource/${dataSourceConfigName}`,
            data: request,
            returnHttpPromise: true,
            callContext: {
                workUnitActorCode: ambientProperties.currentWorkUnitActor
            }
        });
    };

    /**
     * Calls integration service from client action
     * @param {object} ambientProperties ambientProperties from client action input
     * @param {string} serviceName integration service configuration name
     * @param {object} request integration service request
     * @returns {Promise} promise for call to business rule api
     */
    const callIntegrationService = (ambientProperties, serviceName, request) => {

        return ambientProperties.services.api.call({
            method: 'post',
            url: `api/core/shared/integration-services/${serviceName}/1`,
            data: request,
            returnHttpPromise: true,
            callContext: {
                workUnitActorCode: ambientProperties.currentWorkUnitActor
            }
        });
    };

    return {
        callDataSource,
        callIntegrationService
    };
})();
