'use strict';

module.exports = function mapping(input, sinkExchange) {


    const salesSegments = input.salesSegments?.map(x => x.selectedSegment);

    if (!salesSegments || salesSegments.length === 0) {

        throw new Error('Е: Пожалуйста, укажите сегмент продаж.');
    }

    return {
        input: {
            data: {
                criteria: {
                    salesSegments
                }
            }
        }
    };
};
