const { Exception } = require("handlebars");
const lifeInsuranceConstants = require('@config-rgsl/infrastructure/lib/lifeInsuranceConstants');


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

    searchRequest.query.bool.must.push({
        match: {
            'metadata.configuration.dimensions.contractType': lifeInsuranceConstants.contractType.Policy
        }
    });

    searchRequest.query.bool.must.push({
        match: {
            'stateCode': lifeInsuranceConstants.policyState.Activated
        }
    });

    searchRequest.query.bool.must.push({
        match: {
            'metadata.configuration.dimensions.productGroup': lifeInsuranceConstants.productGroup.CSZ.descriptionRU
        }
    });

    searchRequest.query.bool.must.push({
        terms: {
            'body.productCode': lifeInsuranceConstants.productGroupArray.CREDIT_IR_IN_SEARCH
        }
    });

    if (input.data.criteria.holder) {
        searchRequest.query.bool.must.push({
            match: {
                'body.parties.holder.personCode': input.data.criteria.holder
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
