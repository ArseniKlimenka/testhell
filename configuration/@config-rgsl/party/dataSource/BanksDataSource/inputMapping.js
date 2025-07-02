'use strict';

module.exports = function (input) {

    const output = {};

    output.parameters = {};
    output.parameters.id = null;
    output.parameters.name = null;
    output.parameters.bic = null;
    output.parameters.fullBic = null;
    output.parameters.correspondentAccount = null;

    if (input.data.criteria.id) {
        output.parameters.id = input.data.criteria.id;
    }

    if (input.data.criteria.name) {
        output.parameters.name = '%' + input.data.criteria.name + '%';
    }

    if (input.data.criteria.bic) {
        output.parameters.bic = '%' + input.data.criteria.bic + '%';
    }

    if (input.data.criteria.fullBic) {
        output.parameters.fullBic = input.data.criteria.fullBic;
    }

    if (input.data.criteria.correspondentAccount) {
        output.parameters.correspondentAccount = '%' + input.data.criteria.correspondentAccount + '%';
    }

    output.sort = {};

    if (input.data.sort) {

        input.data.sort.forEach(element => {

            let dbName = '';
            const fieldName = element.fieldName;

            switch (fieldName) {
                case 'name':
                    dbName = 'NAME';
                    break;
                case 'bic':
                    dbName = 'BIC';
                    break;
                case 'correspondentAccount':
                    dbName = 'CORRESPONDENT_ACCOUNT';
                    break;
            }

            if (dbName.length > 0) {
                const direction = element.descending ? 'desc' : 'asc';

                output.sort[dbName] = direction;
            }

        });

    }

    return output;

};
