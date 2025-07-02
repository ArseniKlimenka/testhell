const { convertFromUTCToBusinessTime } = require('@adinsure/runtime').businessClock;
const { substitutedUsers } = require('@adinsure/runtime');

module.exports = function (input) {
    const output = {
        parameters: {
            groupId: null,
        }
    };

    if (input.data.criteria.groupId) {

        output.parameters.groupId = input.data.criteria.groupId;
    }

    return output;
};
