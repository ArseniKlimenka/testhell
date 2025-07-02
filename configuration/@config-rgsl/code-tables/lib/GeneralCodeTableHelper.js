'use strict';

const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

function basicCtDropdownRequestMapping(currentValue, searchText) {

    const searchCriteria = {};
    searchCriteria.code = undefined;
    searchCriteria.description = undefined;
    searchCriteria.codes = undefined;
    searchCriteria.descriptions = undefined;

    if (Array.isArray(currentValue) && currentValue?.length > 0) {

        searchCriteria.codes = currentValue.map(i => i.code);
    }
    else if (currentValue && !searchText) {

        searchCriteria.code = currentValue.code;
    }
    else if (searchText) {

        searchCriteria.description = searchText;
    }

    return {
        data: {
            criteria: searchCriteria
        }
    };
}

function basicCtDropdownResponseMapping(input) {

    let output = [];
    const data = getValue(input, 'response.data');

    if (data && data.length > 0) {

        output = data.map((element) => {

            const result = {};
            result.displayName = element.resultData['description'];

            const objValue = {};
            objValue.code = element.resultData['code'];
            objValue.description = element.resultData['description'];

            result.value = objValue;
            return result;
        });
    }

    return output;
}

function removeEmptyResults(input) {
    input.response.data = input.response.data?.filter(item => item.resultData.code !== undefined);
    input.response.data = input.response.data?.filter(item => item.resultData.code.trim() !== '');
}

function distinctByKey(input, key) {
    input.response.data = [...new Map(input.response.data.map(item => [item.resultData[key], item])).values()];
}


module.exports = {
    basicCtDropdownRequestMapping,
    basicCtDropdownResponseMapping,
    removeEmptyResults,
    distinctByKey
};
