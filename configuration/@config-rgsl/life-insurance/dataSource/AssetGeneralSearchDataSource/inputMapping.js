module.exports = function DataSourceInputMapping(input) {
    if (!input || !input.data || !input.data.criteria) {
        throw "Input criteria was not defined!";
    }

    const criteria = input.data.criteria;
    const output = {};
    output.parameters = {};
    output.parameters.productCode = null;
    output.parameters.payOffType = null;

    if (criteria.productCode) {
        output.parameters.productCode = criteria.productCode;
    }

    if (criteria.insuranceTerms) {
        output.parameters.insuranceTerms = criteria.insuranceTerms;
    }

    if (input.data.sort) {
        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                case 'assetNumber':
                    sortedFieldName = 'ASSET_NUMBER';
                    break;
                default:
                    sortedFieldName = 'ASSET_NUMBER';
            }
            if (sortedFieldName.length > 0) {
                const direction = element.descending ? 'desc' : 'asc';
                output.sort = output.sort || {};
                output.sort[sortedFieldName] = direction;
            }
        });
    }

    if (!output.sort) {
        output.sort = {
            asset_number: 'asc'
        };
    }

    return output;
};
