module.exports = function (input) {

    const criteria = input.data.criteria;
    const searchRequest = {
        query: {
            bool: {
                must: [],
                should: []
            }
        },
        sort: []
    };

    if (input.data.criteria.freeText) {
        searchRequest.query.bool.must.push({
            prefix: input.data.criteria.freeText
        });
    }

    if (input.data.criteria.createdOnFrom) {
        searchRequest.query.bool.must.push({
            range: {
                'metadata.createdOn': {
                    'gte': input.data.criteria.createdOnFrom
                }
            }
        });
    }

    if (input.data.criteria.serviceProviderCode) {
        searchRequest.query.bool.must.push({
            match: {
                'code': input.data.criteria.serviceProviderCode
            }
        });
    }

    if (input.data.criteria.partyCode) {
        searchRequest.query.bool.must.push({
            match: {
                'body.partyCode': input.data.criteria.partyCode
            }
        });
    }

    if (input.data.criteria.businessCode) {
        searchRequest.query.bool.must.push({
            match: {
                'body.businessCode': input.data.criteria.businessCode
            }
        });
    }

    if (criteria.businessCodes && criteria.businessCodes.length > 0) {

        searchRequest.query.bool.must.push({

            terms: {
                'body.businessCode': input.data.criteria.businessCodes
            }
        });
    }

    if (input.data.criteria.serviceProviderType) {
        searchRequest.query.bool.must.push({
            prefix: {
                'metadata.configuration.name': input.data.criteria.serviceProviderType
            }
        });
    }

    if (input.data.criteria.organisationUnitCode && !input.data.criteria.includeChildren) {
        searchRequest.query.bool.must.push({
            match: {
                'body.orgUnitCode': input.data.criteria.organisationUnitCode
            }
        });
    }

    if (input.data.criteria.organisationUnitCodes && input.data.criteria.organisationUnitCodes.length > 0 && input.data.criteria.includeChildren) {
        const organisationUnitCodes = {
            bool: {
                should: []
            }
        };
        input.data.criteria.organisationUnitCodes.forEach(organisationUnitCode => {
            organisationUnitCodes.bool.should.push({
                match: {
                    'body.orgUnitCode': organisationUnitCode
                }
            });
        });
        searchRequest.query.bool.must.push(organisationUnitCodes);
    }

    if (input.data.criteria.orgUnitsToFilterBy && input.data.criteria.orgUnitsToFilterBy.length > 0) {

        searchRequest.query.bool.must.push({
            terms: {
                'body.orgUnitCode': input.data.criteria.orgUnitsToFilterBy
            }
        });
    }

    if (input.data.criteria.isPersonalManager) {
        searchRequest.query.bool.must.push({
            match: {
                'body.isPersonalManager': input.data.criteria.isPersonalManager
            }
        });
    }

    if (input.data.sort) {
        searchRequest.sort = input.data.sort.map((element) => {
            const sortInfo = {};
            sortInfo[element.fieldName] = element.descending ? 'desc' : 'asc';
            return sortInfo;
        });
    }

    return searchRequest;
};
