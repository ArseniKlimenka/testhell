'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    const contractDuplicatesNumbers = dataSourceResponse.data?.map(item => item.resultData.dublicateCount)[0];

    if (contractDuplicatesNumbers > 0) {
        throw new Error(`В системе уже есть действующий договор с указанным застрахованным и на указанную дату.`);
    }
};

