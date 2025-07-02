'use strict';

module.exports = function mapping(input, sinkExchange, additionalDataSourcesResults) {

    const items = sinkExchange.resolveContext('items');

    const result = items.map(_ => {
        const jsonData = _.savedJsonData ? Object.assign(_.savedJsonData, _.newJsonData) : _.newJsonData;
        return {
            itemId: _.actItemId,
            jsonData: JSON.stringify(jsonData),
        };
    });

    return {
        request: {
            items: result,
        }
    };
};
