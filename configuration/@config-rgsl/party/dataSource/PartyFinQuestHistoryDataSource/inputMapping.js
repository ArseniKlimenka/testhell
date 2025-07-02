'use strict';

module.exports = function (input) {

    const output = {
        parameters: {
            partyCode: null,
            finKnowledgeQuestionnaire2023: null,
            finKnowledgeQuestionnaire2024: null
        }
    };

    if (input.data.criteria.partyCode) {
        output.parameters.partyCode = input.data.criteria.partyCode;
    }

    if (input.data.criteria.finKnowledgeQuestionnaire2023) {
        output.parameters.finKnowledgeQuestionnaire2023 = input.data.criteria.finKnowledgeQuestionnaire2023;
    }

    if (input.data.criteria.finKnowledgeQuestionnaire2024) {
        output.parameters.finKnowledgeQuestionnaire2024 = input.data.criteria.finKnowledgeQuestionnaire2024;
    }

    if (!output.parameters.partyCode) {
        throw 'No criteria provided!';
    }

    if (input.data.sort) {
        output.sort = {};

        const columnNames = {
            sysUpdatedOn: 'sys_updated_on'
        };

        input.data.sort.forEach(element => {
            const dbName = columnNames[element.fieldName];

            if (dbName) {
                output.sort[dbName] = element.descending ? 'desc' : 'asc';
            }
        });
    }

    return output;

};
