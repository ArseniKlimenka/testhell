'use strict';

module.exports = function resultMapping(dataProviderOutput) {

    const input = dataProviderOutput && dataProviderOutput[0];

    if (input) {

        const output = {};

        output.duplicatesCount = input.duplicates_count;

        return output;

    }

};
