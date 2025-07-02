module.exports = function DataSourceInputMapping(input) {

    const output = {
        parameters: {
            ...input.data.criteria,
        }
    };

    if (input.data.criteria.contractNumbersStr) {

        let contractNumbers = input.data.criteria.contractNumbers;

        if (!input.data.criteria.contractNumbers) {

            contractNumbers = input.data.criteria.contractNumbers = [];
        }

        const parsed = input.data.criteria.contractNumbersStr.split(/(?:\r\n|\r|\n)/g);
        contractNumbers.push(...parsed);
    }

    if (input.data.sort) {

        const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();

        input.data.sort.forEach(element => {
            let sortedFieldName = '';
            switch (element.fieldName) {
                /*
                case 'referenceNo':
                    sortedFieldName = 'CONTRACT_NUMBER';
                    break;
                */
                default:
                    sortedFieldName = camelToSnakeCase(element.fieldName);
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
            CONTRACT_NUMBER: 'asc'
        };
    }

    return output;
};
