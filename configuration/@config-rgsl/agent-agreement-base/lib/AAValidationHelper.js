'use strict';

const { validateRules } = require('@config-rgsl/agent-agreement-base/lib/AARulesConsistencyHelper');
const validationByRole = require('@config-rgsl/party/lib/partyValidationByRole');
const { partyType } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');
const { periodType } = require('@config-rgsl/acc-base/lib/accConsts.js');
const { accPeriodStatus } = require('@config-rgsl/agent-agreement-base/lib/AAConsts');
const { throwResponseError } = require('@config-rgsl/infrastructure/lib/errorUtils');

/**
 * @errorCode {errorCode} ManualDocumentNumberIsRequired
 * @errorCode {errorCode} ExternalDocumentNumberIsRequired
 * @errorCode {errorCode} ConclusionDateIsRequired
 * @errorCode {errorCode} StartDateIsRequired
 * @errorCode {errorCode} DocumentCurrencyIsRequired
 * @errorCode {errorCode} SalesChannelIsRequired
 * @errorCode {errorCode} AgentIsRequired
 * @errorCode {errorCode} AgentPersonalNumberIsRequired
 * @errorCode {errorCode} AgentPartyTypeIsRequired
 * @errorCode {errorCode} MvzNumberIsRequired
 * @errorCode {errorCode} MvzNumberWrongFormat
 * @errorCode {errorCode} SkkNumberWrongFormat
 * @errorCode {errorCode} OrgUnitIsRequired
 * @errorCode {errorCode} OrderNumberIsRequired
 * @errorCode {errorCode} OrderNumberWrongFormat
 * @errorCode {errorCode} AgencyIsRequired
 * @errorCode {errorCode} CbAgentTypeIsRequired
 * @errorCode {errorCode} SalesClassificationMustBeLessThan50charLong
 * @errorCode {errorCode} isEmptyDataByAgent
 * */
function validateMainDocumentData(input, validationErrors) {

    validateMainAttributes(input, validationErrors);
    validateDocumentDates(input, validationErrors);
    validateParticipants(input, validationErrors);
    validateOrganisation(input, validationErrors);
}

function validateMainAttributes(input, validationErrors) {

    if (!input.mainAttributes?.externalDocumentNumber) {

        validationErrors.push({
            errorCode: 'ExternalDocumentNumberIsRequired',
            errorDataPath: '/Body/mainAttributes/externalDocumentNumber'
        });
    }

    if (!input.mainAttributes?.documentCurrency) {

        validationErrors.push({
            errorCode: 'DocumentCurrencyIsRequired',
            errorDataPath: '/Body/mainAttributes/documentCurrency'
        });
    }

    if (!input.mainAttributes?.salesChannel?.code) {

        validationErrors.push({
            errorCode: 'SalesChannelIsRequired',
            errorDataPath: '/Body/mainAttributes/salesChannel'
        });
    }

    const orderNumber = input.mainAttributes?.orderNumber;

    if (orderNumber) {

        const pattern = /^[0-9]{7}$/;
        const result = orderNumber.match(pattern);

        if (!result) {

            validationErrors.push({
                errorCode: 'OrderNumberWrongFormat',
                errorDataPath: '/Body/mainAttributes/orderNumber'
            });
        }
    }

    if (!input.mainAttributes?.agency?.code) {

        validationErrors.push({
            errorCode: 'AgencyIsRequired',
            errorDataPath: '/Body/mainAttributes/agency'
        });
    }

    if (!input.mainAttributes?.cbAgentType?.code) {

        validationErrors.push({
            errorCode: 'CbAgentTypeIsRequired',
            errorDataPath: '/Body/mainAttributes/cbAgentType'
        });
    }

    if (input.mainAttributes?.salesClassification && input.mainAttributes?.salesClassification?.length > 50) {

        validationErrors.push({
            errorCode: 'SalesClassificationMustBeLessThan50charLong',
            errorDataPath: '/Body/mainAttributes/salesClassification'
        });
    }
}

function validateDocumentDates(input, validationErrors) {

    if (!input.validity?.conclusionDate) {

        validationErrors.push({
            errorCode: 'ConclusionDateIsRequired',
            errorDataPath: '/Body/validity/conclusionDate'
        });
    }

    if (!input.validity?.startDate) {

        validationErrors.push({
            errorCode: 'StartDateIsRequired',
            errorDataPath: '/Body/validity/startDate'
        });
    }
}

function validateParticipants(input, validationErrors) {

    const agentCode = input.participants?.agent?.serviceProviderCode;

    if (!agentCode) {

        validationErrors.push({
            errorCode: 'AgentIsRequired',
            errorDataPath: '/Body/participants/agent/fullName'
        });
    }
    else {

        validateAgent(input, validationErrors);
    }
}

