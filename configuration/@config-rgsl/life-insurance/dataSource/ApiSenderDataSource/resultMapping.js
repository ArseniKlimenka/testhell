
module.exports = function resultMapping(input) {

    const output = {};

    output.apiSender = input.API_SENDER;
    output.creatorUsername = input.CREATOR_USERNAME;

    return output;
};
