'use strict';

module.exports = function (input) {

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

    const documentCode = input.data.criteria.documentCode;

    if (documentCode) {

        searchRequest.query.bool.must.push({

            match: {
                'number': documentCode
            }
        });
    }

    const contractNumber = input.data.criteria.contractNumber;

    if (contractNumber) {

        searchRequest.query.bool.should.push({

            match: {
                'body.contract.number': contractNumber
            }
        },
        {

            match: {
                'body.contract.externalNumber': contractNumber
            }
        });
    }

    const contractConfName = input.data.criteria.contractConfName;

    if (contractConfName) {

        searchRequest.query.bool.must.push({

            match: {
                'body.contract.configurationName': contractConfName
            }
        });
    }

    const documentState = input.data.criteria.documentState;

    if (documentState) {

        searchRequest.query.bool.must.push({

            match: {
                'stateCode': documentState
            }
        });
    }

    const insuredEventDateFrom = input.data.criteria.insuredEventDateFrom;

    if (insuredEventDateFrom) {

        searchRequest.query.bool.must.push({

            range: {
                'body.eventDateInfo.eventDate': {
                    'gte': insuredEventDateFrom
                }
            }
        });
    }

    const insuredEventDateTo = input.data.criteria.insuredEventDateTo;

    if (insuredEventDateTo) {

        searchRequest.query.bool.must.push({

            range: {
                'body.eventDateInfo.eventDate': {
                    'lte': insuredEventDateTo
                }
            }
        });
    }

    const insuredEventTypeCodes = input.data.criteria.insuredEventTypeCodes;

    if (insuredEventTypeCodes && insuredEventTypeCodes.length > 0) {

        searchRequest.query.bool.must.push({

            terms: {
                'body.insuredEventType.code': insuredEventTypeCodes
            }
        });
    }

    return searchRequest;
};
