module.exports = function (input) {

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
            match: {
                '_summary': input.data.criteria.freeText
            }
        });
    }

    if (input.data.criteria.number) {
        searchRequest.query.bool.must.push({
            match: {
                'number': input.data.criteria.number
            }
        });
    }

    if (input.data.criteria.stateCode) {
        searchRequest.query.bool.must.push({
            match: {
                'stateCode': input.data.criteria.stateCode
            }
        });
    }
    else {

        searchRequest.query.bool.must.push({
            terms: {
                'stateCode': ['Activated', 'CancelledByAmendment', 'Active']
            }
        });
    }

    if (input.data.criteria.configurationName) {
        searchRequest.query.bool.must.push({
            match: {
                'metadata.configuration.name': input.data.criteria.configurationName
            }
        });
    }

    if (input.data.criteria.contractType) {
        searchRequest.query.bool.must.push({
            match: {
                'metadata.configuration.dimensions.contractType': input.data.criteria.contractType
            }
        });
    }

    if (input.data.criteria.productGroup) {
        searchRequest.query.bool.must.push({
            match: {
                'metadata.configuration.dimensions.productGroup': input.data.criteria.productGroup
            }
        });
    }

    if (input.data.criteria.product && input.data.criteria.product.productCode) {
        searchRequest.query.bool.must.push({
            match: {
                'body.productCode': input.data.criteria.product.productCode
            }
        });
    }

    if (input.data.criteria.productsArray && input.data.criteria.productsArray.length > 0) {
        const productsArray = {
            bool: {
                should: []
            }
        };
        input.data.criteria.productsArray.forEach(product => {
            productsArray.bool.should.push({
                match: {
                    'body.productCode': product.productCode
                }
            });
        });
        searchRequest.query.bool.must.push(productsArray);
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

    if (input.data.criteria.issueDateFrom) {
        searchRequest.query.bool.must.push({
            range: {
                'body.issueDate': {
                    'gte': input.data.criteria.issueDateFrom
                }
            }
        });
    }

    if (input.data.criteria.issueDateTo) {
        searchRequest.query.bool.must.push({
            range: {
                'body.issueDate': {
                    'lte': input.data.criteria.issueDateTo
                }
            }
        });
    }

    if (input.data.criteria.startDateFrom) {
        searchRequest.query.bool.must.push({
            range: {
                'body.startDate': {
                    'gte': input.data.criteria.startDateFrom
                }
            }
        });
    }

    if (input.data.criteria.startDateTo) {
        searchRequest.query.bool.must.push({
            range: {
                'body.startDate': {
                    'lte': input.data.criteria.startDateTo
                }
            }
        });
    }

    if (input.data.criteria.endDateFrom) {
        searchRequest.query.bool.must.push({
            range: {
                'body.endDate': {
                    'gte': input.data.criteria.endDateFrom
                }
            }
        });
    }

    if (input.data.criteria.endDateTo) {
        searchRequest.query.bool.must.push({
            range: {
                'body.endDate': {
                    'lte': input.data.criteria.endDateTo
                }
            }
        });
    }

    if (input.data.criteria.holder) {
        searchRequest.query.bool.must.push({
            match: {
                'body.parties.holder.personCode': input.data.criteria.holder
            }
        });
    }

    if (input.data.criteria.initiatorServiceProviderCode) {
        searchRequest.query.bool.must.push({
            match: {
                'body.initiatorServiceProviderCode': input.data.criteria.initiatorServiceProviderCode
            }
        });
    }

    if (input.data.criteria.organisationUnitCode && !input.data.criteria.includeChildren) {
        searchRequest.query.bool.must.push({
            match: {
                'body.organisationUnitCode': input.data.criteria.organisationUnitCode
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
                    'body.organisationUnitCode': organisationUnitCode
                }
            });
        });
        searchRequest.query.bool.must.push(organisationUnitCodes);
    }

    if (input.data.criteria.userAdditionalOrgUnits && input.data.criteria.userAdditionalOrgUnits.length > 0) {
        const userAdditionalOrgUnits = {
            bool: {
                should: []
            }
        };
        input.data.criteria.userAdditionalOrgUnits.forEach(organisationUnitCode => {
            userAdditionalOrgUnits.bool.should.push({
                match: {
                    'body.organisationUnitCode': organisationUnitCode
                }
            });
        });
        searchRequest.query.bool.must.push(userAdditionalOrgUnits);
    }

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            const sortInfo = {};
            let elasticName = '';
            switch (element.fieldName) {
                case 'metadata':
                case 'entityId':
                    elasticName = 'number';
                    break;
                case 'productDescription':
                    elasticName = 'metadata.configuration.dimensions.productCode';
                    break;
                case 'contractTypeDescription':
                    elasticName = 'metadata.configuration.dimensions.contractType';
                    break;
                case 'startDate':
                    elasticName = 'body.startDate';
                    break;
                case 'endDate':
                    elasticName = 'body.endDate';
                    break;
                case 'issueDate':
                    elasticName = 'body.issueDate';
                    break;
                case 'policyHolderName':
                    elasticName = 'body.parties.holder.fullName';
                    break;
            }
            if (elasticName.length > 0) {
                const direction = input.data.sort[0].descending ? 'desc' : 'asc';
                sortInfo[elasticName] = direction;
                searchRequest.sort.push(sortInfo);
            }
        });
    }

    return searchRequest;
};
