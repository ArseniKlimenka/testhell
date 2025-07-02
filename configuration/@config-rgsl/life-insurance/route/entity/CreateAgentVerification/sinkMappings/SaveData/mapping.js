'use strict';

module.exports = function mapping({
    number,
    body
}) {

    const listName = body.listName;
    const listNumber = body.listNumber;
    const listDate = body.listDate;
    const partyCodes = body.partyCodes;
    const creationDate = body.creationDate;
    const foundCodes = body.foundCodes;

    const result = {

        'UNI_IMPL.AGENT_VERIFICATION_HUB': [{
            AGENT_VERIFICATION_NUMBER: number
        }],

        'UNI_IMPL.AGENT_VERIFICATION_SAT': [{
            AGENT_VERIFICATION_NUMBER: number,
            LIST_NAME: listName,
            LIST_NUMBER: listNumber,
            LIST_DATE: listDate,
            PARTY_CODES: partyCodes,
            CREATION_DATE: creationDate,
            FOUND_CODES: foundCodes
        }],
    };

    return result;

};
