"use strict";

module.exports = function mapping(input, sinkExchange) {

    if (input.body) {

        const body = input.body;
        const number = input.number;
        body.informationLetterNumber = sinkExchange.informationLetterNumber;

        const result = {
            body: body,
            number: number
        };

        return result;

    }

};