function validateAgent(input, validationErrors) {

    if (!input.participants?.agent?.personalNumber) {

        validationErrors.push({
            errorCode: 'AgentPersonalNumberIsRequired',
            errorDataPath: '/Body/participants/agent/personalNumber'
        });
    }

    if (!input.participants?.agent?.partyType) {

        validationErrors.push({
            errorCode: 'AgentPartyTypeIsRequired',
            errorDataPath: '/Body/participants/agent/partyType'
        });
    }

    const partyCode = input.participants?.agent?.partyCode;

    if (partyCode) {

        const dataPath = input.participants?.agent?.partyType == partyType.naturalPerson ?
            '/agentNaturalPerson' :
            '/agentLegalEntity';

        const partyBody = input.participants?.agent?.partyBody;

        if (validationByRole.validationByRole(dataPath, dataPath, partyBody)) {

            validationErrors.push({
                errorCode: 'isEmptyDataByAgent',
                errorDataPath: '/Body/participants/agent/partyType',
            });
        }
    }
}

function validateOrganisation(input, validationErrors) {

    if (!input.organisation?.organisationUnit?.code) {

        validationErrors.push({
            errorCode: 'OrgUnitIsRequired',
            errorDataPath: '/Body/organisation/organisationUnit/name'
        });
    }

    const mvzNumber = input.organisation?.mvzNumber;

    if (!mvzNumber) {

        validationErrors.push({
            errorCode: 'MvzNumberIsRequired',
            errorDataPath: '/Body/organisation/mvzNumber'
        });
    }
    else {

        const pattern = /^[0-9]{2}-[0-9]{2}-[0-9]{3}$/;
        const result = mvzNumber.match(pattern);

        if (!result) {

            validationErrors.push({
                errorCode: 'MvzNumberWrongFormat',
                errorDataPath: '/Body/organisation/mvzNumber'
            });
        }
    }

    const skkNumber = input.organisation.skkNumber;

    if (skkNumber) {

        const pattern = /^[0-9]{8}$/;
        const result = skkNumber.match(pattern);

        if (!result) {

            validationErrors.push({
                errorCode: 'SkkNumberWrongFormat',
                errorDataPath: '/Body/organisation/skkNumber'
            });
        }
    }
}

function validateCommissionRules(commissionRules, codeTableValues) {

    if (commissionRules && commissionRules.length > 1) {

        const result = validateRules(commissionRules, codeTableValues);
        return result;
    }

    return { hasIntersectedRules: false };
}

function getUniversalSetFunctionObject(ambientProperties) {
    return {
        getAllInsuranceProducts: getDataSourceFunction(ambientProperties, 'api/entity-infrastructure/shared/datasource/ProductsDataSource', 'productCode'),
        getAllCreditPrograms: getDataSourceFunction(ambientProperties, 'api/entity-infrastructure/shared/datasource/CreditProgramsDataSource', 'creditProgramCode'),
        getAllCurrencies: getDataSourceFunction(ambientProperties, 'api/entity-infrastructure/shared/datasource/GetAllCurrenciesDataSource', 'currencyCode')
    };
}

function getDataSourceFunction(ambientProperties, url, idFieldName) {
    const request = {
        method: 'post',
        url: url,
        data: {
            data: {
                criteria: {}
            }
        }
    };

    return () => {
        return ambientProperties.services.api.call(request)
            .then(
                (result) => {
                    if (result && result.data && result.data.length > 0) {
                        const mappedResult = result.data.map(x => {
                            return {
                                identifier: x.resultData[idFieldName],
                                additionalData: x.resultData
                            };
                        });
                        return mappedResult;
                    }

                    return [];
                });
    };
}

async function checkAccPeriod(currentStartDate, ambientProperties) {

    const period = await getPeriod(currentStartDate, ambientProperties);

    if (period && (period.periodStatusId === accPeriodStatus.closed || period.periodStatusId === accPeriodStatus.inProcessOfClosing)) {

        return false;
    }

    return true;
}

async function getPeriod(currentStartDate, ambientProperties) {

    const aaRequest = {
        method: 'post',
        url: 'api/entity-infrastructure/shared/datasource/PeriodDataSource',
        data: {
            data: {
                criteria: {
                    atDate: currentStartDate,
                    periodTypeIds: [periodType.CONTRACT],
                }
            }
        }
    };

    let result;
    try {
        result = await ambientProperties.services.api.call(aaRequest);
    }
    catch (err) {
        throwResponseError(err);
    }

    const mappedResult = result.data.map(_ => _.resultData);

    let period = undefined;
    if (mappedResult.length > 0) {

        period = mappedResult[0];
    }

    return period;
}

module.exports = {
    validateCommissionRules,
    validateMainDocumentData,
    getUniversalSetFunctionObject,
    checkAccPeriod
};
