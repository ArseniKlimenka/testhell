module.exports = function (input) {
    const searchRequest = {
        query: {
            bool: {
                must: [],
                mustNot: [],
                should: []
            }
        },
        sort: []
    };
    let hasCriteria = false;

    if (input.data.criteria.freeText) {
        searchRequest.query.bool.must.push({
            prefix: input.data.criteria.freeText
        });
        hasCriteria = true;
    }

    if (input.data.criteria.code) {
        searchRequest.query.bool.must.push({
            match: {
                'code': input.data.criteria.code
            }
        });
        hasCriteria = true;
    }

    if (input.data.criteria.name) {
        searchRequest.query.bool.must.push({
            prefix: {
                'body.name': input.data.criteria.name
            }
        });
        hasCriteria = true;
    }

    if (input.data.criteria.skipSystemCalendars) {
        searchRequest.query.bool.must.push({
            exists: {
                field: 'body.applicationUserId'
            }
        });
        hasCriteria = true;
    }

    if (input.data.criteria.skipUserCalendars) {
        searchRequest.query.bool.mustNot.push({
            exists: {
                field: 'body.applicationUserId'
            }
        });
        hasCriteria = true;
    }

    if (input.data.criteria.isActive) {
        searchRequest.query.bool.must.push({
            match: {
                'body.isActive': true
            }
        });
        hasCriteria = true;
    }

    if (input.data.criteria.isDefault) {
        searchRequest.query.bool.must.push({
            match: {
                'body.isDefault': true
            }
        });
        hasCriteria = true;
    }

    // If no criteria is set in the input, we want to get all results:
    if (!hasCriteria) {
        searchRequest.query.bool.should.push({
            prefix: ' '
        });
    }

    return searchRequest;
};
