const { Exception } = require("handlebars");

module.exports = function (input) {

    const userRoles = this.applicationContext.user.applicationRoles;
    const isSMGO = userRoles.some(x => x == 'SMGO');
    const pageSize = input?.paging?.pageSize;
    if (!isSMGO) {
        if (!pageSize) {
            throw new Exception('Необходимо указать количество возвращаемых записей на странице!');
        }
        if (pageSize > 15) {
            throw new Exception('Превышено количество возвращаемых записей!');
        }
    }

    const searchRequest = {
        query: {
            bool: {
                must: [],
                should: [],
                filter: []
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

    const contractNumber = input.data.criteria.number;
    if (contractNumber) {
        const formattedContractNumber = contractNumber.replaceAll("\n", ",").replaceAll(";", ",").replaceAll(/\s/g, '');
        if (formattedContractNumber.indexOf(',') > -1) {
            searchRequest.query.bool.must.push({
                match: {
                    'number': formattedContractNumber
                }
            });
        }
        else if (input.data.criteria.isStrictNumber) {
            searchRequest.query.bool.must.push({
                match: {
                    'number': contractNumber
                }
            });
        }
        else {
            searchRequest.query.bool.must.push({
                wildcard: {
                    'number.sort': `*${contractNumber}*`
                }
            });
        }
    }

    if (input.data.criteria.stateCode) {
        searchRequest.query.bool.must.push({
            match: {
                'stateCode': input.data.criteria.stateCode
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

    if (input.data.criteria.productGroups) {
        searchRequest.query.bool.must.push({
            terms: {
                'metadata.configuration.dimensions.productGroup': input.data.criteria.productGroups
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

    if (input.data.criteria.products && input.data.criteria.products.length > 0) {
        searchRequest.query.bool.filter.push({
            terms: {
                'body.productCode': input.data.criteria.products.map(x => x.productCode)
            }
        });
    }

    if (input.data.criteria.productsArray && input.data.criteria.productsArray.length > 0) {
        searchRequest.query.bool.filter.push({
            terms: {
                'body.productCode': input.data.criteria.productsArray
            }
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

    if (input.data.criteria.insuredPerson) {
        searchRequest.query.bool.must.push({
            match: {
                'body.parties.insuredPerson.personCode': input.data.criteria.insuredPerson
            }
        });
    }

    if (input.data.criteria.participant) {
        const shouldMatchParticipant = [
            {
                multiMatch: {
                    query: input.data.criteria.participant,
                    fields: [
                        'body.parties.holder.personCode',
                        'body.parties.insuredPerson.personCode'
                    ],
                    operator: 'or'
                }
            }
        ];

        searchRequest.query.bool.must.push({
            bool: {
                should: shouldMatchParticipant
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

    if (input.data.criteria.isPersonalManager) {
        if (input.data.criteria.initiatorServiceProviderCodes && input.data.criteria.initiatorServiceProviderCodes.length > 0) {
            const initiatorServiceProviderCodes = {
                bool: {
                    should: []
                }
            };
            input.data.criteria.initiatorServiceProviderCodes.forEach(initiatorServiceProviderCode => {
                initiatorServiceProviderCodes.bool.should.push({
                    match: {
                        'body.initiatorServiceProviderCode': initiatorServiceProviderCode
                    }
                });
            });
            searchRequest.query.bool.must.push(initiatorServiceProviderCodes);
        }
        else {
            searchRequest.query.bool.must.push({
                match: {
                    'body.initiatorServiceProviderCode': 'fake'
                }
            });
        }
    }

    if (input.data.criteria.organisationUnitCode && !input.data.criteria.includeChildren) {
        searchRequest.query.bool.must.push({
            match: {
                'body.organisationUnitCode': input.data.criteria.organisationUnitCode
            }
        });
    }

    if (input.data.criteria.includeChildren) {
        if (input.data.criteria.partnerCode) {
            searchRequest.query.bool.must.push({
                match: {
                    'body.partner.partnerCode': input.data.criteria.partnerCode
                }
            });
        }

        const organisationUnitCodes = input.data.criteria.organisationUnitCodes;
        if (!input.data.criteria.partnerCode && organisationUnitCodes && organisationUnitCodes.length > 0) {

            const maxCount = this.environmentVariables['rgsl.searchByIncludedOrganisationUnits.maxCount'];
            if (organisationUnitCodes.length > maxCount) {
                throw new Exception('Слишком много дочерних подразделений, выберите более низкий уровень!');
            }
            const organisationUnitCodesString = organisationUnitCodes.join(',');
            searchRequest.query.bool.must.push({
                match: {
                    'body.organisationUnitCode': organisationUnitCodesString
                }
            });
            /*
            let organisationUnitCodes = {
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
            */
        }
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

    if (input.data.criteria.isReinvest) {
        searchRequest.query.bool.must.push({
            match: {
                'body.isReinvest': input.data.criteria.isReinvest
            }
        });
    }

    if (input.data.criteria.issueFormCode) {
        searchRequest.query.bool.must.push({
            match: {
                'body.issueFormCode': input.data.criteria.issueFormCode
            }
        });
    }

    if (input.data.criteria.aaExternalNumber) {
        searchRequest.query.bool.must.push({
            match: {
                'body.commission.agentAgreement.externalNumber': input.data.criteria.aaExternalNumber
            }
        });
    }

    if (input.data.criteria.excludedProducts && input.data.criteria.excludedProducts.length > 0) {
        searchRequest.query.bool.must.push({
            bool: {
                mustNot: [{
                    terms: {
                        'body.productCode': input.data.criteria.excludedProducts
                    }
                }]
            }
        });
    }

    if (input.data.criteria.partnerBusinessCodes && input.data.criteria.partnerBusinessCodes.length > 0) {
        searchRequest.query.bool.must.push({
            terms: {
                'body.partner.partnerBusinessCode': input.data.criteria.partnerBusinessCodes
            }
        });
    }

    if (input.data.criteria.isCollectivePolicyOnly) {
        searchRequest.query.bool.must.push({
            match: {
                'metadata.configuration.name': 'CollectiveLifeInsurancePolicy'
            }
        });
    }

    if (input.data.criteria.futureContractNumber) {
        searchRequest.query.bool.must.push({
            match: {
                'body.futureContractNumber': input.data.criteria.futureContractNumber
            }
        });
    }

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            const sortInfo = {};
            let elasticName = '';
            switch (element.fieldName) {
                case 'metadata':
                case 'entityId':
                    elasticName = 'number.sort';
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
