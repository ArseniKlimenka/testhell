module.exports = function clearSubstituteUser(input) {
    const { data } = input;

    data.substituteUserId = undefined;
    data.substituteUserDisplayName = undefined;
};
