'use strict';

module.exports = function (input) {

    const searchRequest = {
        query: {
            bool: {
                must: [],
                should: [],
                mustNot: []
            }
        },
        sort: []
    };

    const documentNumber = input.data.criteria.documentNumber;

    if (documentNumber) {

        searchRequest.query.bool.must.push({

            bool: {
                should: [
                    {

                        match: {
                            'number': documentNumber
                        }
                    },
                    {

                        match: {
                            'body.manualNumber': documentNumber
                        }
                    }
                ]
            }
        });
    }

    const documentCode = input.data.criteria.documentCode;

    if (documentCode) {

        searchRequest.query.bool.must.push({

            match: {
                'number': documentCode
            }
        });
    }

    const id = input.data.criteria.id;

    if (id) {

        searchRequest.query.bool.must.push({

            match: {
                'id': id
            }
        });
    }

    const manualNumber = input.data.criteria.manualNumber;

    if (manualNumber) {

        searchRequest.query.bool.must.push({

            match: {
                'body.manualNumber': manualNumber
            }
        });
    }

    const externalNumber = input.data.criteria.externalNumber;

    if (externalNumber) {

        searchRequest.query.bool.must.push({

            match: {
                'body.externalNumber': externalNumber
            }
        });
    }

    const startDate = input.data.criteria.startDate;

    if (startDate) {

        searchRequest.query.bool.must.push({

            bool: {
                should: [{
                    range: {
                        'body.startDate': {
                            'gte': input.data.criteria.startDate
                        }
                    }
                },
                {
                    bool: {
                        mustNot: [{
                            exists: {
                                field: 'body.startDate'
                            }
                        }]
                    }
                }
                ]
            }
        });
    }

    const endDate = input.data.criteria.endDate;

    if (endDate) {

        searchRequest.query.bool.must.push({

            bool: {
                should: [{
                    range: {
                        'body.endDate': {
                            'lte': input.data.criteria.startDate
                        }
                    }
                },
                {
                    bool: {
                        mustNot: [{
                            exists: {
                                field: 'body.endDate'
                            }
                        }]
                    }
                }
                ]
            }
        });
    }

    const effectiveFrom = input.data.criteria.effectiveFrom;

    if (effectiveFrom) {

        searchRequest.query.bool.must.push({

            bool: {
                should: [{
                    range: {
                        'body.startDate': {
                            'lte': input.data.criteria.effectiveFrom
                        }
                    }
                },
                {
                    bool: {
                        mustNot: [{
                            exists: {
                                field: 'body.startDate'
                            }
                        }]
                    }
                }
                ]
            }
        });
    }

    const effectiveTo = input.data.criteria.effectiveTo;

    if (effectiveTo) {

        searchRequest.query.bool.must.push({

            bool: {
                should: [{
                    range: {
                        'body.endDate': {
                            'gte': input.data.criteria.effectiveTo
                        }
                    }
                },
                {
                    bool: {
                        mustNot: [{
                            exists: {
                                field: 'body.endDate'
                            }
                        }]
                    }
                }
                ]
            }
        });
    }

    const conclusionDate = input.data.criteria.conclusionDate;

    if (conclusionDate) {

        searchRequest.query.bool.must.push({

            match: {
                'body.conclusionDate': conclusionDate
            }
        });
    }

    const documentStates = input.data.criteria.documentStates;

    if (documentStates) {

        searchRequest.query.bool.must.push({

            terms: {
                'stateCode': documentStates
            }
        });
    }

    const agentPersonalNumber = input.data.criteria.agentPersonalNumber;

    if (agentPersonalNumber) {

        searchRequest.query.bool.must.push({

            match: {
                'body.participants.agent.personalNumber': agentPersonalNumber
            }
        });
    }

    const agentPartyType = input.data.criteria.agentPartyType;

    if (agentPartyType) {

        searchRequest.query.bool.must.push({

            match: {
                'body.participants.agent.partyType': agentPartyType
            }
        });
    }

    const agentServiceProviderCode = input.data.criteria.agentServiceProviderCode;

    if (agentServiceProviderCode) {

        searchRequest.query.bool.must.push({

            match: {
                'body.participants.agent.serviceProviderCode': agentServiceProviderCode
            }
        });
    }

    const salesChannelCode = input.data.criteria.salesChannelCode;

    if (salesChannelCode) {

        searchRequest.query.bool.must.push({

            match: {
                'body.salesChannel.code': salesChannelCode
            }
        });
    }

    const documentType = input.data.criteria.documentType;

    if (documentType) {

        searchRequest.query.bool.must.push({

            match: {
                'metadata.configuration.name': documentType
            }
        });
    }

    const onlyNotCancelled = input.data.criteria.onlyNotCancelled;

    if (onlyNotCancelled) {

        searchRequest.query.bool.mustNot.push({

            terms: {
                'stateCode': ['Cancelled', 'Annulled']
            }
        });
    }

    const orderNumber = input.data.criteria.orderNumber;

    if (orderNumber) {

        searchRequest.query.bool.must.push({

            match: {
                'body.attributes.mainAttributes.orderNumber': orderNumber
            }
        });
    }

    const mvzNumber = input.data.criteria.mvzNumber;

    if (mvzNumber) {

        searchRequest.query.bool.must.push({

            match: {
                'body.attributes.mainAttributes.organisation.mvzNumber': mvzNumber
            }
        });
    }

    const agency = input.data.criteria.agency;

    if (agency) {

        searchRequest.query.bool.must.push({

            match: {
                'body.attributes.mainAttributes.agency.code': agency
            }
        });
    }

    const cbAgentType = input.data.criteria.cbAgentType;

    if (cbAgentType) {

        searchRequest.query.bool.must.push({

            match: {
                'body.attributes.mainAttributes.cbAgentType.code': cbAgentType
            }
        });
    }

    if (input.data.sort) {

        input.data.sort.forEach(element => {

            const sortInfo = {};
            let elasticName = '';

            switch (element.fieldName) {

                case 'startDate':
                    elasticName = 'body.startDate';
                    break;
                case 'endDate':
                    elasticName = 'body.endDate';
                    break;
                case 'conclusionDate':
                    elasticName = 'body.conclusionDate';
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
